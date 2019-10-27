
class TabAddAddress extends Tab {
    constructor(id, title, BookingViewAPI) {
        super(id, title, BookingViewAPI);
        this._data = null;
        this._registrationView = new AddAddressView("#add-address-form", this);
        this._nav = this._tab.querySelector("#nav-my-address");
        this._nav.addEventListener("click", this.navigationHandler.bind(this));
        this._listenerActivated = false;
        // this.userAddresses = null; 
    }
    run(params) {
        if(!this._listenerActivated) this.listen();
        this._registrationView.setUserAddresses(params.addresses);
    }

    listen() {
        window.addEventListener("message", async (event) => {
            try {
                if (event.data != null) {
                    this._data = JSON.parse(event.data, JSON.dateParser);
                    switch (this._data.action) {
                        case "addressSaved":
                            this._bookingViewAPI.jumpBackToSlide(10);
                            this._registrationView.clearInputs();
                            this.enableButton();
                            break;
                    }
                }
            }
            catch (e) {
                // console.log("wrong message");
            }
        });
        this._listenerActivated = true;
    }

    navigationHandler() {
        if (this._bookingViewAPI._status == "ready") {
            this._bookingViewAPI._status = "proccesing";
            this._bookingViewAPI.jumpBackToSlide(10);
        }
    }
    async actionButtonHandler() {
        if (this._bookingViewAPI._status == "ready") {
            this.disableButton();
            this._registrationView.getData();

            if (await this._registrationView.validateForm()) {
                this._bookingViewAPI.startLoading();
                this._bookingViewAPI._status = "proccesing"
                Messanger.sendMessage("addUserAddress", this._registrationView.getUserInfoObject());

            } else {
                this._bookingViewAPI._status = "proccesing"
                await this._bookingViewAPI._notificator.erraseErorr(this._registrationView._errors);
                this._registrationView._errors = [];
                this._bookingViewAPI._status = "ready"
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