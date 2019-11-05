class AddSpecialistView {
    constructor(tabElem, tabAPI, specListApi, bookingApi) {
        this.addSpecCardElem = tabElem.querySelector(".add-specialist-form");
        this.triggerElem = tabElem.querySelector(".add-specialist-trigger");
        this.closeBtnElem = tabElem.querySelector(".close");
        this.inputs = tabElem.querySelectorAll(".input-row");
        this.specListApi = specListApi;
        this.bookingAPI = bookingApi;
        this.tabAPI = tabAPI;

        //Input & Button
        this.specIdInput = tabElem.querySelector('input[name=specilistid]');
        this.btn = tabElem.querySelector('#add-specialist-btn');

        this.errors = [];

        this.init();
        console.log(this.inputs);

    }

    init() {
        this.triggerElem.addEventListener("click", this.showSpecCard.bind(this));
        this.closeBtnElem.addEventListener('click', this.hideCard.bind(this));
        this.btn.addEventListener('click', this.btnHandler.bind(this))
    }

    showSpecCard() {
        this.addSpecCardElem.classList.remove("hidden");
        this.triggerElem.classList.add("hidden");
        this.specListApi.hideList();
    }

    hideCard() {
        this.addSpecCardElem.classList.add("hidden");
        this.triggerElem.classList.remove('hidden');
        this.specListApi.showList();
    }

    async validateForm() {
        let errors = [];
        if (Validator.isFiled(this.specIdInput.value)) {
            if (!await Validator.validateSpecId(this.specIdInput.value)) errors.push("Please enter correct id");
        } else {
            errors.push("Please enter the id");
        }

        this.errors = errors;
        return this.errors.length === 0;
    }

    addSpecialistRelations() {
        Messanger.sendMessage("addSpecialistRelation", {specId: this.specIdInput.value});
    }

    finishAdding() {
        this.addSpecCardElem.classList.add("hidden");
        this.triggerElem.classList.remove('hidden');

    }

    async btnHandler() {
        if(this.bookingAPI._status === "ready"){
            this.btn.classList.add("disabled");

            if(await this.validateForm()){
                // this.disableButton();
                this.bookingAPI.startLoading();
                this.addSpecialistRelations();
                // this._loginView.login();
            } else {
                await this.bookingAPI._notificator.erraseErorr(this.errors);
                this.errors = [];
                this.btn.classList.remove("disabled")
            }
        }
    }
}