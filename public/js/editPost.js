const postID = window.location.toString().split('/') [
    window.location.toString().split('/').length - 1
];

const updatePostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#titleUpdate').value.trim();
    const content = document.querySelector('#contentUpdate').value.trim();

    if (title && content) {
        const response = await fetch(`/api/posts/${postID}`, {
            method: "PUT",
            body: JSON.stringify({title, content}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Could not update post.');
        }
    }
};

const deletePostFormHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/posts/${postID}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Could not delete post.')
    };
};

const updatePostBtn = document.querySelector('#postUpdate');
const deletePostBtn = document.querySelector('#postDelete');

if (updatePostBtn) {
    updatePostBtn.addEventListener('click', updatePostFormHandler);
}

if (deletePostBtn) {
    deletePostBtn.addEventListener('click', deletePostFormHandler)
}