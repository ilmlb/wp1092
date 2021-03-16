// TODO:
var comment = document.getElementById("comment-input");
var commentButton = document.getElementById("comment-button");
var cancelButton = document.getElementById("cancel-button");
comment.addEventListener ('keyup', function(e) {
    if(e.target.value === "") {
        commentButton.style.backgroundColor = "#cccccc";
    } else {
        commentButton.style.backgroundColor = "#065fd4";
    }
});

comment.addEventListener ("focus", function() {
    commentButton.style.visibility = "visible";
    cancelButton.style.visibility = "visible";
});

commentButton.addEventListener ("click", function() {
    comment.value = "";
});

cancelButton.addEventListener ("click", function() {
    comment.value = "";
    commentButton.style.visibility = "hidden";
    cancelButton.style.visibility = "hidden";
});