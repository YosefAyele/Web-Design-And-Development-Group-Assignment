//AUTHENTICATION FEATURE

const signinForm = document.getElementById("signin-form");

signinForm.addEventListener("submit", signin);

async function signin(event) {
  event.preventDefault();
  

  const email = document.getElementById("username").value;
  const password = document.getElementById("pwd").value;

  const body = { email, password };

  const response = await fetch("http://localhost:3000/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  localStorage.setItem('auth' , data.access_token);
  if (response.ok){
    
  }
  
}

const signupForm = document.getElementById('signup_form');
console.log(signupForm)
signupForm.addEventListener('submit' , signup);
async function signup(event){
    console.log("i got called")

    event.preventDefault();

    const email = document.getElementById("email_signup").value;
    const password = document.getElementById("confirmPassword").value;
  
    const body = { email, password };
  
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  
    const data = await response.json();
  
    localStorage.setItem('auth' , data.access_token);



}

