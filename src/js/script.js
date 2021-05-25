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

      filterBooks();
    }
    // console.log('filters', filters);
  });
}

function filterBooks(){
  
  for(let bookData of app.books){
    const bookHTML = booksList.querySelector(`.book__image[data-id="${bookData.id}"]`);
    let shouldBeHidden = false;

    for(const filter of filters){
      if(!bookData.details[filter] == true){
        shouldBeHidden = true;
        console.log('filter', filter);
        break;
      }
    }

    if(shouldBeHidden == true){
      if(!bookHTML.classList.contains('hidden')){
        bookHTML.classList.add('hidden');
      }
    }else if(bookHTML.classList.contains('hidden')){
      bookHTML.classList.remove('hidden');
    }
  }
}

// function filterBooks(){  RAFAŁ
//   // filters
//   // app.books
//   for(let bookData of app.books){
//     console.log('bookData', bookData);
//     const bookHTML = booksList.querySelector(`.book__image[data-id="${bookData.id}"]`);
//     console.log('bookHTML', bookHTML);

//     let isAdultOn = false;
//     let isNonFictionOn = false;

//     if(bookData.details.adults == true && filters.includes('adults')){      
//       isAdultOn = true;
//     }
    
//     if(bookData.details.nonFiction == true && filters.includes('nonFiction')){
//       isNonFictionOn = true;
//     }

//     if(isAdultOn || isNonFictionOn){
//       if(!bookHTML.classList.contains('hidden')){
//         bookHTML.classList.add('hidden');
//       }
//     } else if(bookHTML.classList.contains('hidden')){
//       bookHTML.classList.remove('hidden');  
//     }
//   }
// }

const filters = [];
const filtersSelector = document.querySelector('.filters');

const app = {
  init: function(){
    this.initData();
    renderBooks(this.books);
    initActions();
    filterBooks();
  },
  initData: function(){
    this.books = dataSource.books;
  }    
};

app.init();
