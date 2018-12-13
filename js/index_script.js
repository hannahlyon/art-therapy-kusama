var dotColors = ['#2355C6','#ED7C5C','#F4BA41','#469C48','#E8338F','#E83F47'];

var bgImages = [];
for (var i = 1; i < 5; i++) {
  bgImages.push('images/obliteration'+i+'.jpg')
};

// iterate through background images and have dots appear
var c = 0;
var iteration = -1;
var dots = document.getElementsByClassName('dot');
var changeBG = setInterval(function() {
    document.getElementById('bg').src = bgImages[c];
    c = (c + 1) % bgImages.length;

    if (iteration == 0) {
      dots[iteration].style.visibility = 'visible';
    } else if (iteration == 1) {
      dots[iteration].style.visibility = 'visible';
    } else if (iteration == 2) {
      dots[iteration].style.visibility = 'visible';
    } else if (iteration == 3) {
      document.getElementById('next').style.visibility = 'visible';
    }

    iteration += 1

}, 2500);
