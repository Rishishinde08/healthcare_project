 // Video Category Filter
 document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const category = this.dataset.category;
      const videos = document.querySelectorAll('.video-card');
      
      videos.forEach(video => {
        if (category === 'all' || video.dataset.category === category) {
          video.style.display = 'block';
        } else {
          video.style.display = 'none';
        }
      });
    });
  });
  
  // Load More Button (simulated functionality)
  document.querySelector('.load-more-btn').addEventListener('click', function() {
    alert('In a real implementation, this would load more videos from your database or YouTube channel.');
    // You would typically make an AJAX call here to fetch more videos
  });