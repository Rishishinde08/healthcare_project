 // Form submission handling
 document.getElementById('healthcare-contact').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to your server
    // For demonstration, we'll just show an alert
    alert('Thank you for your message! We will contact you shortly.');
    this.reset();
  });