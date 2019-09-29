class BookingView{
    constructor(){
        this._parrentStatus = "loading";
        this._status = "ready";
        this._userAuthorized = false;
        this._tabList = [
            new TabSelectService("select-service", "Book Online", this),
            new TabServiceDuration("chose-duration", "SERVICE DURATION", this),
            new TabCalendar("chose-datetime", "CHOSE DATE & TIME", this),
            new TabCustomerInfo("customer-info", "CUSTOMER INFORMATION", this),
            new TabNewPassword("new-password", "New Password", this),
            new TabAddCard("add-card", "Payment Method", this),
            new TabSelectAccount("select-account", "Select Account", this),
            new TabBookingStaus("booking-status", "Booking Status", this),
            new TabLogin("login", "Login", this),
            new TabError("booking-error", "Booking Status", this)
        ];
        this._activeTabIndex = 0;
        this._activeTab = this._tabList[0];
        this._nextTab = this._tabList[1];
        this._prevTab = null;
    

        this._notificator = new Notificator(".notification");

        this._titleElem = document.querySelector(".booking-system__title");
        this._mainLoader = document.querySelector(".booking-systme__loader");
        this._stripe = document.querySelector("#stripe");
        // this.init();
    }
    init(){
            this._activeTab.run();
        this.updateTitle();
    }
    
    render(){
        this.updateTitle();
    }
    
    run(){
        if(this.checkStripe()){
            this.render();
            this.listen();
            Messanger.sendMessage("childIsReady", {parentStatus: this._parrentStatus});
        }
    }

    hideLodaer(){
        this._mainLoader.classList.add("hidden");
        console.dir("loader hidded");
    }

    //Preload data of the next slide before animaton
    requestSlideNext(){
       if(this._status == "ready"){
            this._status = "proccesing";
            this._nextTab.run();
            // Messanger.sendMessage("requestSlideNext", {});
        }
    }
    
    async slideNext(params){
        //End loading animation
        await this.finishLoading();

        this._activeTabIndex++;
        //Animation
        this._nextTab.activateRight();
        this._activeTab.disableLeft();

        //Logic
        this._prevTab = this._activeTab;
        this._activeTab = this._nextTab;
        this._nextTab = this._tabList[this._activeTabIndex + 1];
        
        this.updateTitle();
        this._status = "ready"
        this._activeTab.run(params);

        // console.dir(this._activeTab);
        // console.dir(this);
    }

    async jumpToSlide(slideIndex){
        await this.finishLoading();

        this._activeTabIndex = slideIndex;
        //Animation
        this._tabList[this._activeTabIndex].activateRight();
        this._activeTab.disableLeft();

        //Logic
        this._prevTab = this._activeTab;
        this._activeTab = this._tabList[this._activeTabIndex];
        this._nextTab = this._tabList[this._activeTabIndex + 1];
        
        this.updateTitle();
        this._status = "ready"
        this._activeTab.run();
    }

    async jumpBackToSlide(slideIndex){
        await this.finishLoading();

        this._activeTabIndex = slideIndex;
        //Animation
        this._tabList[this._activeTabIndex].activateRight();
        this._activeTab.disableRight();

        //Logic
        this._prevTab = this._activeTab;
        this._activeTab = this._tabList[this._activeTabIndex];
        this._nextTab = this._tabList[this._activeTabIndex + 1];
        
        this.updateTitle();
        this._status = "ready"
        this._activeTab.run();
    }

    updateTitle(){
        this._titleElem.innerHTML = this._activeTab.getTitle();
        console.dir(this._activeTab.getTitle());
    }

    listen(){
        window.addEventListener("message", async (event) => {
            console.dir(event);
            try{
                if(event.data != null){
                    this._data = JSON.parse(event.data, JSON.dateParser);
                    switch(this._data.action){                      
                        case "slideNext":
                            this.slideNext();
                        break;
                        case "requestSlideNext":
                            this.requestSlideNext();
                        break;
                        
                        case "parrentIsLoaded":
			                console.dir("Parent is loaded");
                            if(this._parrentStatus !== "ready"){
                                this._parrentStatus = "ready";
                                this.init();
                                Messanger.sendMessage("childIsReady", {parentStatus: this._parrentStatus});
                            }
                        break;

                        case "userIsAuthorized":
                            this._userAuthorized = true; 
                            this._tabList[5].setUser(this._data.data);   
                            console.log("User is Authorized");
                        break;

                        case "FatalError":
                            this.jumpToSlide(8);
                        break;

                    
                      
                    }
                }
            } 
            catch(e){
                // console.log("wrong message");
            }
        });
    }

    startLoading(){
        this._notificator.activate();
        console.log("loading started");
    }

    async finishLoading(){
        this._notificator.setSuccess();
        await sleep(300);
        this._notificator.diactivate();
        console.log("loading finished");
    }

    checkStripe(){
        if(typeof Stripe == "undefined"){
            console.dir("stripe erorr");
            this._notificator.erraseFatalErorr(["Fatal Erorr", "Please reload the page"]);
            return false;
        }

        return true;
    }

}
