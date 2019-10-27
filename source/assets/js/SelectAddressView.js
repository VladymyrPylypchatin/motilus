class SelectAddressView {
    constructor(tabElement, tabAPI) {
        this._addressesData = null;
        this._tabElement = tabElement;
        this._tabAPI = tabAPI;
        this._selectedAddress = null;
        this._listElement = this._tabElement.querySelector(".addresses-list");
        this.onAddressDeleteHandler = () => {};
        // this.devHelper();
    }

    onAddressDelete(handler) {
        this.onAddressDeleteHandler = handler;
    }

    devHelper() {
        this._addressesData = [
            {city: "Miami", state: "Florida", address: "Coconut Grove Apt 24", zip: "32003", _id: "23"},
            {city: "Miami", state: "Florida", address: "Coconut Grove Apt 24", zip: "32003", _id: "233"},
            {city: "Miami", state: "Florida", address: "Coconut Grove Apt 24", zip: "32003", _id: "235"},
        ];
        this.renderList();
        document.querySelectorAll('.address-box').forEach(box => {
            box.addEventListener("click", this.addressClickHandler.bind(this));
        });
    }

    setAddressesData(addresses) {
        this._addressesData = addresses;
    }

    renderList() {
        this._listElement.innerHTML = '';
        this._addressesData.forEach((address, index) => {
            console.log(address, index);
            this.renderAddress(address, index);
        });
    }

    renderAddress(address, id) {
        let addressElem = document.createElement("div");
        addressElem.classList.add("boxes-list__item");
        addressElem.classList.add("address-box");
        addressElem.classList.add("tabable");
        addressElem.setAttribute("data-address", id);
        addressElem.innerHTML = `
        <div>
            <div class="address-box__first-line">${address.address}</div>
            <div class="address-box__second-line">${address.city}, ${address.state} ${address.zip}</div>
        </div>
        <div class="unselect">Change</div>
        <div class="remove ${this._addressesData.length == 1 ? 'disabled' : '' }" data-id="${address._id}">
            <object type="image/svg+xml" item-prop="image" id="svgImage" data="./assets/img/delete.svg"></object>
        </div>
        <div class="remove-spiner">
            <img src="./assets/img/spiner.svg" />
        </div>
        `;
        addressElem.addEventListener("click", this.addressClickHandler.bind(this));
        console.dir("Unselect");
        console.dir(addressElem.querySelector('.unselect'));
        addressElem.querySelector('.unselect').addEventListener("click", this.changeAddressHandler.bind(this), true);
        addressElem.querySelector('.remove').addEventListener("click", this.deleteAddressHandler.bind(this), true);
        this._listElement.appendChild(addressElem);
    }

    addressClickHandler(event) {
        const addressIndex = event.currentTarget.getAttribute("data-address");
        this._listElement.querySelectorAll('.address-box').forEach(box => box.classList.remove("address-box__active"));
        event.currentTarget.classList.add("address-box__active");
        //Todo uncoment before prod
        this._selectedAddress = this._addressesData[addressIndex];
        this.hideUnselectedAddresses();
        this._tabAPI.showButton();
    }

    changeAddressHandler(event) {
        event.stopPropagation()
        console.log("change address");
        this._tabAPI.hideButton();
        setTimeout(() => {
            this.showAllAdresses();
        }, 400);
    }

    deleteAddressHandler(event) {
        event.stopPropagation()
        const addressId = event.currentTarget.getAttribute("data-id"); 
        const box = event.currentTarget.parentElement;
        box.classList.add("deleting");
        this.onAddressDeleteHandler(addressId);
        setTimeout(() => {
            this._addressesData = this._addressesData.filter(address => address._id != addressId);
            this.renderList();
        }, 1000);
        // alert("delete");
    }

    hideUnselectedAddresses() {
        this._listElement.querySelectorAll('.address-box:not(.address-box__active)').forEach(box => {
            box.classList.add("hidden-animation");
            setTimeout(() => box.classList.add("hidden"), 100);
        });

    }

    showAllAdresses() {
        this._listElement.querySelectorAll('.address-box').forEach(box => {
            if(box.classList.contains("address-box__active")) box.classList.remove("address-box__active");
            box.classList.remove("hidden");
            setTimeout(() =>  box.classList.remove("hidden-animation"), 100);
        });
    }

  

}