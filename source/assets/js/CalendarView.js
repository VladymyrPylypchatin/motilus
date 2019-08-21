
class CalendarView{
    constructor(calenadrID, tabAPI){
        this._avalibleTimeSlots = [];
        this._selectedDate = null;
        this._weekDays = [];
        this._tabAPI = tabAPI;

        this._calendar = document.querySelector(`#${calenadrID}`);
        this._weekBegin = this._calendar.querySelector(".week-begin");
        this._weekEnd = this._calendar.querySelector(".week-end");
        this._prevWeek = this._calendar.querySelector(".prev-week");
        this._nextWeek = this._calendar.querySelector(".next-week");
        this._datesList = this._calendar.querySelectorAll(".dates-list li div");
        
        //Timslots part
        this._timeSlotContainer = this._calendar.querySelector(".calendar__avalible-timeslots");
        this._timeSlotContainerMorning = this._timeSlotContainer.querySelector(".morning .slots");
        this._timeSlotContainerDay = this._timeSlotContainer.querySelector(".day .slots");
        this._timeSlotContainerEvening = this._timeSlotContainer.querySelector(".evening .slots");
        this._avalibelity = this._calendar.querySelector(".no-avalible-slots");
        this._preloader = this._calendar.querySelector(".callendar-preloader")
        
        //Selected timeslot
        this._selectedTimeSlot = this._calendar.querySelector(".callendar__selected-time");
        this._selectedTimeSlotCnageBtn = this._selectedTimeSlot.querySelector(".change");

        this.initEventListeners();

        this.startPreloader();
    }
    initData(CalendarObject){
        this._avalibleTimeSlots = CalendarObject.avalibleTimeSlots;
        this._selectedDate = CalendarObject.selectedDate;
        this._weekBounds = CalendarObject.weekBounds;
        this._weekDays = CalendarObject.weekDays;
    }
    render(){
        this.renderDates();
        this.renderTimeSlots();
    }

    renderDates(){
        this._weekBegin.innerHTML = this._weekBounds.firstDayStr;
        this._weekEnd.innerHTML = this._weekBounds.lastDayStr;

        this._datesList.forEach((element, i) => {
            element.innerHTML = this._weekDays[i].getDate();
            element.setAttribute("data-date", this._weekDays[i]);
            if(this._weekDays[i].getDate() == this._selectedDate.getDate()) element.parentElement.classList.add("active");
        });
    }

    renderTimeSlots(){
        console.log(213);
        this.stopPreloader();
        this._timeSlotContainerMorning.innerHTML = "";
        this._timeSlotContainerDay.innerHTML = "";
        this._timeSlotContainerEvening.innerHTML = "";
        let self = this;
        
        //time points
        let currentDate = (new Date());
       
        
        let counter = 0;
        this._avalibleTimeSlots.forEach((element) =>{
            if(element.timeSpan > currentDate){
                counter++;
                let timeSlot = document.createElement("div");
                timeSlot.classList.add("calendar__timeslot");
                timeSlot.innerHTML = toPeriodFormat(element.timeSpan);
                timeSlot.setAttribute("data-date", element.timeSpan);
                timeSlot.setAttribute("data-agent-id", element.agentId);
                timeSlot.addEventListener("click", self.selectTimeSlot.bind(self));
                
                console.log(element.timeSpan.getHours());
                if(element.timeSpan.getHours() < 12){
                    this._timeSlotContainerMorning.appendChild(timeSlot);
                }
                if(element.timeSpan.getHours() >= 12 && element.timeSpan.getHours() <= 17){
                    this._timeSlotContainerDay.appendChild(timeSlot);
                }
                if(element.timeSpan.getHours() > 17){
                    this._timeSlotContainerEvening.appendChild(timeSlot);
                }
                
                // this._timeSlotContainer.appendChild(timeSlot);
            }
        });
        if(counter == 0){
            this._timeSlotContainer.classList.add("hidden");
            this._avalibelity.classList.remove("hidden");
        }
    }

