//For materialize collapsible menu
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);
});

document.addEventListener('DOMContentLoaded', callOnLoad);

  //to DOM contentLoaded
  function callOnLoad(){
    App.fetchWords();
    App.loadJournal();
    Word.wordWrapper().addEventListener('click', Word.randomWord);
    Entry.entryForm().addEventListener('submit', Entry.createEntry);
    User.loginForm().addEventListener('submit', (e) => User.loginFormHandler(e))
  }

const baseURL = 'http://localhost:3000/api/v1'


