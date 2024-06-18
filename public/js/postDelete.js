const postDelete = async (post_id) => {
    const response = await fetch(`/api/posts/${post_id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};

const postDeleteHandler = (event) => {
    if (event.target.matches('#postDelete')) {
        const post_id = event.target.getAttribute('')
    }
}