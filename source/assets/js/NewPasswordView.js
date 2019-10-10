//TODO Make Validation
class NewPasswordView{
    constructor(registrationFormID){
        this._registrationForm = document.querySelector(registrationFormID);
        this._password = null;
        this._checkbox = null;

        this._errors = [];
    }

    getData(){
        this._password = this._registrationForm.querySelector("input[name=password]").value;
        this._checkbox = this._registrationForm.querySelector("input[name=acceptterms]");
    }
    validateForm(){
        if(!Validator.isFiled(this._password)){
            this._errors.push("Please enter a password");
        } else {
            if(!Validator.minLength(this._password, 5)) {
                this._errors.push("Password must be at least 5 characters");
            } else {
                if(!this._checkbox.checked)
                    this._errors.push("Please accept terms of service");
            }
        } 
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