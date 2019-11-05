class TimePickerView {
    constructor(id, tabAPI) {
        this._timePicker = document.querySelector(id);
        this.minMinutes = 30;
        this.state = {
            hours: 0,
            minutes: 30,
        }

        this._hours = this._timePicker.querySelector('.hours-section .time-picker__number');
        this._minutes = this._timePicker.querySelector('.minutes-section .time-picker__number');

        this.btnNextHours = this._timePicker.querySelector('.hours-section .time-picker__next');
        this.btnPrevHours = this._timePicker.querySelector('.hours-section .time-picker__prev');

        this.btnNextMinutes = this._timePicker.querySelector('.minutes-section .time-picker__next');
        this.btnPrevMinutes = this._timePicker.querySelector('.minutes-section .time-picker__prev');
        this._tabAPI = tabAPI;
        this.initEvents();
        // this.setDuration();
        this.render();
        this.setDuration();
    }

    render() {
        console.log(this.state);
        this._hours.innerHTML =  pad(this.state.hours, 2);
        this._minutes.innerHTML =  pad(this.state.minutes, 2);
        
        if(this.state.minutes == 30) {
            TimePickerView.deactivateControl(this.btnNextMinutes);
        } else {
            TimePickerView.activateControl(this.btnNextMinutes);
        }

        if(this.state.minutes == 0) {
            TimePickerView.deactivateControl(this.btnPrevMinutes);
        } else {
            TimePickerView.activateControl(this.btnPrevMinutes);
        }

        if(this.state.hours > 1) {
            TimePickerView.activateControl(this.btnPrevHours);
        } else {
            TimePickerView.deactivateControl(this.btnPrevHours);
        }

        if( this.state.hours >= 8) {
            TimePickerView.deactivateControl(this.btnNextHours);
        } else {
            TimePickerView.activateControl(this.btnNextHours);
        }

        if(this.state.hours == 1 && this.state.minutes == 30) {
            TimePickerView.activateControl(this.btnPrevHours);
        }



        if(this.getMinutes() <= 30) {
            TimePickerView.deactivateControl(this.btnPrevHours);
            TimePickerView.deactivateControl(this.btnPrevMinutes);
        }



    }

    static deactivateControl(control) {
        control.classList.add("disabled");
    }
    static activateControl(control) {
        control.classList.remove("disabled");
    }

    getMinutes() {
        return this.state.hours * 60 + this.state.minutes;
    }

    addTime(pointer, value) {
        this.state[pointer] += value;
        this.render();
        this.setDuration();
    }
    subTime(pointer, value) {
        this.state[pointer] -= value;
        this.render();
        this.setDuration();
    }

    initEvents(){
        let self = this;
        this.btnNextHours.addEventListener("click", () => self.addTime("hours", 1));
        this.btnNextMinutes.addEventListener("click", () => self.addTime("minutes", 30));

        this.btnPrevHours.addEventListener("click", () => self.subTime("hours", 1));
        this.btnPrevMinutes.addEventListener("click", () => self.subTime("minutes", 30));
        // this._btnPrev.forEach((btn) => {
            // btn.addEventListener('click', this.prevNumber.bind(this));
        // });
    }

    // nextNumber(event) {
    //     const parent = event.currentTarget.parentElement;
    //     console.log(parent.querySelector('.time-picker__next').classList);
    //     let currentValue = parent.querySelector('.time-picker__number').innerHTML;
    //     const step = parent.querySelector('.time-picker__number').getAttribute("data-step");
    //     if(!parent.querySelector('.time-picker__next').classList.contains("disabled")){
    //         parent.querySelector('.time-picker__number').innerHTML = pad(+currentValue + parseInt(step), 2);
    //         this.setDuration();
    //     }
    //     this.checkValueBounds(parent, +currentValue + parseInt(step));
    // }
    // prevNumber(event) {
    //     const parent = event.currentTarget.parentElement;
    //     let currentValue = parent.querySelector('.time-picker__number').innerHTML;
    //     const step = parent.querySelector('.time-picker__number').getAttribute("data-step");
    //     if(!parent.querySelector('.time-picker__prev').classList.contains("disabled")){
    //         parent.querySelector('.time-picker__number').innerHTML = pad(+currentValue - parseInt(step), 2);
    //         this.setDuration();
    //     }
    //     this.checkValueBounds(parent, +currentValue - parseInt(step));
    // }

    setDuration() {
        const hours = this.state.hours;
        const minutes = this.state.minutes;
        const duration = parseInt(hours) * 60 + parseInt(minutes);
        this._tabAPI._serviceDuration = duration;
    }

    // checkValueBounds(section, value){
    //     const max = section.querySelector('.time-picker__number').getAttribute("data-max");
    //     const min = section.querySelector('.time-picker__number').getAttribute("data-min");
    //     const nextBtn = section.querySelector('.time-picker__next');
    //     const prevBtn = section.querySelector('.time-picker__prev');
    //     if(value >= max) {
    //         nextBtn.classList.add("disabled");
    //     } else {
    //         if (nextBtn.classList.contains('disabled')) {
    //             nextBtn.classList.remove('disabled');
    //         }
    //     }
    //     if(value <= min) {
    //         prevBtn.classList.add("disabled");
    //     } else {
    //         if (prevBtn.classList.contains('disabled')) {
    //             prevBtn.classList.remove('disabled');
    //         }
    //     }

    // }
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}