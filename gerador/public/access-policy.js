/* Política compartilhada pelo painel e pelas páginas HTML legadas. */
(function () {
    const commercial = ['v2.html', 'v2-preview.html', 'personalizada.html', 'assessoria.html', 'index.html', 'contrato.html', 'orcamento.html', 'calculadora.html', 'painel.html'];
    const labels = { admin: 'Administrador', vendedor: 'Vendedor', comercial: 'Comercial', financeiro: 'Financeiro', seguranca: 'Segurança' };
    function resource(path) {
        const name = path.split('?')[0].replace(/\/$/, '').split('/').pop();
        if (name === 'encaminhamento-exame' || name === 'gerador-encaminhamento-exame.html') return 'exame';
        if (name === 'gerador-de-proposta' || name === 'gerador') return 'index.html';
        return name;
    }
    function canAccess(role, path) {
        const tool = resource(path);
        if (!Object.hasOwn(labels, role)) return false;
        if (role === 'admin') return true;
        if (role === 'comercial') return commercial.includes(tool);
        if (tool === 'painel-seguranca.html') return role === 'seguranca';
        // Mantém o acesso das contas anteriores às ferramentas existentes.
        return [...commercial, 'recibo.html', 'exame'].includes(tool);
    }
    function session() {
        try {
            const value = JSON.parse(atob(localStorage.getItem('engmarq_session') || ''));
            return value.exp > Date.now() ? value : null;
        } catch { return null; }
    }
    function guard(path = location.pathname) {
        const user = session();
        if (user && canAccess(user.cargo, path)) return true;
        document.documentElement.style.visibility = 'hidden';
        location.replace('/gerador-de-proposta/' + (user ? 'painel.html' : 'login.html'));
        return false;
    }
    window.engmarqAccess = { canAccess, labels, guard };
    if (document.currentScript?.hasAttribute('data-protected')) guard();
})();
