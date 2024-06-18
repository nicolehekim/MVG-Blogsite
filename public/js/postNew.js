const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#titleNew').value.trim();
    const content = document.querySelector('#contentNew').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#formPostNew').addEventListener('submit', postFormHandler);