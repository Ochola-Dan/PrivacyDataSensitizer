// Function to detect and analyze forms
function analyzeForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        const personalData = [];
        inputs.forEach(input => {
            const inputValue = input.value.toLowerCase();
            if (
                input.type === 'password' || 
                input.name.match(/(ssn|creditcard|phone|email)/i) ||
                inputValue.includes('name') ||
                inputValue.includes('address') ||
                inputValue.includes('national identification number') ||
                inputValue.includes('biometric data') ||
                inputValue.includes('health')
            ) {
                personalData.push(input.type === 'password' ? 'Password' : input.name);
            }
        });
        if (personalData.length > 0) {
            showWarning(personalData, form);
        }
    });
}

// Function to show warning toast message
function showWarning(personalData, form) {
    const warningMessage = `This form may collect the following sensitive information: ${personalData.join(', ')}. Proceed with caution.`;
    const toast = document.createElement('div');
    toast.classList.add('warning-toast');
    toast.innerText = warningMessage;
    toast.style.position = 'fixed';
    toast.style.top = '0';
    toast.style.left = '0';
    toast.style.width = '100%';
    toast.style.backgroundColor = '#ffcc00';
    toast.style.color = '#333';
    toast.style.padding = '20px';
    toast.style.textAlign = 'center';
    toast.style.zIndex = '9999';
    toast.style.fontWeight = 'bold';
    toast.style.fontSize = '16px'; // Increase font size for better visibility
    document.body.appendChild(toast);

    // Automatically prompt user to proceed or decline
    setTimeout(() => {
        const decision = confirm('Do you want to proceed and provide the information?');
        if (!decision) {
            // Decline, remove toast
            toast.remove();
        } else {
            // Proceed, change form to red font
            form.style.color = 'red';
            toast.innerText += ' This website may be collecting sensitive data.';
        }
    }, 5000); // Prompt after 5 seconds
}

// Call the function when the page loads
window.addEventListener('load', analyzeForms);
