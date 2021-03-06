const makeBlobFromURI = (uri) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    })
}

const createRandomString = () => {
    return Math.random().toString(36).substring(7);
}

const sendingPushNotification = async (pushTokens , userName) =>{
    console.log('PushTokens' , pushTokens);
    
    try{
        for(var i=0; i < pushTokens.length; i++){
            await fetch("https://exp.host/--/api/v2/push/send" , {
                method : "POST",
                headers : {
                    "content-type": "application/json"
                },
                body : JSON.stringify({
                    to : pushTokens[i],
                    body : `${userName} wants your help`
                })
            })
        }
        return {message : 'Notification Successfully Sent'}
    }
    catch(e){
        throw e
    }
}

export {
    makeBlobFromURI,
    createRandomString,
    sendingPushNotification
}