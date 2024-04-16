const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);


window.onload = function () {
  lenisFn();
  flip();
  const gallery = $('.gallery');
  const previewImg = $('.preview-img img');

  document.addEventListener('mousemove', function (e) {
    const x = e.clientX;
    const y = e.clientY;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const rotateX = 55 + percentY * 2;
    const rotateY = percentX * 2;

    gsap.to(gallery, {
      rotateX: rotateX,
      rotateY: rotateY,
      ease: 'power2',
      duration: 1,
      overwrite: 'auto',
    });
  });

  for (let i = 0; i < 3; i++) {
    data.forEach(d => {
      const item = document.createElement('div');
      item.className = 'item';
      const img = document.createElement('img');
      img.src = d;
      item.appendChild(img);
      gallery.appendChild(item);
    })
  }

  const items = $$('.item');
  const noOfItems = items.length;
  const angleIncrement = 360 / noOfItems;

  items.forEach((item, index) => {
    gsap.set(item, {
      rotationY: 90,
      rotationZ: index + angleIncrement - 90,
      transformOrigin: '50% 400px',
    })

    item.addEventListener('mouseenter', function () {
      const imgInsideItem = item.querySelector('img');
      previewImg.src = imgInsideItem.src;

      gsap.to(item, {
        // x: 20, y: 20, z: 20,
        z: item.clientHeight,
        ease: 'power2',
      })
    })

    item.addEventListener('mouseleave', function () {
      // previewImg.src = './assets/img1.png';
      gsap.to(item, {
        z: 0,
        ease: 'power2',
      })
    })
  });


  ScrollTrigger.create({
    trigger: '.container',
    start: 'top top',
    end: 'bottom -2000%',
    pin: true,
    // markers: true,
    scrub: true,
    onRefresh: setupRotation,
    onUpdate: (self) => {
      const rotationProgress = self.progress * 360 * 1;
      items.forEach((item, index) => {
        const currentAngle = index * angleIncrement - 90 + rotationProgress;
        gsap.to(item, {
          rotationZ: currentAngle,
          duration: 1,
          ease: 'power3',
          overwrite: 'auto',
        });
      });
    }
  });

  function setupRotation() {}
};

function lenisFn() {
  const lenis = new Lenis({
      wheelMultiplier: 3,
      duration: 1.5,
      // easing: (x) => 1 - Math.pow(1 - x, 5),
      easing: (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x),
      infinite: true
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  })
  
  gsap.ticker.lagSmoothing(0)
};

function flip() {
  const container = $('.container');
  
  let count = true;
  $('.preview-img img').addEventListener('click', () => {
    const state = Flip.getState('.preview-img, .preview-img img');
    $('.preview-img').classList.toggle('active');

    Flip.from(state, {
      absolute: true,
      duration: 1,
      ease: 'expo.inOut',
    })
  })
};

console.log("Watch Tutorial:-https://www.youtube.com/watch?v=v0UoqZJRP5M&t=303s");
