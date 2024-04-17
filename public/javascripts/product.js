document.addEventListener('DOMContentLoaded', () => {
    // Get all buttons and content sections
    const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.content-section');
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and hide all content sections
        buttons.forEach(btn => btn.classList.remove('active'));
        contents.forEach(content => content.style.display = 'none');
        
        // Add active class to the clicked button
        button.classList.add('active');
        
        // Get the corresponding content section and show it
        const contentId = button.id.replace('-btn', '-content');
        document.getElementById(contentId).style.display = 'block';
      });
    });
  });