class TabSelectService extends Tab{
    constructor(id, title, BookingViewAPI){
        super(id, title, BookingViewAPI);
    
        this._service = new ServiceView(".service-list", this);
    }
    
    listen(){
        window.addEventListener("message", async (event) => {
            try{
                if(event.data != null){
                    this._data = JSON.parse(event.data, JSON.dateParser);
                    switch(this._data.action){                      
                        case "preSelectedService":
                            console.log("PreSelectedService");
                            this._service.setServiceList(this._data.data);
                            this.preSelectService();
                        break;
                        case "servicesList":
                            console.dir(this._data.data);
                            this._service.setServiceList(this._data.data);
                            this._service.renderServiceList();
                            this._bookingViewAPI.hideLodaer();
                        break;
                    }
                }
            } 
            catch(e){
                // console.log("wrong message");
            }
        });
    }

   
    actionButtonHandler(service){
        if(this._bookingViewAPI._status == "ready"){
            this._bookingViewAPI.requestSlideNext();
            this._bookingViewAPI.startLoading();
            Messanger.sendMessage("selectService", {serviceName: service});
        }
    }
    
    preSelectService(){
        let serviceName = this._service._serviceList[0].serviceName;
        this._bookingViewAPI.requestSlideNext();
        Messanger.sendMessage("selectService", {serviceName});
    }
  
    run(){
        this.listen();
        Messanger.sendMessage("getServices", {});
        Messanger.sendMessage("getServiceFromURL", {});
    }
}

