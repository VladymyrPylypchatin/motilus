// import { threadId } from "worker_threads";
'use strict';
require("babel-core/register");
require("babel-polyfill");

class Notificator{
    constructor(notificatonBoxSelcetor){
        this._notificatonBox = document.querySelector(notificatonBoxSelcetor);

    }

    activate(){
        this._notificatonBox.classList.add("active");
    }
    diactivate(){
        this._notificatonBox.classList.remove("active");
        this.removeSuccess();
        this.removeErorr();
        this._notificatonBox.querySelector(".notification__text").innerHTML = "Loading";
    }

    setSuccess(){
        this._notificatonBox.classList.add("success");
    }

    setErorr(){
        this._notificatonBox.classList.add("erorr");
    }

    removeSuccess(){
        this._notificatonBox.classList.remove("success");
    }

    removeErorr(){
        this._notificatonBox.classList.remove("erorr");
    }

    setErorrList(ErorrList){
        let textContainer = this._notificatonBox.querySelector(".notification__text");
        textContainer.innerHTML = "";
        ErorrList.forEach(element => {
            let erorrDiv = document.createElement("div");
            erorrDiv.innerHTML = element;
            textContainer.appendChild(erorrDiv);
        });
    }

    setText(text){
        this._notificatonBox.querySelector(".notification__text").innerHTML = text;
    }

    async hideTimeout(time){
        await sleep(time);
        this.diactivate();
    }

    async erraseErorr(ErorrList){
        this.setErorr();
        this.setErorrList(ErorrList);
        this.activate();
        await this.hideTimeout(3000);
    }

    erraseFatalErorr(ErorrList){
        this.setErorr();
        this.setErorrList(ErorrList);
        this.activate();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }