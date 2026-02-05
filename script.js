document.getElementById('emailForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    try {
        // Send to n8n webhook
        const response = await fetch('https://jhonieyaa.app.n8n.cloud/webhook/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            // Show success message
            successMessage.classList.add('show');
            
            // Clear form
            this.reset();
            
            // Hide message after 4 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 4000);
        } else {
            alert('Failed to send email. Please try again.');
        }
    } catch (error) {
        alert('Error sending email. Please check your connection.');
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = 'SEND EMAIL ➤';
    }
});
