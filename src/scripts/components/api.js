
const baseUrl = "https://nomoreparties.co/v1/wff-cohort-17/";
const headers = {
    authorization: "15c26702-9c69-418c-9ef2-8c38a85250dc",
    "Content-Type": "application/json",
};



function getResponceFromServer(responce){
    if (!responce.ok){
        return Promise.reject(`Ошибка: ${responce.status}`);
    }
    return responce.json();
}



function getUsersInformation(){
    return fetch(baseUrl + 'users/me', {
        headers: headers,
    }). then(getResponceFromServer);
}



function getCardsInformation(){
    return fetch(baseUrl + "cards", {
        headers: headers,
    }).then(getResponceFromServer);
}



function getData(){
    return Promise.all([getUsersInformation(), getCardsInformation()]);
} 

function saveProfileChanges(nameInput, aboutInput){
    return fetch(baseUrl + "users/me", {
        method: 'PATCH', 
        headers: headers, 
        body: JSON.stringify({
            name: nameInput, 
            about: aboutInput,
        }) 
    }).then(getResponceFromServer);
}



function saveCard(title, picture){
    return fetch(baseUrl + 'cards', {
        method: 'POST', 
        headers: headers,
        body: JSON.stringify({
            name: title, 
            link: picture
        }),
    }).then(getResponceFromServer);
}



function deleteCardApi(ID) {
    return fetch(baseUrl + `cards/${ID}`, {
        method: 'DELETE', 
        headers: headers
    }).then(getResponceFromServer);
}

function likeCard(ID) {
    return fetch(baseUrl + `cards/likes/${ID}`, {
        method: 'PUT', 
        headers: headers
    }).then(getResponceFromServer);
}

function unlikeCard(ID) {
    return fetch(baseUrl + `cards/likes/${ID}`, {
        method: 'DELETE', 
        headers: headers
    }).then(getResponceFromServer);
}


function updateAvatar(avatarImageLink) {
    return fetch(baseUrl + 'users/me/avatar', {
        method: 'PATCH',
        headers: headers, 
        body: JSON.stringify({
            avatar: avatarImageLink, 
        })
    }).then(getResponceFromServer)
}

export {
    getData, 
    saveCard, 
    saveProfileChanges, 
    deleteCardApi,
    getCardsInformation, 
    getUsersInformation, 
    likeCard, 
    unlikeCard, 
    updateAvatar
}