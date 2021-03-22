// TODO:
var comment = document.getElementById("comment-input");
var commentButton = document.getElementById("comment-button");
var cancelButton = document.getElementById("cancel-button");
var count = 1;
commentButton.disabled = true;
comment.addEventListener ('keyup', function(e) {
    // console.log(e.target.value.trim().length);
    if(e.target.value.trim() === "") {
        commentButton.style.backgroundColor = "#cccccc";
        commentButton.disabled = true;
    } else {
        commentButton.style.backgroundColor = "#065fd4";
        commentButton.disabled = false;
    }
});

comment.addEventListener ("focus", function() {
    commentButton.style.visibility = "visible";
    cancelButton.style.visibility = "visible";
});

commentButton.addEventListener ("click", function() {
    console.log(commentButton.disabled);
    addComment(comment.value.trim());
    comment.value = '';
    commentButton.style.backgroundColor = "#cccccc";
    commentButton.disabled = true;
});

cancelButton.addEventListener ("click", function() {
    comment.value = "";
    commentButton.style.visibility = "hidden";
    cancelButton.style.visibility = "hidden";
});

function addComment(c) {
    // if (commentButton.disabled == "true") {return;}
    let com = document.getElementsByClassName("comment")[0].cloneNode(true);
    com.getElementsByClassName("comment-right")[0].getElementsByClassName("comment-text")[0].innerHTML = c;
    document.getElementById("comment-group").appendChild(com);
    document.getElementById("count").innerHTML = ++count;
}

