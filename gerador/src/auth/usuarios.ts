import type { User } from '@supabase/supabase-js';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';

export type CargoUsuario = 'vendedor' | 'admin' | 'financeiro';

export interface Usuario {
    id: string;
    nome: string;
    email: string;
    senha: string;
    cargo: CargoUsuario;
    ativo: boolean;
}

type UsuarioSessao = Omit<Usuario, 'senha' | 'ativo'>;

interface SessaoResultado {
    logado: boolean;
    usuario?: Partial<Usuario>;
}

interface LoginResultado {
    ok: boolean;
    usuario?: UsuarioSessao;
    mensagem?: string;
}

const SESSION_KEY = 'engmarq_session';

// Fallback de transicao enquanto o Supabase ainda nao estiver configurado.
export const usuariosAutorizados: Usuario[] = [
    {
        id: '1',
        nome: 'Admin EngMarq',
        email: 'admin@engmarqsolution.com',
        senha: 'engmarq2026',
        cargo: 'admin',
        ativo: true
    },
    {
        id: '2',
        nome: 'Vendedor 1',
        email: 'vendedor1@engmarqsolution.com',
        senha: 'vendedor123',
        cargo: 'vendedor',
        ativo: true
    }
];

function normalizarCargo(cargo: unknown): CargoUsuario {
    if (cargo === 'admin' || cargo === 'financeiro') {
        return cargo;
    }
    return 'vendedor';
}

function mapearUsuarioSupabase(user: User): UsuarioSessao {
    const nome =
        (typeof user.user_metadata?.nome === 'string' && user.user_metadata.nome.trim()) ||
        (typeof user.user_metadata?.full_name === 'string' && user.user_metadata.full_name.trim()) ||
        user.email?.split('@')[0] ||
        'Usuario';

    const cargoMetadata = user.app_metadata?.role ?? user.user_metadata?.cargo;

    return {
        id: user.id,
        nome,
        email: user.email || '',
        cargo: normalizarCargo(cargoMetadata)
    };
}

function decodificarToken(token: string): { valido: boolean; usuario?: UsuarioSessao } {
    try {
        const payload = JSON.parse(atob(token));
        if (!payload?.exp || payload.exp < Date.now()) {
            return { valido: false };
        }
        return {
            valido: true,
            usuario: {
                id: payload.id,
                nome: payload.nome,
                email: payload.email,
                cargo: normalizarCargo(payload.cargo)
            }
        };
    } catch {
        return { valido: false };
    }
}

function salvarSessaoUsuario(usuario: UsuarioSessao, expMs: number): void {
    const payload = {
        ...usuario,
        exp: expMs
    };
    localStorage.setItem(SESSION_KEY, btoa(JSON.stringify(payload)));
}

function mensagemErroLogin(erro: string): string {
    const erroLower = erro.toLowerCase();
    if (erroLower.includes('invalid login credentials')) {
        return 'E-mail ou senha incorretos';
    }
    if (erroLower.includes('email not confirmed')) {
        return 'E-mail ainda nao confirmado';
    }
    return 'Nao foi possivel autenticar no momento';
}

export function validarCredenciais(email: string, senha: string): Usuario | null {
    const usuario = usuariosAutorizados.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha && u.ativo
    );
    return usuario || null;
}

export function gerarToken(usuario: UsuarioSessao): string {
    const payload = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
        exp: Date.now() + 24 * 60 * 60 * 1000
    };
    return btoa(JSON.stringify(payload));
}

export function validarToken(token: string): { valido: boolean; usuario?: Partial<Usuario> } {
    const resultado = decodificarToken(token);
    if (!resultado.valido) {
        return { valido: false };
    }
    return { valido: true, usuario: resultado.usuario };
}

export function salvarSessao(token: string): void {
    localStorage.setItem(SESSION_KEY, token);
}

export function removerSessao(): void {
    localStorage.removeItem(SESSION_KEY);
    const supabase = getSupabaseClient();
    if (supabase) {
        void supabase.auth.signOut();
    }
}

export function obterSessao(): SessaoResultado {
    const token = localStorage.getItem(SESSION_KEY);
    if (!token) {
        return { logado: false };
    }

    const resultado = decodificarToken(token);
    if (!resultado.valido) {
        localStorage.removeItem(SESSION_KEY);
        return { logado: false };
    }

    return { logado: true, usuario: resultado.usuario };
}

export async function loginComSenha(email: string, senha: string): Promise<LoginResultado> {
    const supabase = getSupabaseClient();

    if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });

        if (error || !data.user || !data.session) {
            return { ok: false, mensagem: mensagemErroLogin(error?.message || 'login_error') };
        }

        const usuario = mapearUsuarioSupabase(data.user);
        const expMs = (data.session.expires_at || Math.floor(Date.now() / 1000) + 24 * 60 * 60) * 1000;
        salvarSessaoUsuario(usuario, expMs);
        return { ok: true, usuario };
    }

    const usuarioLegacy = validarCredenciais(email, senha);
    if (!usuarioLegacy) {
        return { ok: false, mensagem: 'E-mail ou senha incorretos' };
    }

    salvarSessao(gerarToken(usuarioLegacy));
    return {
        ok: true,
        usuario: {
            id: usuarioLegacy.id,
            nome: usuarioLegacy.nome,
            email: usuarioLegacy.email,
            cargo: usuarioLegacy.cargo
        }
    };
}

export async function sincronizarSessaoSupabase(): Promise<void> {
    if (!isSupabaseConfigured()) {
        return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
        return;
    }

    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session || !data.session.user) {
        localStorage.removeItem(SESSION_KEY);
        return;
    }

    const usuario = mapearUsuarioSupabase(data.session.user);
    const expMs = (data.session.expires_at || Math.floor(Date.now() / 1000) + 24 * 60 * 60) * 1000;
    salvarSessaoUsuario(usuario, expMs);
}
