//TODO Make Validation
class RegistrationView {
    constructor(registrationFormID) {
        this._registrationForm = document.querySelector(registrationFormID);
        this._addressInput = this._registrationForm.querySelector("input[name=address]");
        this.addressAutocomplete = null;

        this._name = null;
        this._email = null;
        this._phone = null;
        this._address = null;
        this._aptNumber = null;

        this._errors = [];
        this.initAutocomplete();
    }


    getData() {
        this._name = this._registrationForm.querySelector("input[name=name]").value;
        this._email = this._registrationForm.querySelector("input[name=email]").value;
        this._phone = this._registrationForm.querySelector("input[name=phone]").value;
        this._address = this._registrationForm.querySelector("input[name=address]").value;
        this._aptNumber = this._registrationForm.querySelector("input[name=aptnumber]").value;
        // this._city = this._registrationForm.querySelector("input[name=city]").value;
        // this._state = this._registrationForm.querySelector("input[name=state]").value;
        // this._zip = this._registrationForm.querySelector("input[name=zipcode]").value;
    }
    async validateForm() {
        let errors = [];
        //Check emptyness of email and validation
        if (!Validator.isFiled(this._email)) {
            errors.push("Please enter your email");
        } else {
            if (!Validator.validateEmail(this._email)) errors.push("Please check your email");
        }

        //Validate name
        if (!Validator.isFiled(this._name)) {
            errors.push("Please enter your name");
        } else {
            if (!Validator.validateString(this._name)) errors.push("Please check your name");
        }

        //Validate phone number
        if (!Validator.isFiled(this._phone)) {
            errors.push("Please enter your phone");
        } else {
            if (!Validator.validatePhoneNumber(this._phone)) errors.push("Please check your phone number");
        }

        // //Validation address parts
        if(!Validator.isFiled(this._address)) errors.push("Please enter your Address");
        if(!Validator.isFiled(this._aptNumber)) errors.push("Please enter your Appartment number");
        
        // //Validation of whole address
        if(Validator.isFiled(this._address)){
            if(!await Validator.validateAddress(this.addressAutocomplete.getPlace().formatted_address)){
                errors.push("Please check your address. It is incorrect or not accurate enough.");
            } else {
                if(!await Validator.validateGeofencing(this.addressAutocomplete.getPlace().formatted_address)){
                    errors.push("Oops... It seems that we can't provide services in this area");
                }
            }
        }



        if (!await Validator.checkUniqueEmail(this._email)) errors.push("A user with the email already exists. Please log in or register with a different email address.");
        if (!await Validator.checkUniquePhone(this._phone)) errors.push("A user with the phone already exists. Please log in or register with a different email address.");
        // errors
        console.dir(errors);
        this._errors = errors;
        return errors.length == 0;
    }
    clearInputs() {
        this._registrationForm.querySelector("input[name=name]").value = "";
        this._registrationForm.querySelector("input[name=email]").value = "";
        this._registrationForm.querySelector("input[name=phone]").value = "";
        this._registrationForm.querySelector("input[name=address]").value = "";
        this._registrationForm.querySelector("input[name=city]").value = "";
        this._registrationForm.querySelector("input[name=state]").value = "";
    }

    initAutocomplete() {
        this.addressAutocomplete = new google.maps.places.Autocomplete(this._addressInput, { types: ['address'] });
        this.addressAutocomplete.setFields(['address_component', 'formatted_address']);
        this.addressAutocomplete.addListener('place_changed', this.addressChangedHandler.bind(this));
    }

    addressChangedHandler() {
        var place =  this.addressAutocomplete.getPlace();
    }

    getUserInfoObject() {
        const place = this.addressAutocomplete.getPlace().address_components;
        return {
            name: this._name,
            email: this._email,
            phone: this._phone.replace(/[)(\- ]+/, ""),
            address: getAddressPartValue(place, 'street_number') + " " + getAddressPartValue(place, 'route') + " #" + this._aptNumber,
            zip: getAddressPartValue(place, 'postal_code'),
            city: getAddressPartValue(place, 'locality'),
            state: getAddressPartValue(place, 'administrative_area_level_1'),
        };
    }
    createUser() {
        Messanger.sendMessage("setUserInfo", this.getUserInfoObject());
    }

}

function getAddressPartValue(addressParts, partName) {
    for(let i = 0; i < addressParts.length; i++) {
        addressParts[i].types
    }

    const part = addressParts.find(addressPart => {
        return addressPart.types.some(type => type === partName);
    });

    return part.long_name;
}