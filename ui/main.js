console.log('Loaded!');
var element = document.getElementById('main-text');
element.innerHTML = "New VALUE !!!!!" ;

//move the image
var img = document.getElementById('monster');
img.onclick = function() {
    img.style.marginLeft = '100px';
};