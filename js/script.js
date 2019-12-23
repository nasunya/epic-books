ready(function () {

  // фильтр и меню
  const filter = document.querySelector('.filters');
  const filterToggle = document.querySelector('.filters__trigger')
  filterToggle.addEventListener('click', function (e) {
    filter.classList.toggle('filters--open')
  });


  let mobMenu = document.querySelector('.main-nav');
  mobMenu.onclick = function () {
    let burger = document.querySelector('.burger');
    mobMenu.classList.toggle('main-nav--open');
    burger.classList.toggle('burger--close')


  }


  // модальные окна и отображение всех книг



  let modalOpen = document.querySelector('.modal')
  let catalog = document.querySelector('.catalog__books-list')

  const findBookById = (id) => {
    const book = books.find(item => {
      return item.uri === id
    });

    return book;
  }



  catalog.addEventListener('click', function (e) {
    modalOpen.classList.toggle('modal--open');
    document.querySelector('html').classList.add('js-modal-open')
    let target = e.target;
    const card = target.closest('.card');
    const id = card.dataset.id;
    const book = findBookById(id);
    const popup = document.querySelector('.product')
    popup.innerHTML = getPopupHtml(book)

    modalOpen.dataset.title = book.name;

  });


  let cardsHTML = '';
  console.log(books);


  books.forEach(function (item) {
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









  let productHTML = '';
  console.log(books);

  function getPopupHtml(item) {
    return `
  
                <div class="product__img-wrap">
                  <img src="books/${item.uri}.jpg" alt="Искренний сервис" width="422" height="594">
                </div>
                <div class="product__text-info">
                  <h2 class="product__title">${item.name}</h2>
                  <div class="rating product__rating">
                    <span class="rating__stars">
                      <svg width="18" height="18">
                        <use xlink:href="#star"></use>
                      </svg>
                      <svg width="18" height="18">
                        <use xlink:href="#star"></use>
                      </svg>
                      <svg width="18" height="18">
                        <use xlink:href="#star"></use>
                      </svg>
                      <svg width="18" height="18">
                        <use xlink:href="#star"></use>
                      </svg>
                      <svg width="18" height="18">
                        <use xlink:href="#star-half"></use>
                      </svg>
                    </span>
                    <span class="rating__num">4.6/5.0</span>
                    <span class="rating__review">20 отзывов</span>
                  </div>
                  <table class="product__table-info">
                    <tr>
                      <th>Автор:</th>
                      <td>
                        <a href="">Девид Огилви</a>
                      </td>
                    </tr>
                    <tr>
                      <th>Артикул:</th>
                      <td>6649507</td>
                    </tr>
                    <tr>
                      <th>В наличии:</th>
                      <td>5 шт.</td>
                    </tr>
                  </table>
                </div>
                <div class="product__descr">
                  <h3 class="product__subtitle">Описание:</h3>
                  <p>${item.desc}</p>
                  <div class="product__actions">
                    <button class="btn  btn--price">
                    ${item.price}
                      <span class="btn__sm-text">
                        <svg class="btn__icon" width="14" height="14">
                          <use xlink:href="#plus"></use>
                        </svg>
                        <span>В корзину</span>
                      </span>
                    </button>
                  </div>
               </div>
              </div>`

  };

  document.querySelector('.product').innerHTML = productHTML;
  

  const html = document.querySelector('html');
  // закрытие модального окна
  let close = document.querySelector('.modal__close')
  let modalWindow = document.querySelector('.modal--open')

  close.addEventListener('click', function (e) {
    modalOpen.classList.toggle('modal--open')
    html.classList.remove('js-modal-open')
  });

  document.addEventListener('keyup', e => {
    let keyName = e.keyCode;

    if (keyName === 27) {
      modalOpen.classList.remove('modal--open');
      html.classList.remove('js-modal-open');
    }
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

function ready(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}