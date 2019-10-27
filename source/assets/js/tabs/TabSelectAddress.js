class TabSelectAddress extends Tab {
    constructor(id, title, BookingViewAPI) {
        super(id, title, BookingViewAPI);
        this.selectAddressView = new SelectAddressView(this._tab, this);
        this._data = null;
        this._nav = this._tab.querySelector("#nav-add-address");
        this._nav.addEventListener("click", this.navigationHandler.bind(this));
        this._listenerActivated = false;
    }

    listen() {
        window.addEventListener("message", async (event) => {
            try {
                if (event.data != null) {
                    this._data = JSON.parse(event.data, JSON.dateParser);
                    switch (this._data.action) {
                        case "setUserAddresses": {
                            console.dir(this._data.data.addresses);
                            this.selectAddressView.setAddressesData(this._data.data.addresses);
                            this.selectAddressView.onAddressDelete(this.deleteAddressHandler);
                            this.selectAddressView.renderList();
                        }
                        break;

                        case "addressSeted": {
                            console.dir("addressSetd");
                            this._bookingViewAPI.jumpToSlide(7);
                        }
                        break;
                    }
                }
            }
            catch (e) {
            }
        });
        this._listenerActivated = true;
    }
    run() {
        if(!this._listenerActivated) this.listen();
        Messanger.sendMessage("getUserAdresses", {});
    }

    deleteAddressHandler(id) {
        Messanger.sendMessage("deleteAddress", {addressId: id});
        console.log("Delete Address Message");
    }

    navigationHandler() {
        if (this._bookingViewAPI._status == "ready") {
            this._bookingViewAPI._status = "proccesing";
            this._bookingViewAPI.jumpToSlide(11, {addresses: this.selectAddressView._addressesData});
            this.hideButton();
        }
    }

    actionButtonHandler() {
        this.disableButton();
        this._bookingViewAPI.startLoading();
        Messanger.sendMessage("setUserAddress", {address: this.selectAddressView._selectedAddress});
        
        // this._bookingViewAPI.jumpToSlide(7);
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