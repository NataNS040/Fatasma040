/**
 * Script de Login - EngMarq Solution
 */

import { validarCredenciais, gerarToken, salvarSessao, obterSessao } from './auth/usuarios';

// Verifica se já está logado
const sessao = obterSessao();
if (sessao.logado) {
    // Redireciona para o gerador
    window.location.href = './index.html';
}

// Elementos do DOM
const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const senhaInput = document.getElementById('senha') as HTMLInputElement;
const btnLogin = document.getElementById('btnLogin') as HTMLButtonElement;
const loginError = document.getElementById('loginError') as HTMLDivElement;
const errorMessage = document.getElementById('errorMessage') as HTMLSpanElement;
const togglePassword = document.getElementById('togglePassword') as HTMLButtonElement;
const lembrarCheckbox = document.getElementById('lembrar') as HTMLInputElement;

// Toggle visibilidade da senha
togglePassword?.addEventListener('click', () => {
    const type = senhaInput.type === 'password' ? 'text' : 'password';
    senhaInput.type = type;
    
    const icon = togglePassword.querySelector('i');
    if (icon) {
        icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    }
});

// Carregar email salvo se existir
const emailSalvo = localStorage.getItem('engmarq_email_salvo');
if (emailSalvo) {
    emailInput.value = emailSalvo;
    lembrarCheckbox.checked = true;
}

// Função para mostrar erro
function mostrarErro(mensagem: string) {
    errorMessage.textContent = mensagem;
    loginError.classList.add('show');
    emailInput.classList.add('error');
    senhaInput.classList.add('error');
}

// Função para esconder erro
function esconderErro() {
    loginError.classList.remove('show');
    emailInput.classList.remove('error');
    senhaInput.classList.remove('error');
}

// Submit do formulário
loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    esconderErro();
    
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    
    if (!email || !senha) {
        mostrarErro('Preencha todos os campos');
        return;
    }
    
    // Mostrar loading
    btnLogin.classList.add('loading');
    btnLogin.disabled = true;
    
    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Validar credenciais
    const usuario = validarCredenciais(email, senha);
    
    if (usuario) {
        // Salvar email se marcou "lembrar"
        if (lembrarCheckbox.checked) {
            localStorage.setItem('engmarq_email_salvo', email);
        } else {
            localStorage.removeItem('engmarq_email_salvo');
        }
        
        // Gerar e salvar token
        const token = gerarToken(usuario);
        salvarSessao(token);
        
        // Redirecionar para o gerador
        window.location.href = './index.html';
    } else {
        btnLogin.classList.remove('loading');
        btnLogin.disabled = false;
        mostrarErro('E-mail ou senha incorretos');
    }
});

// Limpar erro ao digitar
emailInput?.addEventListener('input', esconderErro);
senhaInput?.addEventListener('input', esconderErro);
