// --- Inicializa o AOS ---
AOS.init({
    duration: 800, // Duração da animação em ms
    once: true, // Animar apenas uma vez
    offset: 50, // Offset (em px) para disparar a animação
});

// --- Atualiza o ano no footer ---
document.getElementById('current-year').textContent = new Date().getFullYear();

// --- Lógica do Menu Mobile ---
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
// Fecha o menu mobile ao clicar em um link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// --- Lógica do Scroll Ativo na Navbar (CORRIGIDA) ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

function changeNav(linksNodeList) {
    const links = Array.from(linksNodeList); // Converte para Array
    let currentSectionId = '';

    // Encontra a seção atual com base na posição do scroll
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) { // 100px de offset
            currentSectionId = section.getAttribute('id');
        }
    });

    // Itera sobre todos os links
    links.forEach(link => {
        link.classList.remove('nav-link-active');
        link.classList.add('nav-link-hover');

        // Adiciona a classe ativa se o href do link corresponder ao ID da seção atual
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('nav-link-active');
            link.classList.remove('nav-link-hover');
        }
    });

    // Caso especial: Se estiver no topo (seção home), nenhum link deve estar ativo
    if (currentSectionId === 'home' || (window.scrollY < sections[1].offsetTop - 100)) {
        links.forEach(link => {
            link.classList.remove('nav-link-active');
            link.classList.add('nav-link-hover');
        });
    }
}

// Adiciona o listener de scroll
window.addEventListener('scroll', () => {
    changeNav(navLinks);
    changeNav(mobileNavLinks);
});

// Define o link ativo no carregamento inicial
changeNav(navLinks);
changeNav(mobileNavLinks);