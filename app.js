const input = document.querySelector('.input');
const save = document.querySelector('.save-btn');
const outputSection = document.querySelector('.output-section');
const clear = document.querySelector('.clear-btn');
const counter = document.querySelector('.counter');


// aligning the array with the local storage location
let saveArray = JSON.parse(localStorage.getItem('todo')) || [];

function renderTodoItem(inputValue) {

  // manipulating the DOM to create the output elements
  const content = document.createElement('article');
  content.className = 'output';
  outputSection.appendChild(content);

  const outputText = document.createElement('input');
  outputText.setAttribute('readonly', 'readonly');
  outputText.type = 'text';
  outputText.className = 'output-text';
  outputText.value = inputValue;
  content.appendChild(outputText);

  const editIcons = document.createElement('div');
  editIcons.className = 'format-icons';
  content.appendChild(editIcons);

  const delBtn = document.createElement('i');
  delBtn.className = 'del-btn fa-regular fa-circle-xmark';
  editIcons.appendChild(delBtn);
//  creating functionality for the delete icon
  delBtn.addEventListener('click', () => {
    outputSection.removeChild(content);
    // slice method removes the particular item from the array
    saveArray.splice(saveArray.indexOf(inputValue), 1);
    updateCounter();
    saveToLocalStorage();
  });
}

function saveToLocalStorage() {
  // pushes the value to the local storage
  localStorage.setItem('todo', JSON.stringify(saveArray));
}


// this function clears everything in the array or local storage
function clearTodoItems() {
  outputSection.innerHTML = '';
  saveArray = [];
  updateCounter();
  saveToLocalStorage();
}


// keeps record of the content in the array
function updateCounter() {
  const itemCount = saveArray.length;
  if (itemCount === 1) {
    counter.innerText = `${itemCount} item left`;
  } else {
    counter.innerText = `${itemCount} items left`;
  }
}


// fires when the save button is clicked
// pushes the value in the input field to the array
save.addEventListener('click', () => {
  const inputValue = input.value.trim();
  if (inputValue !== '') {
    saveArray.push(inputValue);
    input.value = '';
    renderTodoItem(inputValue);
    updateCounter();
    saveToLocalStorage();
  }
});
// calls the clear function that clears the todo items

clear.addEventListener('click', () => {
  clearTodoItems();
});

// Render existing todo items from local storage
if (saveArray.length > 0) {
  saveArray.forEach((todo) => {
    renderTodoItem(todo);
  });
}

updateCounter();


// Dark mode setup
const header = document.querySelector('.header');
let body = document.body

let sunIcon = document.querySelector(".sun-icon")
let moonIcon = document.querySelector(".moon-icon")
let icon = document.querySelector(".icon")

icon.addEventListener('click', ()=>{
  body.classList.toggle("dark")
  header.classList.toggle("dark-bg")
})

moonIcon.addEventListener('click', ()=>{
  sunIcon.style.display = "inline"
  moonIcon.style.display = "none"
  
})


sunIcon.addEventListener('click', ()=>{
  sunIcon.style.display = "none"
  moonIcon.style.display = "inline"
})


