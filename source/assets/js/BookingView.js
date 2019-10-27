class BookingView{
    constructor(){
        this._parrentStatus = "loading";
        this._status = "ready";
        this._userAuthorized = false;
        this._tabList = [
            new TabSelectService("select-service", "Book Online", this), //0
            new TabServiceDuration("chose-duration", "Choose Your Service Duration", this), //1
            new TabCalendar("chose-datetime", "Choose a Date & Time that Works for You", this), //2
            new TabCustomerInfo("customer-info", "CUSTOMER INFORMATION", this), //3
            new TabNewPassword("new-password", "New Password", this), //4
            new TabAddCard("add-card", "Payment Method", this), //add card //5
            new TabSelectAccount("select-account", "Select Account", this), //6
            new TabBookingStaus("booking-status", "Booking Status", this), //7
            new TabLogin("login", "Login", this), //8
            new TabError("booking-error", "Booking Status", this), //9
            new TabSelectAddress("select-address", "Choose Your Service Address", this), //10
            new TabAddAddress("add-address", "Add new address for service", this), //11
            new TabSelectSpecialist("chose-specialist", "Select Your Specialist", this), //12

        ];
        this._activeTabIndex = 0;
        this._activeTab = this._tabList[0];
        this._nextTab = this._tabList[1];
        this._prevTab = null;
        //Navigation
        this.slideBackBtn = document.querySelector(".booking-system__back-btn");
        this.slideBackBtn.addEventListener("click", this.slideBack.bind(this));
        this.navHistory = [];

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
    requestSlideNext(props){
       if(this._status == "ready"){
            this._status = "proccesing";
            this._nextTab.preRun(props);
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
        this.navHistory.push(this._prevTab);
        // console.dir(this._activeTab);
        // console.dir(this);
    }

    async deactivateSlide(slideIndex) {
        const tab = this._tabList[slideIndex];
        await tab.deactivate();
        console.log("Slide deactivated");
    }

    async jumpToSlide(slideIndex, params){
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
        this._activeTab.run(params);
        this.navHistory.push(this._prevTab);
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
        this.navHistory.push(this._prevTab);
    }

    async slideBack() {
        console.dir(this.navHistory);
        if(this.navHistory.length != 1) {
            const prevTab = this.navHistory.pop();
            
            this._activeTab.disableRight();
            prevTab.activateRight();
            
            this._nextTab = this._activeTab;
            this._activeTab = prevTab;
            this.updateTitle();
            prevTab.run();
            console.log("run");
        } else {
            this.closeBookingSystem();
            this._activeTab.disableBackButton();
        }

 


    }

    closeBookingSystem() {
        Messanger.sendMessage("closeBookingSystem", {});
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
                            this._tabList[6].setUser(this._data.data);   
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
