async function commentFormHanlder(event) {
    event.preventDefault();
    const comment_text = document.querySelector('#comment-text').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    } else {
        alert('Missing comment!');
    }
}

document.querySelector('#add-comment').addEventListener('submit', commentFormHanlder);