

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const cpf = document.getElementById("cpf");
const senha = document.getElementById("senha");
const senhaConfirm = document.getElementById("senhaConfirm");

function verSenha(){
    if (senha.type === "password"){
        senha.type = "text";
    } else {
        senha.type = "password";
    }
}


function verConfirmSenha() {
    if (senhaConfirm.type === "password") {
        senhaConfirm.type = "text";
    } else {
        senhaConfirm.type = "password";
    }
}

function cadastrar () {
    
    let user = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        cpf: cpf.value,
        senha: senha.value
    }
    
    for (let key in user) {
        if(user[key] == ""){
            alert(`O campo ${key} está vazio!`);
            return;
        }
    }

    if (senha.value != senhaConfirm.value){
        alert("Confirme a senha corretamente!");
        return;
    }


    
    let fatecanos = JSON.parse(localStorage.getItem("fatecanos"));

    if (fatecanos == null){
        fatecanos = [];
    }
    let found = false;

    fatecanos.forEach(item => {
        if (item.email == user.email){
            alert("Você já possui um login com esse email!");
            found = true;
            return;
        } 
    });

    if (found == true){
        return;
    }
    fatecanos.push(user);

    localStorage.setItem("fatecanos", JSON.stringify(fatecanos));
    sessionStorage.setItem("fatecano", JSON.stringify(user));

    window.location.href = "../index.html"
}