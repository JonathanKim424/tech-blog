const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];
const modal = document.getElementById('deleteModal');
const openModal = document.getElementById('openModal');
const close = document.getElementById('close');
const deleteBtn = document.getElementById('delete');

openModal.onclick = function() {
    modal.style.display = 'block';
};
close.onclick = function() {
    modal.style.display = 'none';
};
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

async function actionHandler(event) {
    event.preventDefault();
    if (event.target.id === 'update') {
        const title = document.querySelector('#post-title').value.trim();
        const content = document.querySelector('#post-content').value.trim();
        if (title && content && id) {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'put',
                body: JSON.stringify({
                    title,
                    content
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                alert('Post updated successfully!');
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText);
            }
        } else {
            alert('Unable to update post!');
        }
    }
}

async function deleteFormHandler(id) {
}


deleteBtn.onclick = async function() {
    if (id) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'delete'
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } else {
        alert('Unable to delete post!');
    }
}

document.querySelector('.post-btn').addEventListener('click', actionHandler);