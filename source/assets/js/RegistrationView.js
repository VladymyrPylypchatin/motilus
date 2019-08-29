//TODO Make Validation
class RegistrationView{
    constructor(registrationFormID){
        this._registrationForm = document.querySelector(registrationFormID);

        this._name = null;
        this._email = null;
        this._phone = null;
        this._address = null;
        this._city = null; 
        this._state = null;

        this._errors = [];
    
    }

    
    getData(){
        this._name = this._registrationForm.querySelector("input[name=name]").value;
        this._email = this._registrationForm.querySelector("input[name=email]").value;
        this._phone = this._registrationForm.querySelector("input[name=phone]").value;
        this._address = this._registrationForm.querySelector("input[name=address]").value;
        this._city = this._registrationForm.querySelector("input[name=city]").value;
        this._state = this._registrationForm.querySelector("input[name=state]").value;
    }
    async validateForm(){
        let errors = [];
        //Check emptyness of email and validation
        if(!Validator.isFiled(this._email)){
            errors.push("Please enter your email");
        } else {
            if(!Validator.validateEmail(this._email)) errors.push("Please check your email");
        }

        //Validate name
        if(!Validator.isFiled(this._name)){
            errors.push("Please enter your name");
        } else {
            if(!Validator.validateString(this._name)) errors.push("Please check your name");
        }

        //Validate phone number
        if(!Validator.isFiled(this._phone)){
            errors.push("Please enter your phone");
        } else {
            if(!Validator.validatePhoneNumber(this._phone)) errors.push("Please check your phone number");
        }

        //Validation address parts
        if(!Validator.isFiled(this._address)) errors.push("Please enter your Address");
        if(!Validator.isFiled(this._city)) errors.push("Please enter your city");
        if(!Validator.isFiled(this._state)) errors.push("Please enter your State");

        //Validation of whole address
        if(Validator.isFiled(this._address) && Validator.isFiled(this._city) && Validator.isFiled(this._state)){
            if(!await Validator.validateAddress(this._address + " " + this._city + " " + this._state)){
                errors.push("Please check your address. It is incorrect or not accurate enough.");
            } else {
                if(!await Validator.validateGeofencing(this._address + " " + this._city + " " + this._state)){
                    errors.push("BIG FAT ERROR!!!!!!!!");
                }
            }
        }


        if(!await Validator.checkUniqueEmail(this._email)) errors.push("A user with the email already exists. Please log in or register with a different email address.");
        if(!await Validator.checkUniquePhone(this._phone)) errors.push("A user with the phone already exists. Please log in or register with a different email address.");
        // errors
        console.dir(errors);
        this._errors = errors;
        return errors.length == 0;
    }
    clearInputs(){
        this._registrationForm.querySelector("input[name=name]").value = "";
        this._registrationForm.querySelector("input[name=email]").value = "";
        this._registrationForm.querySelector("input[name=phone]").value = "";
        this._registrationForm.querySelector("input[name=address]").value = "";
        this._registrationForm.querySelector("input[name=city]").value = "";
        this._registrationForm.querySelector("input[name=state]").value = "";
    }
    getUserInfoObject(){
        return {
            name: this._name,
            email: this._email,
            phone: this._phone,
            address: this._address,
            city: this._city,
            state: this._state,
        };
    }
    createUser(){
        Messanger.sendMessage("setUserInfo", this.getUserInfoObject());
    }

}