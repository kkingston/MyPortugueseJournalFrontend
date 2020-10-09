const baseURL = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded', callOnLoad);

function callOnLoad(){
  createUserForm();
  fetchUsers();
  
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);
});

//read - fetching our users (index)

function fetchUsers(){
  fetch(`${baseURL}/users`)
  .then(resp => resp.json())
  .then(users => {
    for (const user of users){
      let u = new User(user.id, user.name, user.username, user.email)
      u.renderUser();
    }
  })
} 

//create - creating a new user
//DONE need a form

function createUserForm() {
  let usersForm = document.getElementById('user-form');
  
  //DONE userform event listener
  usersForm.addEventListener('submit', userSubmitForm)
}

//send form info to database... fetch/post

function userSubmitForm() {
  e.preventDefault();
  let name = document.getElementById('name').value;
  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
  
  let user = {
    name: name,
    username: username,
    email: email
  }
  
  fetch(`${baseURL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(user)
  })
  //returned object
  .then(resp => console.log(resp))
  
}


//delete - delete a user