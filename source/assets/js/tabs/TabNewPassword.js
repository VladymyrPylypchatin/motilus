class TabNewPassword extends Tab{
    constructor(id, title, BookingViewAPI){
        super(id, title, BookingViewAPI);
        this._data = null;
        this._newPasswordView = new NewPasswordView("#new-password-form");
    }
    
    run(){
        console.dir("TabNewPassword");
        window.addEventListener("message", async (event) => {
            try{
                if(event.data != null){
                    this._data = JSON.parse(event.data, JSON.dateParser);
                    switch(this._data.action){                      
                        case "userPasswordSeted":
                            console.dir("passwordSeted");
                            this._bookingViewAPI.slideNext(); 
                        break;
                    }
                }
            } 
            catch(e){
                // console.log("wrong message");
            }
        });
    }

    actionButtonHandler(){
        if(this._bookingViewAPI._status == "ready"){
            this._newPasswordView.getData();
            if(this._newPasswordView.validateForm()){
                this.disableButton();
                this._bookingViewAPI._status == "proccesing"

                this._newPasswordView.clearInputs();
                this._newPasswordView.setUserPassword();
            } else {
                this._bookingViewAPI._notificator.erraseErorr(this._newPasswordView._errors);
                this._newPasswordView._errors = [];
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