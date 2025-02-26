let fatecano = JSON.parse(sessionStorage.getItem("fatecano"));
const header = document.getElementById('header');
const buttons = document.querySelector('.buttons');
const main = document.getElementById('main');

if (fatecano == null) {
    const cadastrar = document.createElement('a');
    cadastrar.onclick = openModal;
    cadastrar.textContent = "Login";
    buttons.appendChild(cadastrar);
    renderBottom();
} else {
    const perfilDiv = document.createElement('div');
    perfilDiv.className = 'perfil';

    const mensagem = document.createElement('p');
    mensagem.textContent = `Bem vindo ${fatecano.nome}!`;

    const logoffLink = document.createElement('a');
    logoffLink.textContent = "Logoff";
    logoffLink.onclick = logoff;

    perfilDiv.appendChild(mensagem);
    perfilDiv.appendChild(logoffLink);

    header.appendChild(perfilDiv);
}

function logoff() {
    sessionStorage.removeItem("fatecano");
    window.location.href = "/docs/index.html"
}

function renderBottom() {
    const inscricao = document.createElement('div')
    inscricao.className = "inscricao"

    const cadastro = document.createElement('div')
    cadastro.className = "cadastro";

    const cadastroP = document.createElement('p')
    cadastroP.innerHTML = "Deseja participar da iniciativa?<br> Faça seu cadastro com seu email para fazer parte desse projeto!"

    const cadastroButton = document.createElement('button')
    cadastroButton.textContent = "Cadastre-se"
    cadastroButton.onclick = cadastrar;

    cadastro.appendChild(cadastroP)
    cadastro.appendChild(cadastroButton)

    const login = document.createElement('div')
    login.className = "login"

    const loginP = document.createElement('p')
    loginP.textContent = "Ou, se já tiver um cadastro, faça login na nossa plataforma!"

    const loginButton = document.createElement('button')
    loginButton.textContent = "Login";
    loginButton.onclick = openModal;

    login.appendChild(loginP)
    login.appendChild(loginButton)

    inscricao.appendChild(cadastro)
    inscricao.appendChild(login)

    main.appendChild(inscricao)
}

function cadastrar() {
    window.location.href = "pages/cadastro.html"
}

function openModal() {
    alert('ui')
}


function openModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function loggar() {

    // Validação do formulário
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const fatecanos = JSON.parse(localStorage.getItem("fatecanos"));

        for (let I = 0; I < fatecanos.length; I++) {
            if (fatecanos[I].email === email) {
                if (fatecanos[I].senha === password) {
                    sessionStorage.setItem("fatecano", JSON.stringify(fatecanos[I]))
                    window.location.href = "/docs/index.html"
                    return;
                } else {
                    alert("Senha incorreta, tente novamente")
                    return;
                }
            }

        }

        
        alert("Usuário não encontrado.")
    });
}