class TabSelectSpecialist extends Tab {
    constructor(id, title, BookingViewAPI) {
        super(id, title, BookingViewAPI);
        this.selectSpecialistView = new SelectSpecialistView(this._tab, this);
        this.addSpecialistView = new AddSpecialistView(this._tab, this, this.selectSpecialistView, BookingViewAPI);
        this._data = null;
        this._serviceName = null;
        this._listenerActivated = false;
    }

    listen() {
        window.addEventListener("message", async (event) => {
            try {
                if (event.data != null) {
                    this._data = JSON.parse(event.data, JSON.dateParser);
                    switch (this._data.action) {
                        case "SpecialistRelationAdded":
                            console.log('Specialist Relation Added');
                            this.selectSpecialistView.pushSpecialist(this._data.data.specialist);
                            this.selectSpecialistView.renderList();
                            this.addSpecialistView.hideCard();
                            await this._bookingViewAPI.finishLoading();
                            break;
                    }
                }
            }
            catch (e) {
            }
        });
        this._listenerActivated = true;
    }

    run(params) {
        if (!this._listenerActivated) this.listen();
        if (!this._serviceName) {
            this._serviceName = params.service;
            this.selectSpecialistView.setSpecialists(params.specialists);
        }
        this.selectSpecialistView.renderList();
        this.disableBackButton();
        // console.log({this._serviceName});
    }

    selectSpecialist(specId) {
        this._bookingViewAPI.jumpToSlide(1, { service: this._serviceName, specId, enableBackBtn: true });
    }

    actionButtonHandler() {
        this._bookingViewAPI.startLoading();
        // Messanger.sendMessage("setUserAddress", {address: this.selectAddressView._selectedAddress});

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