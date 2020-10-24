class App {
//fetching things from the db

//entries fetch
  static loadJournal() {
    fetch(`${baseURL}/entries`)
    .then(resp => resp.json())
    .then(entries => {
      //console.log(entries)
        entries.forEach(entry => {
          //debugger
          let newEntry = new Entry(entry, entry.word, entry.user) 
          //Entry.journalList().innerHTML += newEntry.displayEntries()
          Entry.all.push(newEntry)
          newEntry.display()
        })
      })
  }
  // Entry.displayJournal(entries => {

  static fetchWords() {
    fetch(`${baseURL}/words`)
    .then(resp => resp.json())
    .then(words => {
      //console.log(words)
      words.forEach(word => {
        //debugger
        let newWord = new Word(word)
        Word.wordsArray.push(newWord)
      })
      Word.randomWord();

    })
  }

//login user fetch

  //takes that login info from the form and takes it to the db to be authenticated and given a token, it is then stored in local storage
 
 
  static loginFetch(email, password) {
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
      localStorage.setItem('jwt_token', json.jwt)
      App.renderUserProfile()
    })
  }
  
  //this is where we store our JWT Token in local storage
  // grabs the token from local sotage, takes it to the db to be authenticated with the token, then logs the user in.
  static renderUserProfile() {
    //console.log(localStorage.getItem('jwt_token'));
    fetch(`${baseURL}/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      }
    })
    .then(resp => resp.json())
    .then(user => {
      console.log(user)
        let newUser = new User(user.user)
        User.currentUser(newUser)
        alert(`Welcome back ${user.user.name}!`)
    })
  }

}