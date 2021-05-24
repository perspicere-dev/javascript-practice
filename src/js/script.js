const booksList = document.querySelector('.books-list');
function renderBooks(books){
  console.log('renderbooks');
  console.log('ksiązki', books);
    
  const tplBookSource = document.querySelector('#template-book').innerHTML;
  const tplBookFunc = Handlebars.compile(tplBookSource);
    
  for(let book of books){
    const generatedHTML = tplBookFunc(book);
    const elementDom = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(elementDom);   
  }     
}

const favoriteBooks = [];
console.log('favoriteBooks', favoriteBooks);

function initActions(){
  const imagesList = booksList.querySelectorAll('.book__image');
  console.log('imagesList', imagesList);
  
  imagesList.addEventListener('click', function(event){
    event.preventDefault();
    console.log('event.target.offsetParent', event.target.offsetParent);
  });
  
  imagesList.addEventListener('dblclick', function(event){
    if(!event.target.offsetParent.classList.contains('.book__image')){   //jak sprawdzić czy data-id jest w favoriteBooks[]?
      image.classList.add('favorite');
      favoriteBooks.push(image.getAttribute('data-id'));
      console.log('favoriteBooksadd', favoriteBooks);
    }else{
      image.classList.remove('favorite');
      favoriteBooks.splice(image.getAttribute('data-id')); // 2 x jest i tak dodawana pozycja do tablicy
      console.log('favoriteBooksrem', favoriteBooks);
    }
  });
}

console.log('favoriteBooks', favoriteBooks);
const app = {
  init: function(){
    this.initData();
    renderBooks(this.books);
    initActions();
  },
  initData: function(){
    console.log('initData');
    this.books = dataSource.books;
  }    
};

app.init();




