import { gsap } from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';

import { headerAnimation, navAnimation} from './animate';
import {
  navigatorsEvent,
  creditsEvent,
  mouseEvent,
  otherEvents,
  suggestionEvent,
  fontCheckEvent,
} from './event';

function init() {
  const container = document.querySelector('#container')
  const locomotive = new LocomotiveScroll({
    el: container,
    smooth: true,
  });

  gsap.from('body', { autoAlpha: 0, delay: 0.5, duration: 1 });
  
  fontCheckEvent();
  navigatorsEvent(locomotive);
  creditsEvent(locomotive);
  mouseEvent();
  otherEvents(locomotive);

  const header = headerAnimation();
  const nav = navAnimation();  

  locomotive.stop()
  container.classList.add('h-screen', 'overflow-hidden');
  
  const globalTimeLine = gsap.timeline({
    paused: true,
    onComplete: () => {
      container.classList.remove('h-screen', 'overflow-hidden');
      locomotive.start()
    },
  })
    .from(container, { autoAlpha: 0 })
    .add(header)
    .add(nav);
  
  // alert control
  if (window.outerWidth < 1280 && !localStorage.getItem('attar_portfolio_hasOpened')) {
    suggestionEvent(globalTimeLine);
  } else {
    document.querySelector('.alert-container').classList.add('hidden');
    globalTimeLine.play();
  }
}

window.addEventListener('DOMContentLoaded', init);
