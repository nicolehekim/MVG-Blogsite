const commentFormHandler = async (event) => {
    event.preventDefault();

    const post_id = parseInt(window.location.pathname.split('/').pop());
    const content = document.querySelector('#commentNew').value.trim();

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

const formCommentNew = document.querySelector('.formCommentNew');

if (formCommentNew) {
    formCommentNew.addEventListener('submit', commentFormHandler);
}