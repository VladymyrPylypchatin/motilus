class Validator{
    constructor(){

    }

    static validateEmail(email){
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static validateString(str){
        let re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return re.test(String(str).toLowerCase());
    }

    static validatePhoneNumber(phone){
        let re = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;
        return re.test(String(phone).toLowerCase());
    }

    static minLength(value, min){
        return value.length > min;
    }
    static isFiled(value){
        return value != null && value != "" && value != undefined;
    }
    //checkUserPhone
    static async checkUniqueEmail(email){
        Messanger.sendMessage("checkUserEmail", {email});
        return new Promise((resolve, reject) => {
            window.addEventListener("message", async function handler(event){
                try{
                    if(event.data != null){
                        let data = JSON.parse(event.data, JSON.dateParser);
                        switch(data.action){                      
                            case "validateEmailUnique":
                                let result = data.data.result;
                                window.removeEventListener("message", handler);
                                resolve(result);
                            break;
                        }
                    }
                } 
                catch(e){
                    // console.log("wrong message");
                }
            });
        });
        
        // return false;
    }

    static async checkUniquePhone(phone){
        Messanger.sendMessage("checkUserPhone", {phone});
        return new Promise((resolve, reject) => {
            window.addEventListener("message", async function handler(event){
                try{
                    if(event.data != null){
                        let data = JSON.parse(event.data, JSON.dateParser);
                        switch(data.action){                      
                            case "validatePhoneUnique":
                                let result = data.data.result;
                                window.removeEventListener("message", handler);
                                resolve(result);
                            break;
                        }
                    }
                } 
                catch(e){
                    // console.log("wrong message");
                }
            });
        });
        
        // return false;
    }

    static async validateAddress(address){
        Messanger.sendMessage("validateAddress", {address});
        return new Promise((resolve, reject) => {
            window.addEventListener("message", async function handler(event){
                try{
                    if(event.data != null){
                        let data = JSON.parse(event.data, JSON.dateParser);
                        switch(data.action){                      
                            case "validateAddress":
                                let result = data.data.result;
                                window.removeEventListener("message", handler);
                                resolve(result);
                            break;
                        }
                    }
                } 
                catch(e){
                    // console.log("wrong message");
                }
            });
        });
        
        // return false;
    }

    static async validateGeofencing(address){
        Messanger.sendMessage("validateGeofencing", {address});
        return new Promise((resolve, reject) => {
            window.addEventListener("message", async function handler(event){
                try{
                    if(event.data != null){
                        let data = JSON.parse(event.data, JSON.dateParser);
                        switch(data.action){                      
                            case "validateGeofencing":
                                let result = data.data.result;
                                window.removeEventListener("message", handler);
                                resolve(result);
                            break;
                        }
                    }
                } 
                catch(e){
                    // console.log("wrong message");
                }
            });
        });
        
        // return false;
    }
}