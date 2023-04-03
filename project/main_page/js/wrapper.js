// params
let isDragStart = false;
let prevPageX;
let prevScrollLeft;
const carousel = document.querySelector('.carousel');
const arrows = document.querySelectorAll('.wrapper>img');
const firstImg = document.querySelector('.carousel > img');
let diffPosition;


//Functions
const autoSlide = () => {
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;
    diffPosition = Math.abs(diffPosition);
    let firstImgWidth = firstImg.clientWidth + 40; // получаем ширину первой картинки и добавляем отступ 
    let valueDiff = firstImgWidth - diffPosition;

    if(carousel.scrollLeft > prevScrollLeft) {
        return carousel.scrollLeft += diffPosition > firstImgWidth / 10 ? valueDiff : -diffPosition
    } return carousel.scrollLeft -= diffPosition > firstImgWidth / 10 ? valueDiff : -diffPosition
}

arrows.forEach(arrow => {
    arrow.addEventListener('click', e => {
        let firstImgWisth = firstImg.clientWidth + 14
        carousel.scrollLeft += arrow.id == 'left' ? -firstImgWisth : firstImgWisth;
        carousel.scroll.style = 'scroll-behavior: smooth';
    })
})

const dragging = (event) => {
    // Скроллим картинки
    if(!isDragStart) {
        return;
    }
    carousel.scrollLeft = event.pageX;
    event.preventDefault();
    diffPosition = (event.pageX || event.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = (prevScrollLeft - diffPosition);
    carousel.classList.add("dragging");
}

const dragStart = (event) => {
    //Изменяем на уровне глобальных переменных
    isDragStart = true;
    prevPageX = event.pageX || event.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragStop = (event) => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    autoSlide();
}

//Events
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

//drop-menu

