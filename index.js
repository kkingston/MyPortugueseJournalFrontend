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
      word: entryWord().value,
      date: entryDate().value
    }
  }

  fetch(`${baseURL}/entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
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

function fetchWords() {
  fetch(`${baseURL}/words`)
  .then(resp => resp.json())
  .then(obj => wordsArray.push(obj))
}

function randomWord() {
  const wordIndex = Math.floor(Math.random() * wordsArray[0].length)
    wordDisplay().innerText = wordsArray[0][wordIndex].word
    posDisplay().innerText = 'Part of Speech: ' + wordsArray[0][wordIndex].pos
    definitionDisplay().innerText = 'Definition: ' + wordsArray[0][wordIndex].definition
    entryWord().innerText = wordsArray[0][wordIndex].word


}
