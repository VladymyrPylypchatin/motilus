class Tab {
    constructor(id, title, BookingViewAPI) {
        this._id = id;
        this._isActive = false;
        this._title = title;
        this._tab = document.querySelector(`#${this._id}`);
        this._bookingViewAPI = BookingViewAPI;
        this._actionButton = this._tab.querySelector(".next-button");
        this._interactiveElements = this._tab.querySelectorAll("input, a, button, .tabable");
        this.init();
        // console.dir(this);
    }

    init() {
        //Setting event for 
        var transitionEvent = whichTransitionEvent();
        transitionEvent && this._tab.addEventListener(transitionEvent, function () {
            this.classList.remove("animation");
        });

        if (this._actionButton !== null) {
            this._actionButton.addEventListener("click", this.actionButtonHandler.bind(this));
        }


        this._interactiveElements.forEach(elemnet => {
            if (elemnet.tagName !== "BUTTON" && elemnet.tagName !== "INPUT")
            elemnet.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                  event.preventDefault();
                  elemnet.click();
                }
              });
        });

        this.disableTabActions();
    }

    // Getters and Setters
    getTitle() {
        return this._title;
    }

    activateRight() {
        this._tab.classList.add("animate");
        this._tab.classList.remove("isRHS");
        this._tab.classList.remove("isLHS");
        this._tab.classList.remove("isInactive");
        this._tab.classList.add("isActive");
        // this._bookingViewAPI.slideBackBtn.onclick = this.backButtonHandler.bind(this);
        
        this.activateTab();
    }

    disableLeft() {
        this.disableTabActions();
        this._tab.classList.add("animate");
        this._tab.classList.add("isLHS");
        this._tab.classList.add("isInactive");
        this._tab.classList.remove("isActive");
    }

    disableRight() {
        this.disableTabActions();
        this._tab.classList.add("animate");
        this._tab.classList.add("isRHS");
        this._tab.classList.add("isInactive");
        this._tab.classList.remove("isActive");
    }

    deactivate() {
        this.disableTabActions();
        this._tab.classList.remove("animate");
        this._tab.classList.remove("isLHS");
        this._tab.classList.remove("isActive");
        this._tab.classList.add("isRHS");
        this._tab.classList.add("isInactive");
    }

    showButton() {
        this._actionButton.classList.remove("hidden");
        this._actionButton.setAttribute('tabindex', '0');
    }

    hideButton() {
        this._actionButton.setAttribute('tabindex', '-1');
        this._actionButton.classList.add("hidden");
    }

    disableButton() {
        this._actionButton.setAttribute('tabindex', '-1');
        this._actionButton.classList.add("disabled");
    }

    enableButton() {
        this._actionButton.classList.remove("disabled");
        this._actionButton.setAttribute('tabindex', '0');
    }

    enableBackButton() {
        this._bookingViewAPI.slideBackBtn.classList.remove("disable");
    }

    disableBackButton() {
        this._bookingViewAPI.slideBackBtn.classList.add("disable");
    }

    backButtonHandler() {

    }

    actionButtonHandler() {

    }

    render() {

    }

    loading() {
        this._actionButton.classList.add("disabled");
    }

    activateTab() {
        this.enableTabActions();
    }

    deactivateTab() {

    }

    enableTabActions() {
        console.log("tabable elements");
        this._interactiveElements.forEach(element => {
            if(!element.classList.contains('disabled') && !element.classList.contains('hidden'))
                element.setAttribute('tabindex', '0');
            console.log(element);
        });
    }

    disableTabActions() {
        console.log("disable tabable elements");
        this._interactiveElements.forEach(element => {
            element.blur();
            element.setAttribute('tabindex', '-1');
            console.log(element);
        });
    }
}

function whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    }

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}