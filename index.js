//For materialize collapsible menu
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);
});

const loginForm = () => document.querySelector("#login-form")
const content = () => document.getElementById('title');
const entryForm = () => document.getElementById('entry-form');
const journalList = () => document.getElementById('journal-list');
const entryContent = () => document.getElementById('entry-content');
const entryDate = () => document.getElementById('date-input');
const entryWord = () => document.getElementById('word-input');
const submitButton = () => document.getElementById('submit-btn');
const wordWrapper = () => document.getElementById('word-wrapper');
const wordDisplay = () => document.getElementById('word');
const posDisplay = () => document.getElementById('word-pos');
const definitionDisplay = () => document.getElementById('word-definition');
const wordBtn = () => document.getElementById('word-btn');

const baseURL = 'http://localhost:3000/api/v1'

document.addEventListener('DOMContentLoaded', callOnLoad);

//to DOM contentLoaded
function callOnLoad(){
  loadJournal();
  fetchWords();
  entryForm().addEventListener('submit', createEntry);
  wordWrapper().addEventListener('click', randomWord);
  const loginForm = document.querySelector("#login-form")
  loginForm.addEventListener('submit', (e) => loginFormHandler(e))
}

function loadJournal() {
  fetch(`${baseURL}/entries`)
  .then(resp => resp.json())
  .then(data => displayJournal(data))
}

function displayJournal(entries) {
  entries.forEach(obj => displayEntries(obj))
}

function displayEntries(entry) { //display
  const div = document.createElement('div');
  const p = document.createElement('p');
  const h6 = document.createElement('h6');
  const h5 = document.createElement('h5');

  h6.innerText = entry.word;
  p.innerText = entry.content;
  h5.innerText = entry.date;

  div.appendChild(p, h5);

  journalList().appendChild(div);
}

function createEntry(e) {  //create
  e.preventDefault();
  
  const strongParams = {
    entry: {
      content: entryContent().value,
      date: entryDate().value,
      word_id: wordsArray[0][currentWordIndex].id
    }
  }

  //add user association
  fetch(`${baseURL}/entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
    },
    body: JSON.stringify(strongParams)
  })
  .then(resp => console.log(resp))
  .then(obj => {
    displayEntries(obj)
  })
  
  resetInputs()
}


//Word generator

//What are we doing?  Fetch all the words from the Rails db
//What do we do with this?  put the words in an array so we can use it with the randomWords()

function resetInputs() {
  entryContent().value = '';
}

const wordsArray = [];
let currentWordIndex

function fetchWords() {
  fetch(`${baseURL}/words`)
  .then(resp => resp.json())
  .then(obj => wordsArray.push(obj))
}

function randomWord() {
    currentWordIndex = Math.floor(Math.random() * wordsArray[0].length)
    wordDisplay().innerText = wordsArray[0][currentWordIndex].word
    posDisplay().innerText = 'Part of Speech: ' + wordsArray[0][currentWordIndex].pos
    definitionDisplay().innerText = 'Definition: ' + wordsArray[0][currentWordIndex].definition
    entryWord().innerText = wordsArray[0][currentWordIndex].word
}


// const wordsArray = { "words": [
//  { 
//    'headword': {
//       'word' : 'Maca',
//       'pos': 'noun',
//       'definition': 'Red fruit that grows on a tree. Apple'
//    }    
//   },
//   { 
//     'headword': {
//       'word' : 'Pessego',
//       'pos': 'noun',
//       'definition': 'Fuzzy fruit that is good in pies. Peach'
//     }  
//   },
//   { 
//     'headword': {
//       'word' : 'Pera',
//       'pos': 'noun',
//       'definition': "Green fruit that's similar to an apple. Pear"  
//   }},
//   {
//     'headword': {
//       'word' : 'Ananas',
//       'pos': 'noun',
//       'definition': 'Tropical fruit with a big crown. Pineapple.'
//     }
//   }
// ]
// };


//USER AUTHENTICATION

//Login functions START**** 
//to DOM contentLoaded


//grabs the info from the login form
function loginFormHandler(e) { 
  e.preventDefault();
  const emailInput = e.target.querySelector('#login-email').value
  const passwordInput = e.target.querySelector('#login-password').value
  loginFetch(emailInput, passwordInput)
}

//takes that login info and fetches it FROM  the db to be parsed and stored in local storage
function loginFetch(email, password) {
  const bodyData = {user: {
    email: email,
    password: password
  }}
  fetch(`${baseURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(bodyData)
  })
  .then(resp => resp.json())
  .then(json => {
    //this is where we store our JWT Token in local storage
      localStorage.setItem('jwt_token', json.jwt)
      renderUserProfile()
  })
}

const token = localStorage.getItem('jwt_token')

function renderUserProfile() {
  //console.log(localStorage.getItem('jwt_token'));
  fetch(`${baseURL}/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
    }
  })
  .then(resp => resp.json())
  .then(json => {
    alert(`Welcome back ${json.user.name}!`)
  })
}













// //read - fetching our users (index)

// function fetchUsers(){
//   fetch(`${baseURL}/users`)
//   .then(resp => resp.json())
//   .then(users => {
//     for (const user of users){
//       let u = new User(user.id, user.name, user.username, user.email)
//       u.renderUser();
//     }
//   })
// } 

// //create - creating a new user
// //DONE need a form

// function createUserForm() {
//   let usersForm = document.getElementById('user-form');
  
//   //DONE userform event listener
//   usersForm.addEventListener('submit', userSubmitForm)
// }

// //send form info to database... fetch/post

// function userSubmitForm() {
//   e.preventDefault();
//   let name = document.getElementById('name').value;
//   let username = document.getElementById('username').value;
//   let email = document.getElementById('email').value;
  
//   let user = {
//     name: name,
//     username: username,
//     email: email
//   }
  
//   fetch(`${baseURL}/users`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify(user)
//   })
//   //returned object
//   .then(resp => console.log(resp))
// }


// //delete - delete a user
