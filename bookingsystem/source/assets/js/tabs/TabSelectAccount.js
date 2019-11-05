class TabSelectAccount extends Tab {
    constructor(id, title, BookingViewAPI) {
        super(id, title, BookingViewAPI);
        this._data = null;
        this._secondaryButton = this._tab.querySelector(".login-as-another");
        this._secondaryButton.addEventListener("click", this.senodaryButtonHandler.bind(this));
        this.isInited = false;
    }
    run() {
        if(!this.isInited) {
            this.listen();
            this.isInited = true;
        }
        this.enableButton();
        this.enableBackButton();
    }

    listen() {
        window.addEventListener("message", async (event) => {
            try {
                if (event.data != null) {
                    this._data = JSON.parse(event.data, JSON.dateParser);
                    switch (this._data.action) {
                        case "customerIsRepeated":
                            console.dir("Confirmed customer is Repeated");
                            this._bookingViewAPI.jumpToSlide(10);
                           // this.disableBackButton();
                            break;
                    }
                }
            }
            catch (e) {
            }
        });
    }

    senodaryButtonHandler() {
        this.disableButton();
       // this.disableBackButton();
        this._bookingViewAPI.jumpToSlide(3);
    }
    actionButtonHandler() {
        console.dir("234234");
        //this._bookingViewAPI.jumpToSlide(6);
        this.disableButton();
        Messanger.sendMessage("repeatedCustomer", {});
    }

    setUser(UserData) {
        console.dir("Set user int Tab Select Account");
        document.querySelector(".select-account .info-box__header").innerHTML = "Hi " + UserData.name + ",";
        document.querySelector(".select-account .info-box__text").innerHTML = "Username: " + "<b>" + UserData.email + "</b>";
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