//TODO Make Validation
class LoginView{
    constructor(loginFormID, BookingViewAPI){
        this._loginForm = document.querySelector(loginFormID);
        this._email = null;
        this._password = null;
        this._errors = [];
        
        this._bookingViewAPI = BookingViewAPI;
        this._resetPasswordBtn = this._loginForm.querySelector(".reset-password");
        
        this.initEvents();
    }

    initEvents(){
        console.log();
        this._resetPasswordBtn.addEventListener("click", this.resetPassword.bind(this));
    }
    
    getData(){
        this._email = this._loginForm.querySelector("input[name=email]").value;
        this._password = this._loginForm.querySelector("input[name=password]").value;
    }

    isWrongCredentials(){
        console.dir("Wrong credentials");
        this._errors.push("Please check your username and password.");
    }

    clearErorr(){
        this._errors = [];
    }

    validateForm(){
        if (!Validator.isFiled(this._email)) {
            this._errors.push("Please enter your email");
        } 
        else {
            if (!Validator.validateEmail(this._email)) this._errors.push("Email is incorrect");
        }

        if(!Validator.isFiled(this._password)) this._errors.push("Please enter your password");


        return this._errors.length == 0;
    }
    clearInputs(){
        this._loginForm.querySelector("input[name=password]").value = "";
        this._loginForm.querySelector("input[name=email]").value = "";
    }
    getLoginInfoObject(){
        return {
            email: this._email,
            password: this._password
        };
    }
    login(){
        Messanger.sendMessage("userLogin", this.getLoginInfoObject());
    }

    resetPassword(){
        console.log("reset.password")
        this._bookingViewAPI.startLoading();
        Messanger.sendMessage("userResetPassword", {});
    }

}