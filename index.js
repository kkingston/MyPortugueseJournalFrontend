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
const baseURL = 'http://localhost:3000/api/v1'
const journal = [];

document.addEventListener('DOMContentLoaded', callOnLoad);

//to DOM contentLoaded
function callOnLoad(){
  entryForm().addEventListener('submit', createEntry);

  }

function createEntry(e) {  //create

  e.preventDefault();
  
  const entry = {
    content: entryContent().value
  }

  debugger;

  journal.push(entry); //save
  displayjournal(entry);
  resetInputs();
}

function displayjournal(entry) { //display
  const div = document.createElement('div');
  const p = document.createElement('p');

  p.innerText = entry.content;

  div.appendChild(p);

  journalList().appendChild(div);

}

function resetInputs() {
  entryContent().value = '';
}
