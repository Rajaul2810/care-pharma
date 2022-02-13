const name = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const form = document.getElementById("form");

function showError(input, message) {
  const regi = input.parentElement;
  regi.className = "regi error";
  const small = regi.querySelector("small");
  small.innerText = message;
}
function showSuccess(input) {
  const regi = input.parentElement;
  regi.className = "regi success";
}

function check(inputArr) {
  // console.log(inputArr);
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFileName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

const getFileName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

function passwordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not mach");
  }
}
function validEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, "Email is not valid");
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  check([username, email, password, password2]);
  passwordMatch(password, password2);
  validEmail(email);
});

const btnAddUser = document.getElementById("addUser");
btnAddUser.addEventListener("click", () => {
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  if (
    name.length > 0 &&
    email.length > 0 &&
    password2.length > 0 &&
    password.length > 0
  ) {
    if (password === password2) {
      const user = { name, email, password, password2 };
      console.log(user);
      fetch('http://localhost:4000/addUser',{
          method:'POST',
          body:JSON.stringify(user),
          headers:{"Content-type":"application/json"}
      })
      .then(res => res.json())
      .then(data=> ShowAlert(data))
    }
  }
});

const ShowAlert = (data) =>{
  console.log(data)
     const {massage}= data;
    if(massage==="Successfully Registered"){
        swal("Good job!", "Your Registration Complete! Please Login..", "success");
    }else{
        swal("Sorry!", "User Already Registered!", "warning");
    }
}