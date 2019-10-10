class TabLogin extends Tab{
    constructor(id, title, BookingViewAPI){
        super(id, title, BookingViewAPI);
        this._data = null;
        this._loginView = new LoginView("#login-form", BookingViewAPI);
        this._navCreateAccount = this._tab.querySelector("#nav-create-account");
        this._navCreateAccount.addEventListener("click", this.navigationHandler.bind(this));
        this._listenActivated = false;

    }
    run(){
      if(!this._listenActivated) this.listen();
    }

    listen() {
        window.addEventListener("message", async (event) => {
            try{
                if(event.data != null){
                    this._data = JSON.parse(event.data, JSON.dateParser);
                    switch(this._data.action){                      
                        case "userAccessAlowed":
                            await this._bookingViewAPI.finishLoading();
                            this._bookingViewAPI.jumpToSlide(10);
                            // this._bookingViewAPI.jumpToSlide(7);
                        break;
                        case "userAccessDenied":
                            this.enableButton()
                            this._loginView.isWrongCredentials();
                            this._bookingViewAPI._notificator.erraseErorr(this._loginView._errors);
                            this._loginView.clearErorr();
                        break;
                        case "userResetPasswordEnd":
                            await this._bookingViewAPI.finishLoading();
                        break;
                    }
                }
            } 
            catch(e){
            }
        });
        this._listenActivated = true;
    }

    navigationHandler(){
        if(this._bookingViewAPI._status == "ready"){
            this._bookingViewAPI._status = "proccesing";
            this._bookingViewAPI.jumpBackToSlide(3);
        }
    }
    actionButtonHandler(){
        if(this._bookingViewAPI._status == "ready"){
            this.disableButton();
            this._loginView.getData();

            if(this._loginView.validateForm()){
                // this.disableButton();
                this._bookingViewAPI.startLoading();
                this._loginView._status == "proccesing"

                // this._registrationView.clearInputs();
                this._loginView.login();
            } else {
                this._bookingViewAPI._notificator.erraseErorr(this._loginView._errors);
                this._loginView._errors = [];
                this.enableButton();
            }
        }
    }

}

if (window.JSON && !window.JSON.dateParser) {
    var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
   
    JSON.dateParser = function (key, value) {
        if (typeof value === 'string') {
            var a = reISO.exec(value);
            if (a)
                return new Date(value);
            a = reMsAjax.exec(value);
            if (a) {
                var b = a[1].split(/[-+,.]/);
                return new Date(b[0] ? +b[0] : 0 - +b[1]);
            }
        }
        return value;
    };

}