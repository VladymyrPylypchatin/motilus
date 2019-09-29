class TimePickerView {
    constructor(id, tabAPI) {
        this._timePicker = document.querySelector(id);
        this._hours = this._timePicker.querySelector('.hours-section .time-picker__number');
        this._minutes = this._timePicker.querySelector('.minutes-section .time-picker__number');
        this._btnNext = this._timePicker.querySelectorAll('.time-picker__next');
        this._btnPrev = this._timePicker.querySelectorAll('.time-picker__prev');
        this._tabAPI = tabAPI;
        this.initEvents();
        this.setDuration();
    }

    initEvents(){
        this._btnNext.forEach((btn) => {
            btn.addEventListener('click', this.nextNumber.bind(this));
        });
        this._btnPrev.forEach((btn) => {
            btn.addEventListener('click', this.prevNumber.bind(this));
        });
    }

    nextNumber(event) {
        const parent = event.currentTarget.parentElement;
        console.log(parent.querySelector('.time-picker__next').classList);
        let currentValue = parent.querySelector('.time-picker__number').innerHTML;
        const step = parent.querySelector('.time-picker__number').getAttribute("data-step");
        this.checkValueBounds(parent, +currentValue + parseInt(step));
        if(!parent.querySelector('.time-picker__next').classList.contains("disabled")){
            parent.querySelector('.time-picker__number').innerHTML = pad(+currentValue + parseInt(step), 2);
            this.setDuration();
        }
    }
    prevNumber(event) {
        const parent = event.currentTarget.parentElement;
        let currentValue = parent.querySelector('.time-picker__number').innerHTML;
        const step = parent.querySelector('.time-picker__number').getAttribute("data-step");
        this.checkValueBounds(parent, +currentValue - parseInt(step));
        if(!parent.querySelector('.time-picker__prev').classList.contains("disabled")){
            parent.querySelector('.time-picker__number').innerHTML = pad(+currentValue - parseInt(step), 2);
            this.setDuration();
        }
    }

    setDuration() {
        const hours = this._hours.innerHTML;
        const minutes = this._minutes.innerHTML;
        const duration = parseInt(hours) * 60 + parseInt(minutes);
        this._tabAPI._serviceDuration = duration;
    }

    checkValueBounds(section, value){
        const max = section.querySelector('.time-picker__number').getAttribute("data-max");
        const min = section.querySelector('.time-picker__number').getAttribute("data-min");
        const nextBtn = section.querySelector('.time-picker__next');
        const prevBtn = section.querySelector('.time-picker__prev');
        if(value > max) {
            nextBtn.classList.add("disabled");
        } else {
            if (nextBtn.classList.contains('disabled')) {
                nextBtn.classList.remove('disabled');
            }
        }
        if(value < min) {
            prevBtn.classList.add("disabled");
        } else {
            if (prevBtn.classList.contains('disabled')) {
                prevBtn.classList.remove('disabled');
            }
        }

    }
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}