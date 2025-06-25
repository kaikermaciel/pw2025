const { response } = require("express")

console.log("oi")

function removeMajor(id){
    fetch(`/majors/remove/${id}`, {method:'POST'}).then()
    if (response.ok){
        console.log("great sucess")
        window.location.href('/majors');
    } else {
        console.log('erro ao remover')
        console.log(response.status)  
    }
}