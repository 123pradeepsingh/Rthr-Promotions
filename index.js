// document.addEventListener("contextmenu",(e)=>{
//     e.preventDefault();
// })
// document.addEventListener("keydown", (event) => {
//     // Check if F12 or Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+U is pressed
//     if (event.key === "F12" || 
//         (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || 
//         (event.ctrlKey && event.key === "U")) {
//         event.preventDefault();
//     }
// });

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic form validation
    if (!name || !email || !message) {
        console.log('Validation failed: All fields are required!');
        alert('All fields are required!');
        return;
    }

    // Create a timestamp for when the message was submitted
    const timestamp = new Date().toISOString();

    // Prepare the data to be sent to the server
    const formData = {
        name,
        email,
        message,
        timestamp
    };

    console.log('Form data prepared:', formData);

    // Send the data using the Fetch API
    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            // If the response is not OK, throw an error
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Server response:', data);
        if (data.status === 'success') {
            alert('Message saved successfully!');
            // Optionally reset the form after successful submission
            document.getElementById('contact-form').reset();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error in fetch request:', error);
        alert('There was an error submitting your message: ' + error.message);
    });
});
