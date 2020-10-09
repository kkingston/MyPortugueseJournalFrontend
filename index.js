const baseURL = 'http://localhost:3000/api/v1'

document.addEventListener('DOMContentLoaded', callOnLoad);

//For materialize collapsible menu
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);
});

//Login functions START**** 
//to DOM contentLoaded
function callOnLoad(){
  const loginForm = document.querySelector("#login-form")
  loginForm.addEventListener('submit', (e) => loginFormHandler(e))
}

//grabs the info from the login form
function loginFormHandler(e) { 
  e.preventDefault();
  const emailInput = e.target.querySelector('#login-email').value
  const passwordInput = e.target.querySelector('#login-password').value
  loginFetch(emailInput, passwordInput)
}

//takes that login info and fetches it TO the db
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
    //console.log(json)
    //this is where we store our JWT Token in local storage
    localStorage.setItem('jwt_token', json.jwt)
    renderUserProfile()
  })
}

function renderUserProfile() {
  //console.log(localStorage.getItem('jwt_token'));
  fetch(`${baseURL}/profile`, {
    method: 'GET',
    headers: `Bearer ${localStorage.getItem('jwt_token')}`
  })
  .then(resp => console.log(resp))

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