import { gsap } from 'gsap';

const CONTAINER = document.querySelector('#container');

export function navigatorsEvent(locomotive) {
  const navigators = document.querySelectorAll('#section-navigator');
  const sections = document.querySelectorAll('#section');

  navigators.forEach((el, i) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el.querySelector('div'), { width: '100%', ease: 'Power4.easeInOut', duration: 0.3 });
    });

    el.addEventListener('mouseleave', () => {
      gsap.timeline()
        .call(() => el.classList.add('items-end'))
        .to(el.querySelector('div'), { width: '0%', ease: 'Power4.easeInOut', duration: 0.3 })
        .call(() => el.classList.remove('items-end'));
    });
    
    el.addEventListener('click', () => {
      if (i === 0) return locomotive.scrollTo('top');
      if (i === navigators.length - 1) return locomotive.scrollTo('bottom');

      locomotive.scrollTo(sections[i], { offset: -300 });
    }) 
  });
}

export function otherEvents(locomotive) {
  document
    .querySelector('#back-to-top')
    .addEventListener('click', () => locomotive.scrollTo('top'));
}

export function creditsEvent(locomotive) {
  document
    .querySelector('#credits-open')
    .addEventListener('click', () => {
      locomotive.stop();

      gsap.to('#credits', { right: 0, ease: 'Power3.easeOut' });
      gsap.to(CONTAINER, { filter: 'blur(4px)', ease: 'Power3.easeOut' });
    });
    
    document
    .querySelector('#credits-close')
    .addEventListener('click', () => {
      locomotive.start();

      gsap.to(CONTAINER, { filter: 'blur(0)', ease: 'Power3.easeIn' });
      gsap.matchMedia()
        .add('(min-width: 0px)', () => {
          gsap.to('#credits', { right: '-100%', ease: 'Power3.easeIn' });
        })
        .add('(min-width: 768px) and (max-width: 1279px)', () => {
          gsap.to('#credits', { right: '-75%', ease: 'Power3.easeIn' });
        })
        .add('(min-width: 1280px)', () => {
          gsap.to('#credits', { right: '-33.333333%', ease: 'Power3.easeIn' });
        })
    });
}

export function mouseEvent() {
  const cursor = document.querySelector('#cursor');
  const cursorCircle = document.querySelector('#cursor-circle');

  const hover = document.querySelectorAll('.custom-hover');

  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
  
    cursor.style.transform = `translate(calc(${clientX}px - 50%), calc(${clientY}px - 50%))`;

    gsap.to(cursorCircle, {
      x: clientX - 24,
      y: clientY - 24,
      ease: 'elastic.out(1, 0.7)',
      duration: 1.5,
    })
  });

  hover.forEach((e) => {
    e.addEventListener('mouseenter', () => {
      gsap.timeline()
        .to(cursor, { width: 0, autoAlpha: 0, duration: 0.3 })
        .to(cursorCircle, { scale: 1.5, duration: 0.3 }, '<0.1')
    });
    
    e.addEventListener('mouseleave', () => {
      gsap.timeline()
        .to(cursor, { width: 28, autoAlpha: 1, duration: 0.3 })
        .to(cursorCircle, { scale: 1, duration: 0.3 }, '<0.1')
    });
  })
}

export function suggestionEvent(globalTimeLine) {
  function handler ({ target }) {
    if (target.classList.contains('alert-dsa-button')) {
      localStorage.setItem('attar_portfolio_hasOpened', 'true');
    }

    gsap.timeline()
      .to('.alert', {
        scaleX: 0,
        opacity: 0,
        ease: 'Power4.easeInOut',
        duration: 0.5,
      })
      .call(() => {
        document.querySelector('.alert-container').classList.add('hidden');
        globalTimeLine.play();
      });
  }
  
  document
    .querySelector('.alert-ok-button')
    .addEventListener('click', handler)

  document
    .querySelector('.alert-dsa-button')
    .addEventListener('click', handler)
}

export function fontCheckEvent() {
  Promise.all([
    new FontFace('Tusker Grotesk Medium', 'url(/font/TuskerGrotesk-3500Medium.ttf)'),
    new FontFace('Tusker Grotesk Semibold', 'url(/font/TuskerGrotesk-3600Semibold.ttf)'),
    new FontFace('Tusker Grotesk Bold', 'url(/font/TuskerGrotesk-3700Bold.ttf)'),
  ]).then((e) => {
    if (!localStorage.getItem('first-download-font')) {
      localStorage.setItem('first-download-font', 'false');
      location.reload();
    }

    e.forEach((font) => document.fonts.add(font));
  });
}
