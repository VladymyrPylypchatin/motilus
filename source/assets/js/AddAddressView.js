//TODO Make Validation
class AddAddressView{
    constructor(registrationFormID){
        this._registrationForm = document.querySelector(registrationFormID);
        this._address = null;
        this._city = null; 
        this._state = null;
        this._zip = null;

        this._errors = [];
    
    }

    
    getData(){
        this._address = this._registrationForm.querySelector("input[name=address]").value;
        this._city = this._registrationForm.querySelector("input[name=city]").value;
        this._state = this._registrationForm.querySelector("input[name=state]").value;
        this._zip = this._registrationForm.querySelector("input[name=zipcode]").value;
    }
    async validateForm(){
        let errors = [];
        
        //Validation address parts
        if(!Validator.isFiled(this._address)) errors.push("Please enter your Address");
        if(!Validator.isFiled(this._city)) errors.push("Please enter your city");
        if(!Validator.isFiled(this._state)) errors.push("Please enter your State");

        //Validate ZIP
        if(!Validator.isFiled(this._zip)){
            errors.push("Please enter you ZIP code")
        } else {
            if(!Validator.validateZipCode(this._zip)) errors.push("Please check you zip code");
        }

        //Validation of whole address
        if(Validator.isFiled(this._address) && Validator.isFiled(this._city) && Validator.isFiled(this._state)){
            if(!await Validator.validateAddress(this._address + " " + this._city + " " + this._state + " " + this._zip)){
                errors.push("Please check your address. It is incorrect or not accurate enough.");
            } else {
                if(!await Validator.validateGeofencing(this._address + " " + this._city + " " + this._state  + " " + this._zip)){
                    errors.push("Oops... It seems that we can't provide services in this area");
                }
            }
        }

        
        // errors
        console.dir(errors);
        this._errors = errors;
        return errors.length == 0;
    }
    clearInputs(){
        this._registrationForm.querySelector("input[name=phone]").value = "";
        this._registrationForm.querySelector("input[name=address]").value = "";
        this._registrationForm.querySelector("input[name=city]").value = "";
        this._registrationForm.querySelector("input[name=state]").value = "";
    }
    getUserInfoObject(){
        return {
            address: this._address,
            zip: this._zip,
            city: this._city,
            state: this._state,
        };
    }
    createUser(){
        Messanger.sendMessage("setUserInfo", this.getUserInfoObject());
    }

}