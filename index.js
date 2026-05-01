document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      menuBtn.textContent = isOpen ? '✕' : '☰';
      menuBtn.setAttribute('aria-expanded', isOpen);
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.textContent = '☰';
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal, .card, .stat-card, .timeline-item, .feature-box');
  
  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealOnScroll.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealOnScroll.observe(el);
  });
  
  // Header shadow on scroll
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
  
  // Contact Form Handler
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Verzenden...';
      submitBtn.disabled = true;
      
      const naam = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const bericht = this.querySelector('textarea').value;
      
      // Simulate form submission (replace with actual endpoint)
      setTimeout(() => {
        if (formMessage) {
          formMessage.textContent = 'Bedankt voor je bericht! We nemen zo snel mogelijk contact op.';
          formMessage.style.color = 'var(--success)';
        }
        
        submitBtn.textContent = 'Verzonden!';
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          if (formMessage) {
            formMessage.textContent = '';
          }
        }, 3000);
      }, 1500);
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
