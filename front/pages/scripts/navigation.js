
fetch('/front/pages/navigation-menu-page/navigation-menu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navigation-menu-container').innerHTML = data;
        configureButtonSelection(); 
    })
    .catch(error => console.error('Erro ao carregar o navigation-menu:', error));
    
// Carregar o sidebar
fetch('/front/pages/sidebar-page/sidebar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data;
        configureSidebarNavigation();
        configureButtonSelection();
        configureSidebarSelection();  
    })
    .catch(error => console.error('Erro ao carregar o sidebar:', error));


// Configurar eventos do sidebar
function configureSidebarNavigation() {

    const sidebarButtons = document.querySelectorAll('.sidebar nav button');
    const navMenuButtons = document.querySelectorAll('.navigation-menu button');

    // Mapeamento das ações por botão do sidebar
    const visibilityMap = {
        'Dashboard': ['Dashboard'],
        'Envio de Talões': ['Status de Envio', 'Enviar Talão'],
        'Recebimento de Talões': ['Recebimento'],
        'Gerenciar Estoque': ['Estoque', 'Estoque Geral'],
        'Gerenciar Perfil': ['Cadastrar Usuário', 'Perfil', 'Usuário'],
        'Cadastrar Loja': ['Cadastrar Loja', 'Lojas']
    };

    // Inicializa todos os botões do navigation-menu como invisíveis
    navMenuButtons.forEach(navButton => {
        navButton.style.display = 'none'; 
        navButton.disabled = true; 
    });

    // Adiciona eventos de clique nos botões do sidebar
    sidebarButtons.forEach(button => {
        const spanText = button.querySelector('span').innerText.trim();

        button.addEventListener('click', () => {
            let firstButtonActivated = false;

            navMenuButtons.forEach(navButton => {
                const navButtonText = navButton.innerText.trim();
                if (
                    visibilityMap[spanText] &&
                    visibilityMap[spanText].includes(navButtonText)
                ) {
                    navButton.style.display = 'block';  // Exibe o botão correspondente
                    navButton.disabled = false;        // Habilita o botão

                    // Ativar o primeiro botão da lista visível
                    //if (!firstButtonActivated) {
                       // navButton.classList.add('selected');  // Adiciona a classe 'selected'
                        //firstButtonActivated = true;  // Marca que o primeiro botão já foi ativado
                    //}
                } else {
                    navButton.style.display = 'none';   // Oculta outros botões
                    navButton.disabled = true;          // Desabilita botões não correspondentes
                }
            });
        });
    });
}

// Configurar a seleção de botões no navigation-menu
function configureButtonSelection() {
    // Seleciona todos os botões dentro da nav com a classe 'navigation-menu'
    const buttons = document.querySelectorAll('.navigation-menu button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'selected' de todos os botões
            buttons.forEach(btn => btn.classList.remove('selected'));

            // Adiciona a classe 'selected' ao botão clicado
            button.classList.add('selected');
        });
    });
}

// Configurar a seleção de botões do sidebar
function configureSidebarSelection() {
    // Seleciona todos os botões dentro do sidebar
    const sidebarButtons = document.querySelectorAll('.sidebar nav button');

    // Adiciona um evento de clique para cada botão
    sidebarButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'selected' de todos os botões do sidebar
            sidebarButtons.forEach(btn => btn.classList.remove('selected'));

            // Adiciona a classe 'selected' ao botão clicado
            button.classList.add('selected');
        });
    });
}

