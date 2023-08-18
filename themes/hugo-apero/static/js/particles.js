particlesJS('particles-js', {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#ffffff'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 10,
        size_min: 0.1,
        sync: false
      }
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'top',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'bubble'
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 40,
        size: 4,
        duration: 2,
        opacity: 0.8,
        speed: 3
      }
    }
  },
  retina_detect: true
});
