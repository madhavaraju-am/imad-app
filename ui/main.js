console.log('Loaded!');
var element = document.getElementById('main-text');
element.innerHTML = "New VALUE !!!!!" ;

//move the image
var image = document.getElementById('monster');
image.onClick = function() {
    image.style.marginLeft = '100px';
};