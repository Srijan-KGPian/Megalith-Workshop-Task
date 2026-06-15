// EMAIL VALIDATION FUNCTION

function isValidEmailOrPhone(value){

let email =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let phone =
/^[0-9]{10}$/;

return (
email.test(value) ||
phone.test(value)
);

}