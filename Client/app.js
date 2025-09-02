// client/app.js

// 1. Get a reference to the form element
const reportForm = document.getElementById('report-form');
const responseMessage = document.getElementById('response-message');

// 2. Add an event listener for the 'submit' event
reportForm.addEventListener('submit', async (event) => {
    // 3. Prevent the default form submission behavior (which reloads the page)
    event.preventDefault();

    // 4. Get the data from the form inputs
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;

    // 5. Create a JavaScript object with the form data
    const reportData = {
        description: description,
        location: location,
    };

    try {
        // 6. Use the fetch API to send the data to your server
        const response = await fetch('http://localhost:3000/api/reports', {
            method: 'POST', // We are sending data, so we use POST
            headers: {
                'Content-Type': 'application/json', // Tell the server we're sending JSON
            },
            body: JSON.stringify(reportData), // Convert the JS object to a JSON string
        });

        const result = await response.json();

        if (response.status === 201) {
            responseMessage.textContent = 'Report submitted successfully!';
            reportForm.reset(); // Clear the form
        } else {
            responseMessage.textContent = `Error: ${result.message}`;
        }
    } catch (error) {
        console.error('Failed to submit form:', error);
        responseMessage.textContent = 'An error occurred. Please try again later.';
    }
}); 