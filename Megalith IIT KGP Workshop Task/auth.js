// ==========================
// HELPERS
// ==========================

function isValidEmailOrPhone(value){

const email =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phone =
/^[0-9]{10}$/;

return (
email.test(value) ||
phone.test(value)
);

}



// ==========================
// SIGNUP
// ==========================

const signupForm =
document.getElementById(
'signupForm'
);

signupForm.addEventListener(
'submit',
function(e){

e.preventDefault();

const fname =
document.getElementById(
'regfname'
).value.trim();

const lname =
document.getElementById(
'reglname'
).value.trim();

const contact =
document.getElementById(
'regcontact'
).value.trim();

const password =
document.getElementById(
'regpassword'
).value;

const confirm =
document.getElementById(
'regconfirm'
).value;



// validation
if(
!isValidEmailOrPhone(
contact
)
){

alert(
'Enter valid Email or Phone'
);

return;

}


// password match
if(password !== confirm){

alert(
'Passwords do not match'
);

return;

}



// existing users
const users =
JSON.parse(
localStorage.getItem(
'users'
)
) || [];



// duplicate account check
const existingUser =
users.find(
(user) =>
user.contact === contact
);


if(existingUser){

alert(
'Account already exists with this Email or Phone'
);

return;

}



// add user
users.push({

fname,
lname,
contact,
password

});



localStorage.setItem(
'users',
JSON.stringify(users)
);



alert(
'Registration successful!'
);



// close modal
const modal =
bootstrap.Modal.getInstance(
document.getElementById(
'registerModal'
)
);

modal.hide();

signupForm.reset();

});




// ==========================
// LOGIN
// ==========================

const loginForm =
document.getElementById(
'loginForm'
);

loginForm.addEventListener(
'submit',
function(e){

e.preventDefault();

const contact =
document.getElementById(
'loginInput'
).value.trim();

const password =
document.getElementById(
'floatingPassword'
).value;



// validation
if(
!isValidEmailOrPhone(
contact
)
){

alert(
'Enter valid Email or Phone'
);

return;

}



// get users
const users =
JSON.parse(
localStorage.getItem(
'users'
)
) || [];



// find matching user
const validUser =
users.find(
(user) =>

user.contact === contact &&
user.password === password

);



if(validUser){

// save logged user
localStorage.setItem(
'currentUser',
contact
);



// redirect
window.location.href =
'notes.html';

}
else{

alert(
'Invalid Email/Phone or Password'
);

}

});