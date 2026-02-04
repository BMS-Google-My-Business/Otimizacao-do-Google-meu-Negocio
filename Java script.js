// script.js

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Atualizar ano no footer (se necessário)
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // Suavizar ancora links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adicionar classe de scroll para header
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Efeito sutil de aparecimento de elementos ao rolar
        const fadeElements = document.querySelectorAll('.card, .service-card, .proof-card, .plan-card');
        
        fadeElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('fade-in-visible');
            }
        });
        
        lastScroll = currentScroll;
    });
    
    // Inicializar elementos com fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação de entrada
    document.querySelectorAll('.card, .service-card, .proof-card, .plan-card, .process-step, .timeline-step').forEach(el => {
        observer.observe(el);
    });
    
    // Adicionar funcionalidade de "voltar ao topo"
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.classList.add('back-to-top');
    backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Mostrar/ocultar botão "voltar ao topo"
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Adicionar efeito de digitação para headline (opcional)
    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline) {
        const originalText = heroHeadline.textContent;
        heroHeadline.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroHeadline.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Iniciar efeito quando a seção hero estiver visível
        const heroObserver = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                setTimeout(typeWriter, 500);
                heroObserver.unobserve(heroHeadline);
            }
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroHeadline);
    }
    
    // Adicionar CSS para o botão "voltar ao topo" e animações
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--color-primary);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background: var(--color-accent);
            transform: translateY(-3px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }
        
        .fade-in-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .card, .service-card, .proof-card, .plan-card, .process-step, .timeline-step {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Substituir número do WhatsApp pelo seu
    // Encontre e substitua todos os links do WhatsApp
    const whatsappNumber = "5511999999999"; // Substitua pelo seu número
    
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        const currentHref = link.getAttribute('href');
        const newHref = currentHref.replace(/wa\.me\/\d+/, `wa.me/${whatsappNumber}`);
        link.setAttribute('href', newHref);
    });
    
    // Log para depuração
    console.log('Site de Otimização GMN carregado com sucesso!');
});