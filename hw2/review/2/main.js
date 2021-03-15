var links = ["https://image-cdn.hypb.st/https%3A%2F%2Fhk.hypebeast.com%2Ffiles%2F2020%2F12%2Fkobe-bryant-considered-leaving-nike-mamba-sneaker-brand-info-1.jpg?q=90&w=1400&cbr=1&fit=max", "https://cdn0-manfashion.techbang.com/system/images/109898/original/f2858292d139e5680c53ce6b19df63aa.jpg?1585715740","https://img.sportsv.net/img/article/cover/5/71315/fit-CfU25KjfVt-945x495.jpg", "https://cdntwrunning.biji.co/800_8827cf3ece3d75065afb745c12fb7b29.jpg", "https://imgcdn.cna.com.tw/www/webphotos/WebCover/800/20200405/960x720_080720785013.jpg", "https://sportshub.cbsistatic.com/i/r/2020/05/04/4dba5978-85c1-4c46-930a-1c696a28d5c7/thumbnail/1200x675/793007e9cb4a70ddd90028e585b99f3f/kobe-bryant-michael-jordan.jpg"]

function nextimg(nextbtn) {
	var target = document.getElementById("display");
	var prebtn = document.getElementById("previous");
	var link = document.getElementById("link");
	var page = document.getElementById("page");
	var i = 0;
	while (links[i] != target.src) {
		i++;
	}
	//disable
	if (i != (links.length-1)) {
		nextbtn.addEventListener("click", function() {
				target.src = links[i+1];
				link.href=links[i+1];
				link.innerHTML=links[i+1];
				page.innerHTML= "page : "+ (i+2) + " / 6";
			}
		);
	} else {
		nextbtn.classList.add("disabled");
	}
	//recover
	if (i == 0) {
		nextbtn.addEventListener("click", function(){
				prebtn.classList.remove("disabled");
			}
		);
	}

}

function preimg(prebtn) {
	var target = document.getElementById("display");
	var nextbtn = document.getElementById("next");
	var link = document.getElementById("link");
	var i = 0;
	while (links[i] != target.src) {
		i++;
	}
	//disable
	if (i != 0) {
		prebtn.addEventListener("click", function() {
				target.src = links[i-1];
				link.href=links[i-1];
				link.innerHTML=links[i-1];
				page.innerHTML= "page : "+ i + " / 6";
			}
		);
	} else {
		prebtn.classList.add("disabled");
	}
	//recover
	if (i == (links.length-1)) {
		prebtn.addEventListener("click", function() {
				nextbtn.classList.remove("disabled");
			}
		)
	}
}


function directimg() {
	var val = document.getElementById("input").value - 1;
	if (val >= 0 && val <= 5) {
		var target = document.getElementById("display");
		var link = document.getElementById("link");
		var nextbtn = document.getElementById("next");
		var prebtn = document.getElementById("previous");
		var i = 0;
		while (links[i] != target.src) {
			i++;
		}
		if (i == (links.length-1) && val != (links.length-1)) {
			nextbtn.classList.remove("disabled");
		} else if (i == 0 && val != 0) {
			prebtn.classList.remove("disabled");
		}
		target.src = links[val];
		link.href=links[val];
		link.innerHTML=links[val];
		page.innerHTML= "page : "+ (val+1) + " / 6";
	} else {
		alert("Please enter a number between 1 and 6!");
	}
}

var input = document.getElementById("input");
input.addEventListener("keydown", function(event) {
	console.log(event.keyCode);
	if (event.keyCode === 13) {
		event.preventDefault();
		directimg();
	}
	else if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 8) {
		event.preventDefault();
		alert("Please enter a number between 1 and 6!");
	}
});



// input.addEventListener("keyup", function(event) {
// 	if (event.keyCode === 13) {
// 		event.preventDefault();
// 		directimg();
// 	}
// });