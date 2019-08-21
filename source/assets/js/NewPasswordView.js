//TODO Make Validation
class NewPasswordView{
    constructor(registrationFormID){
        this._registrationForm = document.querySelector(registrationFormID);
        this._password = null;

        this._errors = [];
    }

    getData(){
        this._password = this._registrationForm.querySelector("input[name=password]").value;
    }
    validateForm(){
        if(!Validator.isFiled(this._password)) this._errors.push("Password is empty");
        if(!Validator.minLength(this._password, 5)) this._errors.push("Min password length is 5 charectes");
        return this._errors.length == 0;
    }
    clearInputs(){
        this._registrationForm.querySelector("input[name=password]").value = "";
    }
    getPasswordObject(){
        return {
            password: this._password
        };
    }
    setUserPassword(){
        Messanger.sendMessage("setUserPassword", this.getPasswordObject());
    }
}