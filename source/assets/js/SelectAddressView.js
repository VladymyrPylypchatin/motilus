class SelectAddressView {
    constructor(tabElement, tabAPI) {
        this._addressesData = null;
        this._tabElement = tabElement;
        this._tabAPI = tabAPI;
        this._selectedAddress = null;
        this._listElement = this._tabElement.querySelector(".addresses-list");
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
        <div class="address-box__first-line">${address.address}</div>
        <div class="address-box__second-line">${address.city}, ${address.state} ${address.zip}</div>
        `;
        addressElem.addEventListener("click", this.addressClickHandler.bind(this));
        this._listElement.appendChild(addressElem);
    }

    addressClickHandler(event) {
        const addressIndex = event.currentTarget.getAttribute("data-address");
        this._listElement.querySelectorAll('.address-box').forEach(box => box.classList.remove("address-box__active"));
        event.currentTarget.classList.add("address-box__active");
        this._selectedAddress = this._addressesData[addressIndex];
        this._tabAPI.showButton();
    }


}