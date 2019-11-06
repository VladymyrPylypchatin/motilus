class SelectSpecialistView {
    constructor(tabElement, tabAPI, addSpecAPI) {
        this.specilistsList = null;
        this._tabElement = tabElement;
        this._tabAPI = tabAPI;
        this.addSpecAPI = addSpecAPI;
        this._selectedSpec = null;
        this._listElement = this._tabElement.querySelector(".specialists-list");
    }
    setSpecialists(specilistsList) {
        this.specilistsList = specilistsList;
    }

    pushSpecialist(spec) {
        if (!this.specilistsList.some(specObj => specObj._id === spec._id)) {
            this.specilistsList.unshift(spec);
        }
    }
    renderList() {
        this._listElement.innerHTML = '';
        this.renderGeneralSpec();
        this.renderBookAnoutherSpec();
        this.specilistsList.forEach((spec) => {
            this.renderSpecialist(spec);
        });

    }
    renderGeneralSpec(){
        let specElem = document.createElement("div");
        specElem.classList.add("boxes-list__item");
        specElem.classList.add("specialist-box");
        specElem.setAttribute("data-spec", 0);
        specElem.innerHTML = `
                            <div class="specialist-box__avatar">
                                <img src="./assets/img/v.png" alt="avatar">
                            </div>
                            <div>
                                <div class="specialist-box__name">Best Available Specialist</div>
                            </div>
        `;
        
        specElem.addEventListener("click", this.specClickHandler.bind(this));
        this._listElement.appendChild(specElem);
    }

    renderBookAnoutherSpec(){
        let specElem = document.createElement("div");
        specElem.classList.add("boxes-list__item");
        specElem.classList.add("specialist-box");
        specElem.setAttribute("data-spec", 0);
        specElem.innerHTML = `
                            <div class="specialist-box__avatar">
                                <img src="./assets/img/v.png" alt="avatar">
                            </div>
                            <div>
                                <div class="specialist-box__name">Book another specialist</div>
                            </div>
        `;
        specElem.addEventListener("click", () => {
            console.log(this.addSpecAPI);
            this._tabAPI.openAddSpecialist();
        });
        this._listElement.appendChild(specElem);
    }

    renderSpecialist(spec) {
        let specElem = document.createElement("div");
        specElem.classList.add("boxes-list__item");
        specElem.classList.add("specialist-box");
        specElem.setAttribute("data-spec", spec._id);
        specElem.innerHTML = `
                            <div class="specialist-box__avatar">
                                <img src="${spec._avatar}" alt="avatar">
                            </div>
                            <div>
                                <div class="specialist-box__name">${spec._name}</div>
                            </div>
        `;
        specElem.addEventListener("click", this.specClickHandler.bind(this));
        this._listElement.appendChild(specElem);
    }

    specClickHandler(event) {
        const specId = event.currentTarget.getAttribute("data-address");
        this._listElement.querySelectorAll('.address-box').forEach(box => box.classList.remove("boxes-list__item_active"));
        event.currentTarget.classList.add("boxes-list__item_active");
        this._selectedSpec = event.currentTarget.getAttribute("data-spec");
        this._tabAPI.selectSpecialist(this._selectedSpec);
    }

    hideList() {
        this._listElement.classList.add("hidden");
    }

    showList() {
        this._listElement.classList.remove('hidden');
    }


}