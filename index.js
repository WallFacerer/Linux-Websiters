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
      
      // Send email via PHP backend
      const formData = new FormData();
      formData.append('name', naam);
      formData.append('email', email);
      formData.append('message', bericht);
      
      fetch('contact.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          if (formMessage) {
            formMessage.textContent = data.message || 'Bedankt voor je bericht! We nemen zo snel mogelijk contact op.';
            formMessage.style.color = 'var(--success)';
          }
          submitBtn.textContent = 'Verzonden!';
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Form submission failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        if (formMessage) {
          formMessage.textContent = error.message || 'Er is een fout opgetreden. Probeer het later opnieuw.';
          formMessage.style.color = 'var(--danger)';
        }
        submitBtn.textContent = 'Fout';
      })
      .finally(() => {
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          if (formMessage) {
            setTimeout(() => {
              formMessage.textContent = '';
            }, 5000);
          }
        }, 3000);
      });
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

  // Enhanced Stats Counter Animation
  const statNumbers = document.querySelectorAll('.stat-card h3');
  const animateStats = () => {
    statNumbers.forEach(stat => {
      const text = stat.textContent;
      const isPercentage = text.includes('%');
      const isMillions = text.includes('Miljoenen');
      const isAndroid = text.includes('Android');
      
      if (isAndroid) return; // Skip Android text
      
      let targetValue = parseInt(text.replace(/\D/g, ''));
      let currentValue = 0;
      const increment = targetValue / 50;
      
      const updateCounter = () => {
        if (currentValue < targetValue) {
          currentValue += increment;
          if (currentValue > targetValue) currentValue = targetValue;
          
          if (isPercentage) {
            stat.textContent = Math.floor(currentValue) + '%+';
          } else if (isMillions) {
            stat.textContent = 'Miljoenen';
          } else {
            stat.textContent = Math.floor(currentValue) + '%';
          }
          
          requestAnimationFrame(updateCounter);
        }
      };
      
      updateCounter();
    });
  };

  // Trigger stats animation when in viewport
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }

  // Enhanced Gallery Hover Effects
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    const overlay = item.querySelector('.gallery-overlay');
    
    item.addEventListener('mouseenter', () => {
      if (img) img.style.transform = 'scale(1.1)';
      if (overlay) overlay.style.transform = 'translateY(0)';
    });
    
    item.addEventListener('mouseleave', () => {
      if (img) img.style.transform = 'scale(1)';
      if (overlay) overlay.style.transform = 'translateY(100%)';
    });
  });

  // Parallax Effect for Hero Section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      hero.style.transform = `translateY(${parallax}px)`;
    });
  }

  // Typing Effect for Hero Title
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;
    
    const typeWriter = () => {
      if (index < text.length) {
        heroTitle.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
      }
    };
    
    setTimeout(typeWriter, 500);
  }

  // Enhanced Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });
      
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          validateField(input);
        }
      });
    });
  }

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    field.classList.remove('error');
    
    if (field.hasAttribute('required') && !value) {
      isValid = false;
    }
    
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    }
    
    if (!isValid) {
      field.classList.add('error');
    }
    
    return isValid;
  }

  // Add loading states for buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (!this.classList.contains('no-loading')) {
        this.classList.add('loading');
        setTimeout(() => {
          this.classList.remove('loading');
        }, 1000);
      }
    });
  });

  // Enhanced Mobile Touch Support
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.card, .btn, .gallery-item');
    touchElements.forEach(el => {
      el.addEventListener('touchstart', () => {
        el.classList.add('touch-active');
      });
      
      el.addEventListener('touchend', () => {
        setTimeout(() => {
          el.classList.remove('touch-active');
        }, 150);
      });
    });
  }

  // Performance optimization - Lazy loading for images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    img.classList.add('lazy');
    imageObserver.observe(img);
  });
});
