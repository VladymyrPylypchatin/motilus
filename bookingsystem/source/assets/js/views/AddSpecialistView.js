class AddSpecialistView {
    constructor(tabElem, tabAPI, specListApi, bookingApi) {
        this.addSpecCardElem = tabElem.querySelector(".add-specialist-form");
        this.triggerElem = tabElem.querySelector(".add-specialist-trigger");
        this.closeBtnElem = tabElem.querySelector(".close");
        this.inputsWrap = tabElem.querySelector(".input-row");
        this.inputs = tabElem.querySelectorAll(".input-row input");
        this.inputValues = 0;
        this.coutInput = 0;
        this.specListApi = specListApi;
        this.bookingAPI = bookingApi;
        this.tabAPI = tabAPI;
        //Input & Button
        this.specIdInput = tabElem.querySelector('input[name=specilistid]');
        this.btn = tabElem.querySelector('#add-specialist-btn');

        this.errors = [];
        this.dataStep();
        this.init();
    }

    dataStep() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].setAttribute('data-step', i);
        }
    }

    init() {
        this.triggerElem.addEventListener("click", this.showSpecCard.bind(this));
        this.closeBtnElem.addEventListener('click', this.hideCard.bind(this));
        this.btn.addEventListener('click', this.btnHandler.bind(this));

        this.inputsWrap.addEventListener('keyup', this.changeInput.bind(this));
        this.inputsWrap.addEventListener('keydown', this.deletinput.bind(this));
        this.inputsWrap.addEventListener('click', this.inputClick.bind(this));
        this.inputsWrap.addEventListener('keydown', this.inputKeyHendler.bind(this));
    }

    inputKeyHendler(e){
        let t = isNaN(e.key);

        if(e.code == 'Space'){
            e.preventDefault();
        }

        if(t && e.key !== 'Backspace'){
            e.preventDefault();
        }

    }


    changeInput(e) {
        if (e.target.value !== '') {
            this.coutInput++;
            if (this.coutInput == this.inputs.length) {
                this.coutInput = this.inputs.length - 1;
            }
            this.inputs[this.coutInput].focus();
        }
    }

    deletinput(e) {
        if (e.key == 'Backspace') {
            if (this.inputs[this.coutInput].value) {
                this.inputs[this.coutInput].value = "";
            } else {
                this.coutInput--;
                if (this.coutInput <= 0) {
                    this.coutInput = 0;
                }
                this.inputs[this.coutInput].focus();
            }
        }
    }

    inputClick(e) {
        this.coutInput = e.target.getAttribute('data-step');
    }

    collector(){
        let code = [];
        for (let i = 0; i < this.inputs.length; i++){
            code.push(this.inputs[i].value);
        }
        this.inputValues = code.join('');
        console.log(this.inputValues);
    }


    showSpecCard() {
        this.addSpecCardElem.classList.remove("hidden");
        this.triggerElem.classList.add("hidden");
        this.specListApi.hideList();

        console.log('showSpecCard');
        this.btn.classList.remove("disabled");
        for (let i = 0; i < this.inputs.length; i++){
            this.inputs[i].value = '';
        }
    }

    hideCard() {
        this.addSpecCardElem.classList.add("hidden");
        this.triggerElem.classList.remove('hidden');
        this.specListApi.showList();
    }

    async validateForm() {
        let errors = [];
        if (Validator.isFiled(this.inputValues)) {
            if (!await Validator.validateSpecId(this.inputValues)) errors.push("Please enter correct id");
        } else {
            errors.push("Please enter the id");
        }

        this.errors = errors;
        return this.errors.length === 0;
    }

    addSpecialistRelations() {
        Messanger.sendMessage("addSpecialistRelation", {specId: this.inputValues});
    }

    finishAdding() {
        this.addSpecCardElem.classList.add("hidden");
        this.triggerElem.classList.remove('hidden');

    }

    async btnHandler() {

        this.collector();

        if (this.bookingAPI._status === "ready") {
            this.btn.classList.add("disabled");

            if (await this.validateForm()) {
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