class Tab{
    constructor(id, title, BookingViewAPI){
        this._id = id;
        this._isActive = false;
        this._title = title;
        this._tab = document.querySelector(`#${this._id}`);
        this._bookingViewAPI = BookingViewAPI;
        this._actionButton = this._tab.querySelector(".next-button");
        this.init();
        // console.dir(this);
    }

    init(){
        //Setting event for 
        var transitionEvent = whichTransitionEvent();
        transitionEvent && this._tab.addEventListener(transitionEvent, function() {
            this.classList.remove("animation");
        });

        if(this._actionButton !== null){
            this._actionButton.addEventListener("click", this.actionButtonHandler.bind(this));
        }
    }
    
    // Getters and Setters
    getTitle(){
        return this._title;
    }
    
    activateRight(){
        this._tab.classList.add("animate");
        this._tab.classList.remove("isRHS");
        this._tab.classList.remove("isLHS");
        this._tab.classList.remove("isInactive");
        this._tab.classList.add("isActive");
    }
    disableLeft(){
        this._tab.classList.add("animate");
        this._tab.classList.add("isLHS");
        this._tab.classList.add("isInactive");
        this._tab.classList.remove("isActive");
    }
    disableRight(){
        this._tab.classList.add("animate");
        this._tab.classList.add("isRHS");
        this._tab.classList.add("isInactive");
        this._tab.classList.remove("isActive");
    }

    showButton(){
        this._actionButton.classList.remove("hidden");
    }
    
    hideButton(){
        this._actionButton.classList.add("hidden");
    }

    disableButton(){
        this._actionButton.classList.add("disabled");
    }

    enableButton(){
        this._actionButton.classList.remove("disabled");
    }

    actionButtonHandler(){

    }

    render(){
    
    }

    loading(){
        this._actionButton.classList.add("disabled");
    }
}

function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}