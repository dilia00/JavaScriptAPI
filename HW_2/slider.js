const sliderImages = document.querySelectorAll('.slider__img');
const nextButtonEl = document.querySelector('.slider__next');
const prevButtonEl = document.querySelector('.slider__prev');
const paginationEl = document.querySelector('.pagination');
const paginationCircles = document.querySelectorAll('.pagination__circle');
let currentIndex = 0;

updateClass(currentIndex, sliderImages, 'hidden');
updateClass(currentIndex, paginationCircles, 'inactive');

setInterval(() => {
    updateClass(currentIndex, sliderImages, 'hidden');
    updateClass(currentIndex, paginationCircles, 'inactive');
    currentIndex = (currentIndex + 1) % sliderImages.length;
}, 2000);

nextButtonEl.addEventListener('click', showNextSlide);
prevButtonEl.addEventListener('click', showPreviousSlide);
paginationEl.addEventListener('click', ({ target }) => {
    if (target.classList.contains('pagination__circle')) {
        currentIndex = Number(target.getAttribute('data-index'));
        updateClass(currentIndex, sliderImages, 'hidden');
        updateClass(currentIndex, paginationCircles, 'inactive');
    }
});

function updateClass(currentIndex, elements, className) {
    // elements.forEach((el, index) => {
    //     if (index !== currentIndex) {
    //         el.classList.add(className);
    //     } else {
    //         el.classList.remove(className);
    //     }
    // });
    elements.forEach((el, index) => el.classList.toggle(className, index !== currentIndex))
}

function showPreviousSlide() {
    currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
    updateClass(currentIndex, sliderImages, 'hidden');
    updateClass(currentIndex, paginationCircles, 'inactive');
}

function showNextSlide() {
    currentIndex = (currentIndex + 1) % sliderImages.length;
    updateClass(currentIndex, sliderImages, 'hidden');
    updateClass(currentIndex, paginationCircles, 'inactive');
}