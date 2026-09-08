import { obterSessao, removerSessao, sincronizarSessaoSupabase } from './auth/usuarios';

async function iniciar(): Promise<void> {
    await sincronizarSessaoSupabase();
    if (!window.engmarqAccess.guard()) return;
    const usuario = obterSessao().usuario!;
    const nome = usuario.nome || usuario.email || 'Usuário';
    document.getElementById('userNameText')!.textContent = nome;
    document.getElementById('welcomeName')!.textContent = nome.split(' ')[0];
    document.getElementById('userAvatar')!.textContent = nome[0].toUpperCase();
    const role = document.getElementById('userRoleText');
    if (role) role.textContent = window.engmarqAccess.labels[usuario.cargo!];
    for (const grid of document.querySelectorAll<HTMLElement>('.cards-grid')) {
        for (const card of grid.querySelectorAll<HTMLAnchorElement>('.tool-card')) {
            if (!window.engmarqAccess.canAccess(usuario.cargo!, new URL(card.href).pathname)) card.remove();
        }
        const count = grid.querySelectorAll('.tool-card').length;
        const heading = grid.previousElementSibling;
        if (!count) { heading?.remove(); grid.remove(); }
        else {
            const counter = heading?.querySelector('.count');
            if (counter) counter.textContent = `${count} ferramenta${count === 1 ? '' : 's'}`;
        }
    }
    document.documentElement.style.visibility = 'visible';
}
document.querySelector('.btn-logout')?.addEventListener('click', () => {
    removerSessao(); location.replace('/gerador-de-proposta/login.html');
});
void iniciar().catch(error => {
    console.error('Falha ao carregar painel:', error);
    removerSessao(); location.replace('/gerador-de-proposta/login.html');
});
