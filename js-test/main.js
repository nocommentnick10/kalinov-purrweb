// Находим эл-ты на странице

const btnPrev = document.querySelector('#btnPrev'),
      btnNext = document.querySelector('#btnNext'),
      slider = document.querySelector('.slides'),
      slideContainer = document.querySelector('.container'),
      nav = document.querySelectorAll('.nav__item'),
      interval = 50

let slides = document.getElementsByClassName('slide'),
    index = 1

// Копируем первый и последний эл-ты

const firstClone = slides[0].cloneNode(true)

const lastClone = slides[slides.length - 1].cloneNode(true)

firstClone.id = 'first-clone'
lastClone.id = 'last-clone'

// Помещаем их в разметку

slider.append(firstClone)
slider.prepend(lastClone)

const sliderWidth = slides[index].clientWidth

// Начинаем со слайда с номером index

slider.style.transform = `translateX(${-sliderWidth * index}px)`

// Переход на следующий слайд

function nextSlide(){
    if(slides[index].id === firstClone.id){
        slider.style.transition = 'none'
        index = 1
        slider.style.transform = `translateX(${-sliderWidth * index}px)`
    }
    animateNext(index)
    activeSlide(index)
    index++
}

// Анимация перехода на следующий слайд

function animateNext(index){
    let start = sliderWidth * index;
    let curr = start
    let slidesId = setInterval(function(){
        curr += 10
        slider.style.transform = `translateX(${-curr}px)`
        // console.log(curr)
        if(curr - start === sliderWidth){
            clearInterval(slidesId)
        }
    }, 10)
}

// Переход на предыдущий слайд

function prevSlide(){
    if(slides[index].id === lastClone.id){
        slider.style.transition = 'none'
        index = slides.length - 2
        slider.style.transform = `translateX(${-sliderWidth * index}px)`
    }
    animatePrev(index)
    index--
    activeSlide(index-1)
}

// Анимация перехода на предыдущий слайд

function animatePrev(index){
    let start = sliderWidth * index;
    let curr = start
    let slidesId = setInterval(function(){
        curr -= 10
        slider.style.transform = `translateX(${-curr}px)`
        // console.log(curr)
        if(start - curr === sliderWidth){
            clearInterval(slidesId)
        }
    }, 10)
}

// Анимация перехода по навигации

function animate(slideIndex){
    if(slides[index].id === firstClone.id){
        slider.style.transition = 'none'
        index = 1
        slider.style.transform = `translateX(${-sliderWidth * index}px)`
    }
    if(slides[index].id === lastClone.id){
        slider.style.transition = 'none'
        index = slides.length - 2
        slider.style.transform = `translateX(${-sliderWidth * index}px)`
    }

    let start = sliderWidth * index;
    let curr = start 
    // console.log(slideIndex, index)
    if(slideIndex > index){
        let slidesId = setInterval(function(){
            curr += 10
            slider.style.transform = `translateX(${-curr}px)`
            if(curr - start === ((sliderWidth*slideIndex) - (sliderWidth*index))){
                clearInterval(slidesId)
                index = slideIndex
            }
        }, 10)
    } else if(slideIndex < index){
        let slidesId = setInterval(function(){
            curr -= 10
            slider.style.transform = `translateX(${-curr}px)`
            if(start - curr === ((sliderWidth*index) - (sliderWidth*slideIndex))){
                clearInterval(slidesId)
                index = slideIndex
            }
        }, 10)
    }
}

// Функция выделения активного слайда в навигации

function activeSlide(index){
    nav.forEach(item => {
        item.classList.remove('nav__item--active')
    })

    let indexActive = index

    if(index === 4){
        indexActive -= 4
    }

    if(index === -1){
        indexActive += 4
    }

    // console.log(index)

    nav[indexActive].classList.add('nav__item--active')
}

// Прослушка событий

btnNext.addEventListener('click', nextSlide)

btnPrev.addEventListener('click', prevSlide)

nav.forEach((item, slideIndex) => {
    item.addEventListener('click', () => {
        activeSlide(slideIndex)
        animate(slideIndex+1)
    })
})