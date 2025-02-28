export function goToRoot() {
    // Obtém o caminho atual
    const currentPath = window.location.pathname;
  
    // Remove o nome do repositório do caminho (se for um project site)
    const pathSegments = currentPath.split('/');
    let basePath = '/'; // Padrão para user site (username.github.io)
  
    // Detecta se é um project site (ex: username.github.io/repo/)
    if (pathSegments[1] && pathSegments[1] !== 'index.html') {
      basePath = `/${pathSegments[1]}/`;
    }
  
    // Redireciona para o index.html na raiz
    window.location.href = `${basePath}index.html`;
  }