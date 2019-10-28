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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 0 427 427.00131" ><g><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" /><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" /><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" /><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" /></g> </svg>
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