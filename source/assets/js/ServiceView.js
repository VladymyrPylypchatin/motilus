class ServiceView {
    constructor(parentSelector, tabAPI){
        this._data = null;
        this._serviceList = null;
        this._parrent = document.querySelector(parentSelector);
        this._tabAPI = tabAPI;
    }
    setServiceList(services){
        this._serviceList = services;
        console.dir(this);
    }
    renderServiceList(){
        this._serviceList.forEach(element => {
            this.renderService(element);
        });
    }
    renderService(service){
        let serviceElem = document.createElement("div");
        serviceElem.classList.add("service");
        serviceElem.setAttribute("data-service", service.serviceName);
        serviceElem.innerHTML = `
            <div class="service__left">
                <div class="service__header">
                    ${service.serviceName}
                </div>
                <div class="service__duration">
                    1 hour
                </div>
            </div>
            <div class="service__right">
                <span class="service__price">USD ${service.servicePrice}</span>
            </div>
        `;
        this._parrent.appendChild(serviceElem);
        serviceElem.addEventListener("click", this.serviceClickHandler.bind(this));
    }

    serviceClickHandler(event){
        let serviceName = event.currentTarget.getAttribute("data-service");
        console.dir(serviceName);
        this._tabAPI.actionButtonHandler(serviceName);
    }

    
}