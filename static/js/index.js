window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/images/examples";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    // $(".navbar-burger").click(function() {
    //   // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    //   $(".navbar-burger").toggleClass("is-active");
    //   $(".navbar-menu").toggleClass("is-active");

    // });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    // preloadInterpolationImages();

    // $('#interpolation-slider').on('input', function(event) {
    //   setInterpolationImage(this.value);
    // });
    // setInterpolationImage(0);
    // $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})


// Custom JS for explanation section
// function displayImage(imageSrc) {
//     const mainImage = document.getElementById('mainImage');
//     mainImage.src = "static/images/examples/" + imageSrc;
//     const selDiv = document.getElementById(imageSrc.replace(".png", "_img")).parentNode;
//     // console.log(imageSrc.replace(".png", "_img"));
//     selDiv.classList.add("selected");
// }

document.addEventListener('DOMContentLoaded', function () {
  const thumbnails = [
      'static/images/examples/case1/img.png',
      'static/images/examples/case2/img.png',
  ];

  const img_select = document.querySelector('.img_select');
  const mainImage = document.getElementById('mainImage');

  thumbnails.forEach(src => {
      const img_box = document.createElement('div');
      const img = document.createElement('img');
      img_box.appendChild(img);
      img_box.classList.add("img_grid_item");
      img.src = src;
      img_box.onclick = function () {
        mainImage.src = src; // Update the main image
        document.querySelectorAll('.img_select div').forEach(img => img.classList.remove('selected'));
        img_box.classList.add('selected'); // Highlight the selected thumbnail

        // Show prototypes
        const prototype_text = document.querySelector('div.text');
        if (prototype_text.classList.contains("hidden")){
          prototype_text.classList.remove("hidden");
        }
        for (var i = 1; i <= 4; i++){
          const prototype_div = document.getElementById('P' + i);
          const prototype_img = document.createElement('img');
          const prototype_text = document.createElement("div");
          prototype_div.innerHTML = "";
          prototype_img.src = src.replace("img.png", "p" + i + ".png");
          prototype_text.innerText = "Layer " + i;
          prototype_div.appendChild(prototype_img);
          prototype_div.appendChild(prototype_text);
        }
        // Show prototype mask
        for (var i = 1; i <= 4; i++){
          const mask_img = document.getElementById('Mask' + i);
          mask_img.src = src.replace("img.png", "mask_p" + i + ".png");
          mask_img.classList.add('selected');
        }
      };
      img_select.appendChild(img_box);
  });

  
  const prototype_items = document.querySelectorAll('.prototype_grid_item');
  prototype_items.forEach(prototype_item => {
    prototype_item.addEventListener('mouseover', function() {
      mainImage.style.opacity = 0.4;
      const mask_img = document.getElementById(prototype_item.id.replace("P", "Mask"));
      mask_img.style.opacity = 0.6;
    });

    prototype_item.addEventListener('mouseout', function() {
      mainImage.style.opacity = 1.0;
      const mask_img = document.getElementById(prototype_item.id.replace("P", "Mask"));
      mask_img.style.opacity = 0.0;
    });
});

  // Initialize the display with the first image
  if (thumbnails.length > 0) {
    mainImage.src = thumbnails[0];
    first_img = img_select.getElementsByTagName('div')[1];
    console.log(first_img);
    first_img.classList.add('selected');
    // Show prototypes
    const prototype_text = document.querySelector('div.text');
    if (prototype_text.classList.contains("hidden")){
      prototype_text.classList.remove("hidden");
    }
    for (var i = 1; i <= 4; i++){
      const prototype_div = document.getElementById('P' + i);
      const prototype_img = document.createElement('img');
      const prototype_text = document.createElement("div");
      prototype_div.innerHTML = "";
      prototype_img.src = thumbnails[0].replace("img.png", "p" + i + ".png");
      prototype_text.innerText = "Layer " + i;
      prototype_div.appendChild(prototype_img);
      prototype_div.appendChild(prototype_text);
    }
    // Show prototype mask
    for (var i = 1; i <= 4; i++){
      const mask_img = document.getElementById('Mask' + i);
      mask_img.src = thumbnails[0].replace("img.png", "mask_p" + i + ".png");
      mask_img.classList.add('selected');
    }
  }
});