import { goToRoot } from "./goToRoot";

function cadastrar() {
    const nome = document.getElementById("nomeCad");
    const email = document.getElementById("emailCad");
    const telefone = document.getElementById("telefoneCad");
    const cpf = document.getElementById("cpfCad");
    const senha = document.getElementById("senhaCad");
    const senhaConfirm = document.getElementById("senhaConfirmCad");

    let user = {
        id: 0,
        nome: nome.value.trim(),
        email: email.value.trim(),
        telefone: telefone.value.trim(),
        cpf: cpf.value.trim(),
        senha: senha.value
    };

    // Validação de campos vazios
    const camposObrigatorios = ['nome', 'email', 'telefone', 'cpf'];
    for (const campo of camposObrigatorios) {
        if (user[campo] === "") {
            alert(`O campo ${campo} está vazio!`);
            return;
        }
    }

    if (senha.value !== senhaConfirm.value) {
        alert("As senhas não coincidem!");
        return;
    }

    // Verifica se já existe um usuário com o mesmo e-mail
    let fatecanos = JSON.parse(localStorage.getItem("fatecanos")) || []; // Corrige inicialização
    const emailExistente = fatecanos.some(item => item.email === user.email); // Usa .some()

    if (emailExistente) {
        alert("Já existe um usuário com este e-mail!");
        return;
    }

    // Gera ID corretamente
    if (fatecanos.length === 0) {
        user.id = 1;
    } else {
        user.id = fatecanos[fatecanos.length - 1].id + 1;
    }

    fatecanos.push(user);
    localStorage.setItem("fatecanos", JSON.stringify(fatecanos));
    sessionStorage.setItem("fatecano", JSON.stringify(user));

    goToRoot()
}