const form = document.querySelector('#form');

const inputs = document.querySelectorAll('.form-inp');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    inputs.forEach(item => {
            item.classList.remove('err')
    })

    inputs.forEach(item => {
        if(!item.value){
            item.classList.add('err')
        }
    })


});