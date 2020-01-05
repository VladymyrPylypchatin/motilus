class TabServiceDuration extends Tab {
    constructor(id, title, BookingViewAPI) {
        super(id, title, BookingViewAPI);
        this._args = null;
        this._serviceDuration = 1;
        this._timePickerView = new TimePickerView("#duration-time-picker", this);
        this.isInited = false;
    }

    run(args) {
        if( !this.isInited) {
            this.listen();
            this.isInited = true;
        }
        if(args) this._args = args;
        console.dir("TabServiceDuration");
        this.enableBackButton();
    }

    listen() {
        window.addEventListener("message", async (event) => {
            try {
                if (event.data != null) {
                    this._data = JSON.parse(event.data, JSON.dateParser);
                    switch (this._data.action) {
                        // case "userPasswordSeted":
                        //     console.dir("passwordSeted");
                        //     this._bookingViewAPI.slideNext(); 
                        // break;
                    }
                }
            }
            catch (e) {
                // console.log("wrong message");
            }
        });
    }

    actionButtonHandler() {
        if (this._bookingViewAPI._status == "ready") {
            this._bookingViewAPI.requestSlideNext({enableBackBtn: this._args.enableBackBtn});
            this._bookingViewAPI.startLoading();
            Messanger.sendMessage("selectService", { 
                serviceName: this._args.service, 
                serviceDuration: this._serviceDuration,
                specialist: this._args.specId
            });
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