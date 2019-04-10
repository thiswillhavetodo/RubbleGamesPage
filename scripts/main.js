var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n, game) {
  showDivs(slideIndex = n, game);
}

function showDivs(n, game) {
  var i;
  if (game=='zca') {
    var x = document.getElementsByClassName("ZCAslides");
  }
  else if (game=='sek'){
    x = document.getElementsByClassName("SEKslides");
  }
  else if (game=='pop'){
    x = document.getElementsByClassName("POPslides");
  }
  var dots = document.getElementsByClassName("preview");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" -opacity-off", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " -opacity-off";
}

function mailListShow() {
  var mailClass = document.getElementById("mc_embed_signup");
  if (mailClass.style.display=='none' || mailClass.style.display=="") {
    mailClass.style.display = 'block'; 
  }
  else {
    mailClass.style.display = 'none'; 
  }
}