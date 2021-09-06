function hasValue(input) {
    return !input?'Can not be empty':''
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())?'':'Not valid email';

}

function hasLength(input) {
    return input.length<8?'Must be asdfas 8':''
}

function hasCapitalLetter(input) {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str)?'':'Must cotain capital letter'
}

function hasLowerCaseLetter(input) {

}

function hasNumber(input) {

}

function hasSpecialCharacter(input) {

}

function validateFunctions(input, functions) {
    return functions.map(fun => {
        let response = fun(input)
        if(response !== '') {
            return response;
        }
    }).find(x => x)||''
}

function validate(email, password) {
    const emailValidResponse = validateFunctions(email, [
        hasValue,
        isValidEmail
    ])

    const passwordValidResponse = validateFunctions(password, [
        hasValue,
        hasLength,
        hasCapitalLetter,
        hasNumber,
        hasSpecialCharacter
    ])

    document.getElementById('emailError').innerHTML = emailValidResponse
    document.getElementById('passwordError').innerHTML = passwordValidResponse
}