import { goToRoot } from './goToRoot.js';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('loginButton').addEventListener('click', loggar);
});

let fatecano = JSON.parse(sessionStorage.getItem("fatecano"));
const header = document.getElementById('header');
const buttons = document.querySelector('.buttons');
const main = document.getElementById('main');
// Adicione estas funções no módulo:
function verSenhaEdit() {
    const senhaEdit = document.getElementById("senhaEdit");
    if (senhaEdit) {
        senhaEdit.type = senhaEdit.type === "password" ? "text" : "password";
    }
}

function verConfirmSenhaEdit() {
    const senhaConfirmEdit = document.getElementById("senhaConfirmEdit");
    if (senhaConfirmEdit) {
        senhaConfirmEdit.type = senhaConfirmEdit.type === "password" ? "text" : "password";
    }
}

// verSenhaButton.addEventListener('click', verSenhaEdit);
// verConfirmSenhaButton.addEventListener('click', verConfirmSenhaEdit);
document.getElementById('loginForm').addEventListener('submit', loggar)

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
        renderEdit();
    }




function logoff() {
    sessionStorage.removeItem("fatecano");
    goToRoot();
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
    cadastroButton.onclick = goToCadastrar;

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

function goToCadastrar() {
    window.location.href = "pages/cadastro.html"
}

function openModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function loggar(e) {
    e.preventDefault();

        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const fatecanos = JSON.parse(localStorage.getItem("fatecanos"));

        for (let I = 0; I < fatecanos.length; I++) {
            if (fatecanos[I].email === email) {
                if (fatecanos[I].senha === password) {
                    sessionStorage.setItem("fatecano", JSON.stringify(fatecanos[I]))
                    goToRoot()
                    return;
                } else {
                    alert("Senha incorreta, tente novamente")
                    return;
                }
            }

        }


        alert("Usuário não encontrado.")
    };

function editInfo() {
    const nomeEdit = document.getElementById("nomeEdit")
const emailEdit = document.getElementById("emailEdit")
const telefoneEdit = document.getElementById("telefoneEdit")
const cpfEdit = document.getElementById("cpfEdit")
const senhaEdit = document.getElementById("senhaEdit")
const senhaConfirmEdit = document.getElementById("senhaConfirmEdit")
    let user;
    try{

        user = {
            id: fatecano.id,
            nome: nomeEdit.value,
            email: emailEdit.value,
            telefone: telefoneEdit.value,
            cpf: cpfEdit.value,
            senha: senhaEdit.value 
    }
 } catch(e){
        alert("Erro ao processar informações do usuário")
        return;
    }

    for (let key in user) {
        if (user[key] == "") {
            alert(`O campo ${key} está vazio!`);
            return;
        }
    }

    if (senhaEdit.value != senhaConfirmEdit.value) {
        alert("Confirme a senha corretamente!");
        return;
    }

    let fatecanos = JSON.parse(localStorage.getItem("fatecanos"));
    fatecanos.forEach(item => {
        if (item.email == user.email && item.email != fatecano.email) {
            alert("Um usuário já possui uma conta com esse email!");
            return;
        }
    });

    for (let i = 0; i < fatecanos.length; i++) {
        if (fatecanos[i].id == user.id) {
            fatecanos[i] = user;
            break;
        }

    }

    localStorage.setItem("fatecanos", JSON.stringify(fatecanos));
    sessionStorage.setItem("fatecano", JSON.stringify(user));

    alert("Informações alteradas com sucesso")
    
    goToRoot();
}

function deleteInfo() {


    if (senhaEdit.value != senhaConfirmEdit.value) {
        alert("Confirme a senha para apagar a conta!");
        return;
    }

    let fatecanosOld = JSON.parse(localStorage.getItem("fatecanos"));
    let fatecanosNew = [];

    fatecanosOld.forEach(item => {
        if (item.id != fatecano.id) {
            fatecanosNew.push(item);
        }
    });

    localStorage.setItem("fatecanos", JSON.stringify(fatecanosNew));

    sessionStorage.clear();

    alert("Conta apagada com sucesso")
    goToRoot();

}

function renderEdit() {

    const pessoalDiv = document.createElement('div');
    pessoalDiv.className = 'pessoal';

    const topDiv = document.createElement('div');
    topDiv.className = 'top';

    const h2 = document.createElement('h2');
    h2.textContent = 'Edite suas informações';

    const deleteButton = document.createElement('button');
    deleteButton.onclick = deleteInfo;
    deleteButton.innerHTML = 'Apagar a conta <img src="src/trash.png" alt="">';

    topDiv.appendChild(h2);
    topDiv.appendChild(deleteButton);

    const botDiv = document.createElement('div');
    botDiv.className = 'bot';

    const leftDiv = document.createElement('div');
    leftDiv.className = 'left';

    function createInputField(labelText, inputId, inputType = 'text') {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';

        const label = document.createElement('label');
        label.setAttribute('for', inputId);
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = inputType;
        input.id = inputId;

        infoDiv.appendChild(label);
        infoDiv.appendChild(input);

        return infoDiv;
    }

    // Adiciona os campos de entrada à div da esquerda
    leftDiv.appendChild(createInputField('Nome completo', 'nomeEdit'));
    leftDiv.appendChild(createInputField('Email', 'emailEdit'));
    leftDiv.appendChild(createInputField('Telefone', 'telefoneEdit'));
    leftDiv.appendChild(createInputField('CPF', 'cpfEdit'));

    // Cria o campo de senha com botão de ver senha
    const senhaDiv = document.createElement('div');
    senhaDiv.className = 'info';

    const senhaLabel = document.createElement('label');
    senhaLabel.setAttribute('for', 'senhaEdit');
    senhaLabel.textContent = 'Senha';

    const senhaInputDiv = document.createElement('div');
    senhaInputDiv.className = 'senha';

    const senhaInput = document.createElement('input');
    senhaInput.type = 'password';
    senhaInput.id = 'senhaEdit';

    const verSenhaButton = document.createElement('button');
    verSenhaButton.onclick = verSenhaEdit;

    senhaInputDiv.appendChild(senhaInput);
    senhaInputDiv.appendChild(verSenhaButton);

    senhaDiv.appendChild(senhaLabel);
    senhaDiv.appendChild(senhaInputDiv);

    leftDiv.appendChild(senhaDiv);

    const senhaConfirmDiv = document.createElement('div');
    senhaConfirmDiv.className = 'info';

    const senhaConfirmLabel = document.createElement('label');
    senhaConfirmLabel.setAttribute('for', 'senhaConfirmEdit');
    senhaConfirmLabel.textContent = 'Confirme sua senha';

    const senhaConfirmInputDiv = document.createElement('div');
    senhaConfirmInputDiv.className = 'senha';

    const senhaConfirmInput = document.createElement('input');
    senhaConfirmInput.type = 'password';
    senhaConfirmInput.id = 'senhaConfirmEdit';

    const verConfirmSenhaButton = document.createElement('button');
    verConfirmSenhaButton.onclick = verConfirmSenhaEdit;

    senhaConfirmInputDiv.appendChild(senhaConfirmInput);
    senhaConfirmInputDiv.appendChild(verConfirmSenhaButton);

    senhaConfirmDiv.appendChild(senhaConfirmLabel);
    senhaConfirmDiv.appendChild(senhaConfirmInputDiv);

    leftDiv.appendChild(senhaConfirmDiv);

    const rightDiv = document.createElement('div');
    rightDiv.className = 'right';

    const editButton = document.createElement('button');
    editButton.type = 'submit';
    editButton.onclick = editInfo;
    editButton.textContent = 'Editar';

    rightDiv.appendChild(editButton);

    botDiv.appendChild(leftDiv);
    botDiv.appendChild(rightDiv);

    pessoalDiv.appendChild(topDiv);
    pessoalDiv.appendChild(botDiv);

    main.appendChild(pessoalDiv);

    nomeEdit.value = fatecano.nome;
    emailEdit.value = fatecano.email;
    telefoneEdit.value = fatecano.telefone;
    cpfEdit.value = fatecano.cpf;
    senhaInput.value = fatecano.senha;

}