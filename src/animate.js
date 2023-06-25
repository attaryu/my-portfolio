import { gsap } from 'gsap';

export function headerAnimation() {
  const timeLine = gsap.timeline();

  timeLine
    .to('.header', { yPercent: -5, duration: 0 })
    .from('.cover-title-line-1', { y: 50, scaleY: 0, stagger: 0.06 });

  gsap.matchMedia()
  .add('(max-width: 767px)', () => {
      timeLine
        .from('.cover-title-line-2', { y: 30, scaleY: 0, stagger: 0.06 }, '<0.4')
        .from('.cover-title-line-3', { y: 30, scaleY: 0, stagger: 0.06 }, '<0.4');
    })
    .add('(min-width: 768px) and (max-width: 1279px)', () => {
      timeLine
        .from('.cover-title-line-2', { y: 50, scaleY: 0, stagger: 0.06 }, '<0.4')
        .from('.cover-title-line-3', { y: 50, scaleY: 0, stagger: 0.06 }, '<0.4');
    })
    .add('(min-width: 1280px)', () => {
      timeLine
        .from('.cover-title-line-2', { y: 80, scaleY: 0, stagger: 0.06 }, '<0.4')
        .from('.cover-title-line-3', { y: 110, scaleY: 0, stagger: 0.06 }, '<0.4');
    });

  timeLine
      .from('.line-ima', { width: 0, duration: 1, ease: 'Power4.easeOut' }, '<-0.4')
      .from('.ima', { scaleX: 0, xPercent: -50 }, '<0.3');

  timeLine
    .from('.cover-img', { xPercent: -100, ease: 'Power3.easeOut', duration: 2 })
    .from('.cover-year', { scaleY: 0, yPercent: -50, stagger: { amount: 0.3 } }, '<1')
    .from('.cover-theme', { scaleY: 0, yPercent: -50, stagger: { amount: 0.3 } }, '<0.4');

  timeLine
    .from('.cover-desc', { scaleY: 0, yPercent: 50, stagger: { amount: 0.5 }, ease: 'Power2.easeOut' })
    .to('.header', { yPercent: 0 });

  return timeLine;
}

export function navAnimation() {
  const timeLine = gsap.timeline();

  timeLine
    .from('.nav', { scaleX: 0, duration: 1.2, ease: 'Power4.easeOut' })
    .from('.nav-title', { yPercent: 120 }, '>-0.3')
    .from('.nav-link', { yPercent: 150, stagger: 0.1 }, '<0.1');
  
  return timeLine;
}
