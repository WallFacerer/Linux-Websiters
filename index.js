document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const naam = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const bericht = this.querySelector('textarea').value;
      
      // Send email via FormSubmit service
      fetch('https://formsubmit.co/klaas.francart@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: naam,
          email: email,
          message: bericht
        })
      })
      .then(response => {
        if (response.ok) {
          alert('Bericht succesvol verzonden!');
          contactForm.reset();
        } else {
          alert('Er is een fout opgetreden. Probeer het later opnieuw.');
        }
      })
      .catch(error => {
        console.error('Fout:', error);
        alert('Er is een fout opgetreden. Probeer het later opnieuw.');
      });
    });
  }
});