const booksList = document.querySelector('.books-list');

function renderBooks(books){
  const tplBookSource = document.querySelector('#template-book').innerHTML;
  const tplBookFunc = Handlebars.compile(tplBookSource);
    
  for(let book of books){
    const generatedHTML = tplBookFunc(book);
    const elementDom = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(elementDom);   
  }     
}

const favoriteBooks = [];

function initActions(){

  booksList.addEventListener('click', function(event){
    event.preventDefault();
    console.log('event', event);
  });

  booksList.addEventListener('dblclick', function(event){
    if(event.target.offsetParent.classList.contains('book__image')){
      const image = event.target.offsetParent;
      if(!image.classList.contains('favorite')){   //jak sprawdzić czy data-id jest w favoriteBooks[]?
        image.classList.add('favorite');
        favoriteBooks.push(image.getAttribute('data-id'));
      }else{
        image.classList.remove('favorite');
        let imageId = image.getAttribute('data-id');
        let indexOfImageId = favoriteBooks.indexOf(imageId);
        favoriteBooks.splice(indexOfImageId, 1); 
      }
    }
  });

  filtersSelector.addEventListener('click', function(event){

    if(event.target.tagName == 'INPUT' 
    && event.target.type == 'checkbox' 
    && event.target.name == 'filter'){
      const input = event.target;
      const inputValue = input.getAttribute('value');

      if(input.checked){
        filters.push(inputValue);
      }else{
        const indexOfInput = filters.indexOf(inputValue);
        filters.splice(indexOfInput, 1);
      }
    }
    console.log('filters', filters);
  });
}

const filters = [];
const filtersSelector = document.querySelector('.filters');

const app = {
  init: function(){
    this.initData();
    renderBooks(this.books);
    initActions();
  },
  initData: function(){
    this.books = dataSource.books;
  }    
};

app.init();
