console.log('Loaded!');
var element = document.getElementById('main-text');
element.innerHTML = "New VALUE !!!!!" ;

//move the image
var img = document.getElementById('monster');
var marginleft =0;
function moveRight() {
  marginleft = marginleft +10;
  img.style.marginLeft = marginleft +'px';
}
img.onclick = function() {
    img.style.marginLeft = '100px';
};