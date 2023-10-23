'use strict'

let user = new UserForm(); 

function loginButtonPressed(data) {
    ApiConnector.login(data, loginResultCallback)
}

function registerButtonPressed(data) {
    ApiConnector.register(data, registerResultCallback)
}

function loginResultCallback(response) {
    if (response.success) {
        location.reload();
    } else {
        user.setLoginErrorMessage(response.error);
    }
}

function registerResultCallback(response) {
    console.log(response)
    if (response.success) {
        location.reload();
    } else {
        user.setRegisterErrorMessage(response.error);
    }
    }   


user.loginFormCallback = loginButtonPressed;
user.registerFormCallback = registerButtonPressed;
