ready(function(){
  

const filter = document.querySelector('.filters');
const filterToggle = document.querySelector('.filters__trigger')
filterToggle.addEventListener( 'click', function(e){
  filter.classList.toggle('filters--open')
});


let mobMenu = document.querySelector('.main-nav');
mobMenu.onclick = function (){
  let burger =  document.querySelector('.burger');
  mobMenu.classList.toggle('main-nav--open');
  burger.classList.toggle('burger--close')
  

}
let modalWindow = document.querySelector('.card')
modalWindow.addEventListener( 'click' , function(event){
  let modalOpen = document.querySelector('.modal')
 modalOpen.classList.add('modal--open')
})


let modalOpen = document.querySelector('.modal')
let catalog = document.querySelector('.catalog__books-list')

const findBookById = (id) =>  {
  const book = books.find(item => {
    return item.uri === id
  });

  return book;
}



catalog.addEventListener( 'click' , function(e){
  modalOpen.classList.toggle('modal--open');
  let target = e.target;
  const card = target.closest('.card');
  const id = card.dataset.id;
  const book = findBookById(id);

  modalOpen.dataset.title = book.name;

});

let close = document.querySelector('.modal__close')
  close.addEventListener('click', function (e){
  modalOpen.classList.toggle('modal--open')

});


let cardsHTML = '';
console.log(books);


books.forEach(function(item) {
  cardsHTML += ` 
<article class="card" data-id="${item.uri}">
  <a class="card__inner" href="index.html#${item.uri}">
    <img class="card__img" src="books/${item.uri}.jpg" width="148" height="208" alt="Искренний сервис"/>
    <h2 class="card__title">${item.name}</h2>
    <p class="card__price">${item.price} ₽</p>
  </a>
  <button class="btn  btn--sm card__buy">
    <svg class="btn__icon" width="14" height="14">
      <use xlink:href="#plus"></use>
    </svg>
    <span>В корзину</span>
  </button>
</article>`;  
  
})
  
document.querySelector('.catalog__books-list').innerHTML = cardsHTML;


books.forEach(function(arr) {
  console.log(arr);

 });
 




















  





// ВНИМАНИЕ!
  // Нижеследующий код (кастомный селект и выбор диапазона цены) работает
  // корректно и не вызывает ошибок в консоли браузера только на главной.
  // Одна из ваших задач: сделать так, чтобы на странице корзины в консоли
  // браузера не было ошибок.

  // Кастомные селекты (кроме выбора языка)
  new Choices('.field-select:not(#lang) select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
  });
  // Кастомный селект выбора языка отдельно
  new Choices('#lang select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
    callbackOnCreateTemplates: function (template) {
      return {
        item: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
              ${getLangInSelectIcon(data.value)} ${data.label.substr(0,3)}
            </div>
          `);
        },
        choice: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${this.config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
              ${getLangInSelectIcon(data.value)} ${data.label}
            </div>
          `);
        },
      };
    }
  });
  function getLangInSelectIcon(value) {
    if (value == 'ru') return '<span class="field-select__lang-ru"></span>';
    else if (value == 'en') return '<span class="field-select__lang-en"></span>';
    return '<span class="field-select__lang-null"></span>';
  }

  // Выбор диапазона цен
  var slider = document.getElementById('price-range');
  noUiSlider.create(slider, {
    start: [400, 1000],
    connect: true,
    step: 100,
    range: {
      'min': 200,
      'max': 2000
    }
  });

});

function ready (fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
