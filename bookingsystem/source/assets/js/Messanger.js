class Messanger{
    constructor(){
        
    }
    static sendMessage(actionName, actionData){
        let actionObject = {
            "source": "BookingSystem",
            "action": actionName,
            "data": actionData 
        };
        // console.dir(actionObject);
        window.parent.postMessage(JSON.stringify(actionObject), '*');

    }
}