    //init event listenter
    initEventListeners(){
        let self = this;
        this._prevWeek.addEventListener("click", this.prevWeek.bind(this));
        this._nextWeek.addEventListener("click", this.nextWeek.bind(this));
        this._datesList.forEach((element)=>{
            element.addEventListener("click", self.selectDate.bind(self));
        });

        this._selectedTimeSlotCnageBtn.addEventListener("click", this.unselectTimeSlot.bind(this));
    }

    //Events Hendlers
    selectTimeSlot(event){
        if(event.target.classList.contains("active")){
            // event.target.classList.remove("active");
            Messanger.sendMessage("unselectTimeSlot", {});
            this._tabAPI.hideButton();
        } else {
            let elems = this._timeSlotContainer.querySelectorAll(".active");

            // [].forEach.call(elems, function(el) {
            //     el.classList.remove("active");
            // });
            // event.target.classList.add("active");

            let timeSlot = event.target.getAttribute("data-date");
            let agentId = event.target.getAttribute("data-agent-id");
            Messanger.sendMessage("selectTimeSlot", {timeSlot, agentId});

            this._selectedTimeSlot.querySelector(".time").innerHTML = getDayPart(new Date(timeSlot)) + " " + toPeriodFormat(new Date(timeSlot));
                
            this.hideTimeSlots();

            
            this.showSelectedTimeBlock();
            
            console.dir(this._tabAPI);
            this._tabAPI.showButton();
        }
    }

    unselectTimeSlot(){
        Messanger.sendMessage("unselectTimeSlot", {});
        this._tabAPI.hideButton();
        this.hideSelectedTimeBlock();
        let self = this;
        setTimeout(()=>{
            self.showTimeSlots();
        }, 500)
    }


    prevWeek(){
        Messanger.sendMessage("subDays", {count: 7});
        this.hideSelectedTimeBlock();
        this._tabAPI.hideButton();
        this.startPreloader();
    }
    nextWeek(){
        Messanger.sendMessage("addDays", {count: 7});
        this.hideSelectedTimeBlock();
        this._tabAPI.hideButton();
        this.startPreloader();
    }
    selectDate(){
        if(!event.target.parentElement.classList.contains("active")){
            this._calendar.querySelector(".dates-list .active").classList.remove("active");
            event.target.parentElement.classList.add("active");

            let date = event.target.getAttribute("data-date");
            Messanger.sendMessage("selectDate", {date});

            //Hide button
            this.hideSelectedTimeBlock();
            this._tabAPI.hideButton();

            this.startPreloader();
        }
    }

    startPreloader(){
        this._timeSlotContainer.classList.add("hidden");
        this._avalibelity.classList.add("hidden");
        this._preloader.classList.remove("hidden");
    }
    stopPreloader(){
        this._timeSlotContainer.classList.remove("hidden");
        this._preloader.classList.add("hidden");
    }

    hideTimeSlots(){
        this._timeSlotContainer.classList.add("hidden");
    }

    showTimeSlots(){
        this._timeSlotContainer.classList.remove("hidden");
    }

    hideSelectedTimeBlock(){
        let self = this;
        this._selectedTimeSlot.classList.add("visualy-hidden");
        
        setTimeout(()=>{
            self._selectedTimeSlot.classList.add("hidden");
        }, 300);
    }

    showSelectedTimeBlock(){
        let self = this;
        self._selectedTimeSlot.classList.remove("hidden");
        setTimeout(()=>{
            this._selectedTimeSlot.classList.remove("visualy-hidden");
        }, 300);
    }
}

function toPeriodFormat(date) {
    var hours = date.getHours(),
    minutes = date.getMinutes(),
    ampm = hours >= 12 ? 'pm' : 'am';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    console.log("US TIme");
    console.log(strTime);
    return strTime;
  }

  function getDayPart(date){
    if(date.getHours() < 12){
        return "Morning";
    }
    if(date.getHours() >= 12 && date.getHours() <= 17){
        return "Afternoon";
    }
    if(date.getHours() > 17){
        return "Evening";
    }
  }