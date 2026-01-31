/**
 * Lista de usuários autorizados a acessar o gerador de propostas
 * Para adicionar um novo vendedor, basta adicionar um novo objeto ao array
 */

export interface Usuario {
    id: string;
    nome: string;
    email: string;
    senha: string; // Em produção, usar hash de senha
    cargo: 'vendedor' | 'admin';
    ativo: boolean;
}

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
    },
    // Adicione mais vendedores aqui
];

/**
 * Valida as credenciais do usuário
 */
export function validarCredenciais(email: string, senha: string): Usuario | null {
    const usuario = usuariosAutorizados.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha && u.ativo
    );
    return usuario || null;
}

/**
 * Gera um token simples de sessão
 */
export function gerarToken(usuario: Usuario): string {
    const payload = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
        exp: Date.now() + (24 * 60 * 60 * 1000) // Expira em 24 horas
    };
    return btoa(JSON.stringify(payload));
}

/**
 * Valida e decodifica o token
 */
export function validarToken(token: string): { valido: boolean; usuario?: Partial<Usuario> } {
    try {
        const payload = JSON.parse(atob(token));
        if (payload.exp < Date.now()) {
            return { valido: false };
        }
        return { 
            valido: true, 
            usuario: {
                id: payload.id,
                nome: payload.nome,
                email: payload.email,
                cargo: payload.cargo
            }
        };
    } catch {
        return { valido: false };
    }
}

/**
 * Salva o token no localStorage
 */
export function salvarSessao(token: string): void {
    localStorage.setItem('engmarq_session', token);
}

/**
 * Remove a sessão do localStorage
 */
export function removerSessao(): void {
    localStorage.removeItem('engmarq_session');
}

/**
 * Obtém a sessão atual
 */
export function obterSessao(): { logado: boolean; usuario?: Partial<Usuario> } {
    const token = localStorage.getItem('engmarq_session');
    if (!token) {
        return { logado: false };
    }
    
    const resultado = validarToken(token);
    if (!resultado.valido) {
        removerSessao();
        return { logado: false };
    }
    
    return { logado: true, usuario: resultado.usuario };
}
