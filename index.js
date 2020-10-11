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

document.addEventListener('DOMContentLoaded', callOnLoad);

//to DOM contentLoaded
function callOnLoad(){
  loginForm().addEventListener('submit', (e) => loginFormHandler(e));
  entryForm().addEventListener('submit', (e) => createEntry(e));
}
