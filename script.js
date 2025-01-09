'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////
const btnScrollto = document.querySelector('.btn--scroll-to');

const header = document.querySelector('.header');

const section1 = document.querySelector('#section--1');

const navLinks = document.querySelectorAll('.nav__link');

const navLink = document.querySelector('.nav__links');

const nav = document.querySelector('.nav');

const scrollToSectionOne = function (e) {
  e.preventDefault();

  section1.scrollIntoView({
    behavior: 'smooth',
  });
};

//// nav functions////////////

const stickyNavigation = function (entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else nav.classList.remove('sticky');
  });
};

const navHeight = nav.getBoundingClientRect().height;

const observer = new IntersectionObserver(stickyNavigation, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // Trigger callback when 0% of the element is in view
});

observer.observe(header);

const navHoverEffects = function (event) {
  event.preventDefault();

  if (!event.target.classList.contains('nav__link')) return;

  navLinks.forEach(nav => {
    if (nav !== event.target) {
      nav.style.opacity = 0.3;
    } else nav.style.opacity = 1;
  });
};

const navHoverOutEffects = function (e) {
  e.preventDefault();

  navLinks.forEach(nav => (nav.style.opacity = 1));
};

const scrollIntoSection = function (e) {
  e.preventDefault();

  if (!e.target.classList.contains('nav__link')) return;

  const hrefValue = e.target.getAttribute('href');

  if (hrefValue === '#') return;

  const ele = document.querySelector(hrefValue);

  // ele.classList.add('section--hidden');

  ele.scrollIntoView({ behavior: 'smooth' });
};

navLink.addEventListener('mouseout', navHoverOutEffects);
navLink.addEventListener('mouseover', navHoverEffects);
navLink.addEventListener('click', scrollIntoSection);

// window.addEventListener('scroll', stickyNavigation);
///////////////////////////////////////////////////////////

btnScrollto.addEventListener('click', scrollToSectionOne);

/////////////TAB OPERATIONS/////////////////

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const tabsClicked = function (e) {
  const clickTarget = e.target.closest('.operations__tab');

  if (!clickTarget) return;

  tabs.forEach((tab, ind) => {
    if (clickTarget !== tab) {
      tab.classList.remove('operations__tab--active');

      tabsContent[ind].classList.remove('operations__content--active');
    }
  });

  console.log(clickTarget.dataset.tab);

  const tabIndex = clickTarget.dataset.tab;

  clickTarget.classList.add('operations__tab--active');

  tabsContent[tabIndex - 1].classList.add('operations__content--active');
};

tabsContainer.addEventListener('click', tabsClicked);

//////////////////////////////////////////////////////////

////////////REVEALING SECTIONS ON SCROLL ////////////
const sections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');

    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
sections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});
////////////////////////////////////////////////////////

///////REVEALING IMGS ON SCROLL //////////////////
const imgs = document.querySelectorAll('.features__img');

const imgReveal = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const target = entry.target;

    target.src = target.dataset.src;

    target.classList.remove('lazy-img');

    observer.unobserve(target);
  });
};

const imgObserver = new IntersectionObserver(imgReveal, {
  root: null,
  threshold: 0.8,
});

imgs.forEach(img => imgObserver.observe(img));

////////////////////////////////////////////////

///////////SLIDER///////////////////////////////

const slider = document.querySelector('.slider');

const slides = document.querySelectorAll('.slide');

const nextSliderBtn = document.querySelector('.slider__btn--right');

const prevSliderBtn = document.querySelector('.slider__btn--left');

let currentSlide = 0;

const startSlide = function (curSlide) {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${(index - curSlide) * 100}%)`;
  });
};

startSlide(0);

const nextSlide = function () {
  if (currentSlide >= slides.length - 1) {
    currentSlide = 0;
  } else currentSlide++;

  startSlide(currentSlide);
};

const prevSlide = function () {
  if (currentSlide <= 0) {
    currentSlide = slides.length - 1;
  } else currentSlide--;

  startSlide(currentSlide);
};

const animateSlide = setInterval(nextSlide, 3000);

nextSliderBtn.addEventListener('click', nextSlide);
prevSliderBtn.addEventListener('click', prevSlide);

///////////////////////////////////////////////
