class TabBookingStaus extends Tab{
    constructor(id, title, BookingViewAPI){
        super(id, title, BookingViewAPI);
        this._data = null;
        this._bookingStausView = new BookingStausView(".booking-status", this);
        this._finalActionStatus = true;
    }
    run(){
        Messanger.sendMessage("finishBooking", {});
        this._bookingStausView.countDown();
        
        window.addEventListener("message", async (event) => {
            try{
                if(event.data != null){
                    this._data = JSON.parse(event.data, JSON.dateParser);
                    switch(this._data.action){                      
                        case "finishBookingStatus":
                            this._bookingStausView.setStatus(this._data.data.status);
                        break;
                    }
                }
            } 
            catch(e){
                console.log("wrong message");
            }
        });
    }

    actionButtonHandler(){
        if(this._finalActionStatus){
            Messanger.sendMessage('finalAction', {});
            this._finalActionStatus = false;
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