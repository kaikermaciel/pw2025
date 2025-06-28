
const { response } = require("express")

console.log("oi")

function removeMajor(id){
    fetch(`/majors/remove/${id}`, {method:'POST'}).then(response => {
        if (response.ok){
            console.log("great sucess")
            window.location.href = '/majors';
        } else {
            console.log('erro ao remover')
            console.log(response.status)  
        }
    })
}

function removeUser(id){
    fetch(`/users/remove/${id}`, {method:'POST'}).then(response => {
        if (response.ok){
            console.log("great sucess")
            window.location.href = '/users';
        } else {
            console.log('erro ao remover')
            console.log(response.status)  
        }
    })
}


