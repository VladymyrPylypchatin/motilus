class TabAddCard extends Tab{
    constructor(id, title, BookingViewAPI){
        super(id, title, BookingViewAPI);
        this._data = null;
        this._addCardView = new AddCardView();
    }
    
    run(){
        console.dir("TabAddCard");
        this._addCardView.init();
        window.addEventListener("message", async (event) => {
            try{
                if(event.data != null){
                    this._data = JSON.parse(event.data, JSON.dateParser);
                    switch(this._data.action){                      
                        case "creditCardAdded":
                            this._bookingViewAPI.jumpToSlide(7);
                        break;
                    }
                }
            } 
            catch(e){
                // console.log("wrong message");
            }
        });
    }

    async actionButtonHandler(){
        if(await this._addCardView.submitCard()){
            if(this._addCardView._operationStatus !== "successful"){
                console.dir("cardSendedSuccesfully");
                this._bookingViewAPI.startLoading();
                this.disableButton();
                this._addCardView.sendToken();
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