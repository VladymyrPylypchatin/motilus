class TabCalendar extends Tab{
    constructor(id, title, BookingViewAPI){
        super(id, title, BookingViewAPI);
        this._data = null;
        this._calendarView = new CalendarView("booking-calendar", this);
        
    }
    
    eventsBinding(){
    }
    
    clickedButton(){
    }

    run(){
        console.dir("TabCallendar");
        window.addEventListener("message", async (event) => {
            try{
                if(event.data != null){
                    this._data = JSON.parse(event.data, JSON.dateParser);
                    switch(this._data.action){                      
                        case "render":
                            this._calendarView.initData(this._data.data);
                            this._calendarView.render();
                        break;
                        
                        case "renderScheduale":
                            this._calendarView.initData(this._data.data);
                            this._calendarView.renderTimeSlots();
                        break;
                            
                        case "selectTime": 
                        break;
                            
                        case "unselectTime": 
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
            this._bookingViewAPI._status == "proccesing"
            this._bookingViewAPI.startLoading();
            this.disableButton();

            if(this._bookingViewAPI._userAuthorized){
                this._bookingViewAPI.jumpToSlide(5);
            } else {
                this._bookingViewAPI.slideNext();
            }
        }
        // if(this._bookingViewAPI._status == "ready"){
            // Messanger.sendMessage("selectService", {serviceName: "Travel Planner"});
        // }
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