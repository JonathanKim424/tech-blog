const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];
const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 2
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
        const comment_text = document.querySelector('#comment-text').value.trim();
        if (comment_text && id) {
            const response = await fetch(`/api/comments/${id}`, {
                method: 'put',
                body: JSON.stringify({
                    comment_text
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                document.location.replace(`/${post_id}`);
            } else {
                alert(response.statusText);
            }
        } else {
            alert('Unable to update comment!');
        }
    }
}

deleteBtn.onclick = async function() {
    if (id) {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'delete'
        });
        if (response.ok) {
            document.location.replace(`/${post_id}`);
        } else {
            alert(response.statusText);
        }
    } else {
        alert('Unable to delete comment!');
    }
}

document.querySelector('.comment-btn').addEventListener('click', actionHandler);