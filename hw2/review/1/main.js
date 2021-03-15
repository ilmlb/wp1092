let images=[
    "https://i.imgur.com/NJojxzu.jpg",
    "https://www.wallpapermaiden.com/wallpaper/39650/download/2048x1536/anime-school-girls-friends-library-whispering-blonde-cuteness-sakura-blossom-anime.jpeg",
    "https://a-static.besthdwallpaper.com/yuudachi-fond-d-ecran-3868_L.jpg",
    "https://i.redd.it/knvyccwugnu21.jpg",
    "https://64.media.tumblr.com/0b3a9b8b38fd5ad4de518faecd2bc49f/tumblr_pf5cjddPkU1qzmx5io1_1280.jpg",
    "https://pbs.twimg.com/media/DuR-hYPU0AEc9Ps?format=jpg&name=large"
],n=0;
let display=document.getElementById("display");
let source=document.getElementsByClassName("imageviewer__displaysource-wrapper");
const previous=document.getElementById("previous");
const last=document.getElementById("next");
let tree;
let preonclick = ()=>{
    n--;
    if(n===0){
        previous.className="disabled";
        previous.onclick=()=>{};
    }
    if(n!=images.length-1){
        last.className="image-viewer__button";
        last.onclick=lastonclick;
    }
    tree[0].textContent=images[n];
    display.setAttribute("src","./images/loading.gif");
    let newImg = new Image();
    newImg.src = images[n];
    newImg.onload = () => {
        display.setAttribute("src",newImg.src);
    }
}
let lastonclick=()=>{
    n++;
    if(n===images.length-1){
        last.className="disabled";
        last.onclick=()=>{};
    }
    if(n!=0){
        previous.className="image-viewer__button";
        previous.onclick=preonclick;
    }
    tree[0].textContent=images[n];
    display.setAttribute("src","./images/loading.gif");
    let newImg = new Image();
    newImg.src = images[n];
    newImg.onload = () => {
        display.setAttribute("src",newImg.src);
    }  
        
}
previous.onclick=preonclick;
last.onclick=lastonclick;
(
    ()=>{
        if(n===0){
            previous.className="disabled";
            previous.onclick=()=>{};
        }
        if(n===images.length-1){
            last.className="disabled";
            last.onclick=()=>{};
        }
        display.setAttribute("src","./images/loading.gif");
        
        let newImg = new Image();
        newImg.src = images[n];
        newImg.onload = () => {
            display.setAttribute("src",newImg.src);
        }

        tree=source[0].getElementsByTagName("span");
        tree=tree[0].getElementsByTagName("a");
        tree[0].textContent=images[0];
    }
)();