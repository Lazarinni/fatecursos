let fatecano = JSON.parse(sessionStorage.getItem("fatecano"));
const header = document.getElementById('header');
const buttons = document.querySelector('.buttons');
const main = document.getElementById('main');

if (fatecano == null){
    const cadastrar = document.createElement('a');
    cadastrar.href = "./pages/cadastro.html";
    cadastrar.textContent = "Cadastre-se!";
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

function logoff(){
    sessionStorage.removeItem("fatecano");
    window.location.href = "/docs/index.html"
}

function renderBottom(){
    const inscricao = document.createElement('div')
    inscricao.className = "inscricao"

    const cadastro = document.createElement('div')
    cadastro.className = "cadastro";

    const cadastroP = document.createElement('p')
    cadastroP.innerHTML = "Deseja participar da iniciativa?<br> Faça seu cadastro com seu email para fazer parte desse projeto!"

    const cadastroButton = document.createElement('button')
    cadastroButton.textContent = "Cadastre-se"

    cadastro.appendChild(cadastroP)
    cadastro.appendChild(cadastroButton)
    
    const login = document.createElement('div')
    login.className = "login"

    const loginP = document.createElement('p')
    loginP.textContent = "Ou, se já tiver um cadastro, faça login na nossa plataforma!"

    const loginButton = document.createElement('button')
    loginButton.textContent = "Login"

    login.appendChild(loginP)
    login.appendChild(loginButton)

    inscricao.appendChild(cadastro)
    inscricao.appendChild(login)

    main.appendChild(inscricao)
}