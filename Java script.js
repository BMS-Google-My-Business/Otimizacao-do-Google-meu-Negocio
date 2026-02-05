// script.js - Funcionalidades da página de produto

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de produto BMS carregada com sucesso.');
    
    // ============================================
    // CONFIGURAÇÕES GERAIS
    // ============================================
    const WHATSAPP_NUMBER = "5516981005730";
    
    // ============================================
    // BOTÕES DE NAVEGAÇÃO
    // ============================================
    
    // Botão "Ver os planos" do Hero
    const verPlanosBtn = document.getElementById('ver-planos-btn');
    if (verPlanosBtn) {
        verPlanosBtn.addEventListener('click', function() {
            scrollToSection('planos-section');
        });
    }
    
    // Botão "Entender como funciona" do Hero
    const entenderFuncionaBtn = document.getElementById('entender-funciona-btn');
    if (entenderFuncionaBtn) {
        entenderFuncionaBtn.addEventListener('click', function() {
            scrollToSection('como-funciona');
        });
    }
    
    // ============================================
    // BOTÕES DE PLANOS
    // ============================================
    const planoButtons = document.querySelectorAll('.plano-cta');
    
    planoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planoNome = this.getAttribute('data-plano') || 
                             this.closest('.plano-card').querySelector('.plano-nome').textContent;
            
            const message = `Olá, tenho interesse no plano ${planoNome} de otimização de Google Meu Negócio. Pode me explicar melhor como funciona?`;
            openWhatsApp(message);
            
            // Log para analytics (substitua por seu código de tracking)
            console.log(`Plano selecionado: ${planoNome}`);
        });
    });
    
    // ============================================
    // BOTÕES DO WHATSAPP
    // ============================================
    
    // Botão CTA Final
    const whatsappCtaFinal = document.getElementById('whatsapp-cta-final');
    if (whatsappCtaFinal) {
        whatsappCtaFinal.addEventListener('click', function() {
            const message = "Olá, gostaria de conversar sobre a otimização do Google Meu Negócio para minha empresa.";
            openWhatsApp(message);
        });
    }
    
    // Link WhatsApp do Footer (já tem href, mas adicionamos tracking)
    const whatsappFooter = document.getElementById('whatsapp-footer');
    if (whatsappFooter) {
        whatsappFooter.addEventListener('click', function() {
            console.log('WhatsApp do Footer clicado');
            // Adicione seu código de tracking aqui
        });
    }
    
    // ============================================
    // ATUALIZAÇÃO DO ANO NO COPYRIGHT
    // ============================================
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }
    
    // ============================================
    // BOTÃO VOLTAR AO TOPO
    // ============================================
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollToTopBtn) {
        // Mostrar/ocultar botão ao rolar
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll suave para o topo
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // ANIMAÇÕES DE ENTRADA
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.card, .timeline-bloco, .beneficio-card, .incluso-card, .plano-card, .timeline-passo').forEach(el => {
        observer.observe(el);
    });
    
    // ============================================
    // FUNÇÕES UTILITÁRIAS
    // ============================================
    
    // Função para scroll suave até uma seção
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
    
    // Função para abrir WhatsApp com mensagem
    function openWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        // Para produção, descomente a linha abaixo
        window.open(whatsappURL, '_blank');
        
        // Para desenvolvimento, apenas log
        console.log('WhatsApp URL:', whatsappURL);
    }
    
    // ============================================
    // CONTROLE DE Z-INDEX PARA HOVER DOS CARDS
    // ============================================
    const cards = document.querySelectorAll('.card, .plano-card, .beneficio-card, .incluso-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Temporariamente aumentar z-index para hover
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            // Restaurar z-index padrão
            this.style.zIndex = '1';
        });
    });
    
    // ============================================
    // INICIALIZAÇÃO DE ANIMAÇÕES
    // ============================================
    // Adicionar CSS para animações de fade-in
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .card, .timeline-bloco, .beneficio-card, .incluso-card, .plano-card, .timeline-passo {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animationStyles);
    
    // ============================================
    // TRACKING DE INTERAÇÕES (EXEMPLO)
    // ============================================
    // Exemplo de como adicionar tracking de eventos
    // Descomente e adapte conforme sua necessidade
    
    /*
    function trackEvent(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        console.log(`Evento tracked: ${category} - ${action} - ${label}`);
    }
    
    // Exemplo de uso:
    // planoButtons.forEach(button => {
    //     button.addEventListener('click', function() {
    //         const planoNome = this.getAttribute('data-plano');
    //         trackEvent('Planos', 'click', `Plano ${planoNome}`);
    //     });
    // });
    */
    
    console.log('Script inicializado com todas as funcionalidades.');
});

// ============================================
// FUNÇÕES GLOBAIS (disponíveis em todo o escopo)
// ============================================

/**
 * Função global para abrir WhatsApp (pode ser chamada de qualquer lugar)
 * @param {string} message - Mensagem a ser enviada
 */
function openWhatsAppGlobal(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/5516981005730?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

/**
 * Função global para rolar até uma seção
 * @param {string} sectionId - ID da seção
 */
function scrollToSectionGlobal(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}