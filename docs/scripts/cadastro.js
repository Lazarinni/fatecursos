

const nome = document.getElementById("nome").value;
const email = document.getElementById("email").value;
const telefone = document.getElementById("telefone").value;
const cpf = document.getElementById("cpf").value;
const senha = document.getElementById("senha").value;
const senhaConfirm = document.getElementById("senhaConfirm").value;



function cadastrar () {
    
    let user = {
        nome: nome,
        email: email,
        telefone: telefone,
        cpf: cpf,
        senha: senha
    }
    
    for (let key in user) {
        if(user[key] == ""){
            alert(`${key} está vazio!`);
            return;
        }
    }
    
    let fatecanos = JSON.parse(localStorage.getItem("fatecanos"));

    if (fatecanos == null){
        fatecanos = [];
    }

    fatecanos.push(user);

    alert(JSON.stringify(fatecanos));

    localStorage.setItem("fatecanos", JSON.stringify(fatecanos));
}