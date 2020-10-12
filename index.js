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
const entryDate = () => document.getElementById('entry-content');
const entryWord = () => document.getElementById('word');
const submitButton = () => document.getElementById('submit-btn');
const wordWrapper = () => document.getElementById('word-wrapper');
const wordDisplay = () => document.getElementById('word');
const posDisplay = () => document.getElementById('word-pos');
const definitionDisplay = () => document.getElementById('word-definition');

const wordBtn = () => document.getElementById('word-btn');
const baseURL = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded', callOnLoad);


//to DOM contentLoaded
function callOnLoad(){
  loadJournal();
  entryForm().addEventListener('submit', createEntry);
  wordWrapper().addEventListener('click', randomWord);
}

function loadJournal() {
  fetch(`${baseURL}/entries`)
  .then(resp => resp.json())
  .then(data => displayJournal(data))
}

function displayJournal(entries) {
  entries.forEach(entry => displayEntries(entry))
}

function createEntry(e) {  //create
  e.preventDefault();
  
  const strongParams = {
    entry: {
      content: entryContent().value,
      //word: entryWord().value

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
  .then(entry => {
    displayEntries(entry)
    //debugger;
  })
  
  resetInputs()
}

function displayEntries(entry) { //display
  const div = document.createElement('div');
  const p = document.createElement('p');
  const h6 = document.createElement('h6');
  const h5 = document.createElement('h5');

  //h6.innerText = entry.word;
  p.innerText = entry.content;
  //h5.innerText = entry.created_at;

  div.appendChild(p, h5);

  journalList().appendChild(div);

}

//Word generator

function resetInputs() {
  entryContent().value = '';
}

const wordsArray = { "words": [
 { 'headword': {
      'word' : 'Maca',
      'pos': 'noun',
      'definition': 'Red fruit that grows on a tree. Apple'
 }, 
    'headword': {
      'word' : 'Pessego',
      'pos': 'noun',
      'definition': 'Fuzzy fruit that is good in pies. Peach'
  },
    'headword': {
      'word' : 'Pera',
      'pos': 'noun',
      'definition': "Green fruit that's similar to an apple. Pear"
  },
    'headword': {
      'word' : 'Ananas',
      'pos': 'noun',
      'definition': 'Tropical fruit with a big crown. Pineapple.'
  }
}]
};

function randomWord() {
  const wordIndex = Math.floor(Math.random() * wordsArray.words.length)
  wordDisplay().innerText = wordsArray.words[wordIndex].headword.word
  posDisplay().innerText = 'Part of Speech: ' + wordsArray.words[wordIndex].headword.pos
  definitionDisplay().innerText = 'Definition: ' + wordsArray.words[wordIndex].headword.definition
}
