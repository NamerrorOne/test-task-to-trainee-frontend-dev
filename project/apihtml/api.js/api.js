//--------------------------Consts----------------------------//
const input1 = document.querySelector('.input1');
const input2 = document.querySelector('.input2');
const button = document.querySelector('button');
const panel = document.querySelector('panel');
const quiz = document.querySelector('.quiz');
const errorText = `Пожалуйста, введите корректные данные. Мы не смогли выполнить запрос по данным событиям.`;

//-------------------Динамический запрос------------------//
button.addEventListener('click', e=> {
async function fetchPosts() { 
    try { 
    const url = `http://numbersapi.com/${input1.value}/${input2.value}/date`;
    const res = await fetch(url);
    if(!res.ok) {
        throw new Error(`Вы ввелли некорректные данные. ${res.status}`);
    }
    const data = await res.text(); 
    cardToHTML(data);
}
    catch (error) {
        cardToHTML(errorText);
    }  
}
    fetchPosts();
    input1.value = '';
    input2.value = '';
})

function cardToHTML(ex) {
    quiz.insertAdjacentHTML('afterend', ` <div class="quiz__answer">
    <div class="inner__text">${ex}</div>
    <div class="close">&times;</div>
</div> `);
const close = document.querySelector('.close');
const answer = document.querySelector('.quiz__answer');
close.addEventListener('click', event => {
    answer.classList.add('closed');
    })
}

