const commentFormHandler = async (event) => {
    event.preventDefault();

    const post_id = parseInt(window.location.pathname.split('/').pop());
    const content = document.querySelector('#contentNew').value.trim();

    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ commentText: content, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            console.log('Status:', response.status);
            console.log('Text:', await response.text());
            alert(response.statusText);
        }
    }
};

document.querySelector('#formCommentNew').addEventListener('submit', commentFormHandler);