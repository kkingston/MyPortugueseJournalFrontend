
class Entry {

  constructor(entry, entryWord, entryUser) {
    //debugger
    this.id = entry.id
    this.content = entry.content,
    this.date = entry.date,
    this.wordId = entryWord.id,
    this.word = entryWord.word,
    this.userId = entryUser.id,
    this.username = entryUser.username
    Entry.all.push(this)
    }

  static entryContent = () => document.getElementById('title');
  static entryForm = () => document.getElementById('entry-form');
  static journalList = () => document.getElementById('journal-list');
  static entryContent = () => document.getElementById('entry-content');
  static entryDate = () => document.getElementById('date-input');
  static entryWord = () => document.getElementById('word-input');
  
  display() { //display
    //debugger
    const div = document.createElement('div');
    const p = document.createElement('p'); 
    const h6 = document.createElement('h6');
    const h5 = document.createElement('h5');
    const date = new Date(this.date)
    //const deleteBtn = document.createElement('button');
    //const editBtn = document.createElement('button');
  
    h5.innerText = `${this.word} - ${date.toDateString()}`;
    p.innerText = this.content;
    h6.innerText = this.username;
  
    
    div.appendChild(h5);
    div.appendChild(h6);
    div.appendChild(p);
  
    this.constructor.journalList().appendChild(div);
  }
  
  static createEntry(e) {  //create
    e.preventDefault();
    
    const strongParams = {
      entry: {
        content: Entry.entryContent().value,
        date: Entry.entryDate().value,
        word_id: Word.wordId().innerHTML
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
    .then(entry => {
          console.log(entry)
          //debugger
          let newEntry = new Entry(entry, entry.word, entry.user) 
          //Entry.journalList().innerHTML += newEntry.displayEntries()
          Entry.all.push(newEntry)
          newEntry.display()
    }) 
    Entry.resetInputs()
  }
  
  static resetInputs() {
    Entry.entryContent().value = '';
  }
  
}

Entry.all = [];


//Entry.deleteBtn.classList.add('btn');
//Entry.deleteBtn.innerText = "Delete"
//Entry.deleteBtn.id = entry.id;
//Entry.deleteBtn.addEventListener('click', deleteEntry);

//Entry.editBtn.classList.add('editBtn');
//Entry.editBtn.innerText = "Edit!"
//Entry.editBtn.id = entry.id;
//Entry.editBtn.addEventListener('click', Blog.editEntry);