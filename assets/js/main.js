/*====================================================
  TABLE OF CONTENT
  1. Function Declearetion
  2. Initialization
====================================================*/
/*===========================
 1. Function Declearetion
 ==========================*/
var themeApp = {

    particles: function() {

        if( ($("#particles-js").length) > 0 ){

        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
 }
},


    video_responsive: function() {

        $('.video-post-format, .blog-details').fitVids();
    },


 
 
    backtotop: function() {
        $.scrollUp({
            scrollName: 'scrollUp', // Element ID
            topDistance: '300', // Distance from top before showing element (px)
            topSpeed: 300, // Speed back to top (ms)
            animation: 'fade', // Fade, slide, none
            animationInSpeed: 200, // Animation in speed (ms)
            animationOutSpeed: 200, // Animation out speed (ms)
            scrollText: '<i class="fa fa-angle-up"></i>', // Text for element
            activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        });
    },

 
	disqus_comments: function() {

            var d = document, s = d.createElement('script');

            s.src = 'https://themeix-com-3.disqus.com/embed.js';

            s.setAttribute('data-timestamp', +new Date());

            if( $("#disqus_thread").length > 0 ) {

                (d.head || d.body).appendChild(s);
            }
      
    },

	
     sticky: function() {
      var windows = $(window);
      windows.on('scroll',function(){
      var scroll = windows.scrollTop();
      if(scroll < 110){   

         $("#stickey-menu").removeClass("stickey");
        
    }else{

        $("#stickey-menu").addClass("stickey");
    }
    
    
       });
	},

	
	
    init: function() {
		themeApp.sticky();
        themeApp.particles();
        themeApp.backtotop();
        themeApp.video_responsive();
        themeApp.disqus_comments()
    }

}

 
/*===========================
2. Initialization
==========================*/
$(document).ready(function() {
    themeApp.init();
});


