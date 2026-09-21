// Executa o código somente depois que o HTML da página for carregado.
document.addEventListener('DOMContentLoaded', () => {

  // Seleciona os elementos da página usados pelo JavaScript.
  const header = document.getElementById('site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mainMenu = document.getElementById('main-menu');
  const scrollTop = document.getElementById('scroll-top');
  const contactForm = document.getElementById('form-contato');


  // Adiciona o efeito visual ao cabeçalho quando a página é rolada.
  const updateHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();


  // Fecha o menu mobile e restaura o ícone de menu.
  const closeMobileMenu = () => {
    if (!menuToggle || !mainMenu) return;

    mainMenu.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');

    const icon = menuToggle.querySelector('i');

    if (icon) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  };


  // Abre e fecha o menu mobile ao clicar no botão.
  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainMenu.classList.toggle('is-open');

      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Fechar menu' : 'Abrir menu'
      );

      const icon = menuToggle.querySelector('i');

      if (icon) {
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-xmark', isOpen);
      }
    });


    // Fecha o menu mobile após clicar em uma opção de navegação.
    mainMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });


    // Fecha o menu mobile quando a tela volta para o tamanho desktop.
    window.addEventListener('resize', () => {
      if (window.innerWidth > 680) {
        closeMobileMenu();
      }
    });
  }


  // Exibe o botão "Voltar ao topo" depois de rolar a página.
  const updateScrollTop = () => {
    if (!scrollTop) return;

    scrollTop.classList.toggle('is-visible', window.scrollY > 280);
  };

  window.addEventListener('scroll', updateScrollTop, { passive: true });
  updateScrollTop();


  // Processa o formulário de contato e abre o aplicativo de e-mail.
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Obtém os valores preenchidos no formulário.
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const assunto =
        document.getElementById('assunto').value ||
        'Contato pelo portfólio';
      const mensagem = document.getElementById('mensagem').value.trim();


      // Verifica se os campos obrigatórios foram preenchidos.
      if (!nome || !email || !mensagem) {
        contactForm.reportValidity();
        return;
      }


      // Monta o conteúdo que será enviado pelo e-mail.
      const corpo = `Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`;

      const destinatario = 'luisguferreira2020@gmail.com';


      // Abre o aplicativo de e-mail com os dados preenchidos.
      window.location.href =
        `mailto:${destinatario}` +
        `?subject=${encodeURIComponent(assunto)}` +
        `&body=${encodeURIComponent(corpo)}`;
    });
  }
});