class BookingStausView{
    constructor(bookinStatusSelector, tabAPI){
        this._tabAPI = tabAPI;
        this._data = null;
        this._fired = false;
        this._status = null;
        this._bookingStatusBox = document.querySelector(bookinStatusSelector);
        this._image = this._bookingStatusBox.querySelector(".booking-status__image .content");
        this._header = this._bookingStatusBox.querySelector(".booking-status__header");
        this._text = this._bookingStatusBox.querySelector(".booking-status__text");
        // this._getBackBtn = document.querySelector('#back-to-home-btn');
    }
    
    async countDown(){
        let str = "pleas weight shile your booking being placed";
        for(let i = 4; i >= 0; i--){
            // console.dir(this._image);
            this._image.innerHTML = i;
            await sleep(1000);
        }
        this._fired = true;
        this.changeState();
    }

    setStatus(status){
        this._status = status;
        //if conutdown finished automaticaly set state
        if(this._fired) this.changeState();
    }

    changeState(){
        if(this._status == "success") this.bookingConfirmed();
        if(this._status == "success_asap") this.bookingConfirmedASAP();
        if(this._status == "error") this.bookingRejected();
        this._tabAPI.showButton(); 
    }

    bookingConfirmed(){
        this._bookingStatusBox.classList.add("success");
        this._image.innerHTML = `
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve">
                       <g>
                           <path d="M38.252,15.336l-15.369,17.29l-9.259-7.407c-0.43-0.345-1.061-0.274-1.405,0.156c-0.345,0.432-0.275,1.061,0.156,1.406
                               l10,8C22.559,34.928,22.78,35,23,35c0.276,0,0.551-0.114,0.748-0.336l16-18c0.367-0.412,0.33-1.045-0.083-1.411
                               C39.251,14.885,38.62,14.922,38.252,15.336z"></path>
                       </g>
                   </svg>
        `;
        this._header.innerHTML = "CONFIRMED";
        this._text.innerHTML = "You will receive a text message confirming your appointment.";
    }
    bookingConfirmedASAP(){
        this._image.innerHTML = `
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve">
                       <g>
                           <path d="M38.252,15.336l-15.369,17.29l-9.259-7.407c-0.43-0.345-1.061-0.274-1.405,0.156c-0.345,0.432-0.275,1.061,0.156,1.406
                               l10,8C22.559,34.928,22.78,35,23,35c0.276,0,0.551-0.114,0.748-0.336l16-18c0.367-0.412,0.33-1.045-0.083-1.411
                               C39.251,14.885,38.62,14.922,38.252,15.336z"></path>
                       </g>
                   </svg>
        `;
        this._header.innerHTML = "YOUR BOOKING HAS BEEN SUBMITTED";
        this._text.innerHTML = "You will receive an email when your specialist is assigned.";
    }
    bookingRejected(){
        this._bookingStatusBox.classList.add("error");
        this._image.innerHTML = `
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g>
                    <g>
                        <path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249
                            C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306
                            C514.019,27.23,514.019,14.135,505.943,6.058z"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636
                            c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/>
                    </g>
                </g>
            </svg>
        `;
        this._header.innerHTML = "SERVICE NOT BOOKED";
        this._text.innerHTML = "Oops.. something went wrong with your booking. Please try again. We apologize for the inconvenience.";
    }

}

