class User {

  constructor(user){
    //debugger
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    //User.current.push(this)
  }


  static loginForm = () => document.querySelector("#login-form")
  static submitButton = () => document.getElementById('submit-btn');
  static header = () => document.getElementById('collapsible-header');

  static loginFormHandler(e) { 
    e.preventDefault();
    const emailInput = e.target.querySelector('#login-email').value
    const passwordInput = e.target.querySelector('#login-password').value
    App.loginFetch(emailInput, passwordInput)
    
  }
  
  //static currentUser(newUser) {
  //  User.current.push(newUser)
    //User.current.unshift(user)[0]

    // const h6 = document.createElement('h6');
    // h6.innerText = this.user.name;
    // header().appendChild(h6);
  //}
}

//User.current = [];