class TimePickerView {
    constructor(id, tabAPI) {
        this._timePicker = document.querySelector(id);

        this._hours = this._timePicker.querySelector('.hours-section .time-picker__number');
        this._minutes = this._timePicker.querySelector('.minutes-section .time-picker__number');

        this.selectMore = this._timePicker.querySelector('.select_more');
        this.selectSmaller = this._timePicker.querySelector('.select_smaller');

        this.countTime = 0;
        this.timeFormat = 24;

        this._tabAPI = tabAPI;
        this.initEvents();
        this.setDuration();
    }


    initEvents(){
        this.selectMore.addEventListener("click", this.More.bind(this));
        this.selectSmaller.addEventListener("click", this.Smaller.bind(this));
    }



    Smaller(){
        this.countTime--;
        this.selectMore.classList.remove('SmallerNone');
        if(this.countTime % 2 === 0){
            this._hours.innerHTML = pad(this.countTime / 2,2) ;
            this._minutes.innerHTML = "30";
        }else {
            this._minutes.innerHTML = "00";
            if(this.countTime === this.timeFormat * 2 - 1){
                this._hours.innerHTML = pad(this.countTime / 2 - 0.5,2) ;
                this._minutes.innerHTML = "30";
                this.countTime--;
            }
        }

        if(this.countTime <= 0){
            this.countTime = 0;
            this._hours.innerHTML = "00";
            this._minutes.innerHTML = "30";
            this.selectSmaller.classList.add('SmallerNone');
        }

        console.log(this.countTime);
    }

    More(){
        this.countTime++;
        this.selectSmaller.classList.remove('SmallerNone');
        let hours = 0;
        if(this.countTime % 2 === 0){
            if (this.countTime / 2 >= this.timeFormat){
                this._minutes.innerHTML = "00";
            }else {
                this._minutes.innerHTML = "30";
            }
        }else{
            hours = (this.countTime / 2) + 0.5;
            if(hours >= this.timeFormat){
                hours = this.timeFormat;
                this._minutes.innerHTML = "00";
                this.countTime = hours * 2;
                this.selectMore.classList.add('SmallerNone');
            }
            this._hours.innerHTML = pad(hours,2) ;
            this._minutes.innerHTML = "00";
        }
        console.log(this.countTime);
    }


    setDuration() {
        const hours = this._hours.innerHTML;
        const minutes = this._minutes.innerHTML;
        const duration = parseInt(hours) * 60 + parseInt(minutes);
        this._tabAPI._serviceDuration = duration;
    }

}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}