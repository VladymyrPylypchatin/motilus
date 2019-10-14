//TODO Make Validation
class AddAddressView {
    constructor(registrationFormID) {
        this._registrationForm = document.querySelector(registrationFormID);
        this._address = null;
        this._addressInput = this._registrationForm.querySelector("input[name=address]");
        this.addressAutocomplete = null;

        this._errors = [];
        this.initAutocomplete();
    }


    getData() {
        this._address = this._registrationForm.querySelector("input[name=address]").value;
    }
    async validateForm() {
        let errors = [];

        // //Validation address parts
        if (!Validator.isFiled(this._address)) errors.push("Please enter your Address");

        // //Validation of whole address
        if (Validator.isFiled(this._address)) {
            if (!await Validator.validateAddress(this.addressAutocomplete.getPlace().formatted_address)) {
                errors.push("Please check your address. It is incorrect or not accurate enough.");
            } else {
                if (!await Validator.validateGeofencing(this.addressAutocomplete.getPlace().formatted_address)) {
                    errors.push("Oops... It seems that we can't provide services in this area");
                }
            }
        }


        // errors
        console.dir(errors);
        this._errors = errors;
        return errors.length == 0;
    }

    initAutocomplete() {
        this.addressAutocomplete = new google.maps.places.Autocomplete(this._addressInput, { types: ['address'] });
        this.addressAutocomplete.setFields(['address_component', 'formatted_address']);
        this.addressAutocomplete.addListener('place_changed', this.addressChangedHandler.bind(this));
    }

    addressChangedHandler() {
        var place = this.addressAutocomplete.getPlace();
        console.dir(place);
        console.dir(place.address_components);
    }
    clearInputs() {
        console.log('clearing inputs');
        this._addressInput.value = "";
    }
    getUserInfoObject() {
        const place = this.addressAutocomplete.getPlace().address_components;
        return {
            address: getAddressPartValue(place, 'street_number') + " " + getAddressPartValue(place, 'route'),
            zip: getAddressPartValue(place, 'postal_code'),
            city: getAddressPartValue(place, 'locality'),
            state: getAddressPartValue(place, 'administrative_area_level_1'),
        };
    }
    createUser() {
        Messanger.sendMessage("setUserInfo", this.getUserInfoObject());
    }

}

