const isValidEmail = function (str) {
    var regex = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
    if (regex.test(str)) {
        return true;
    }
    else {
        return false;
    }
};
isValidEmail('som@eemail.om');
