const http = require('http')
const fs = require('fs')
const path = require('path')

const DIR = process.argv[2]


const server = http.createServer(function(req, res){
    res.writeHead(200, {"content-type":"text/html;charset=utf-8"})
    fs.readdir(`${DIR}`, (err,files) => {
        if (err){
            console.log(err)
        }
        else{
            files.forEach(file => {     
                if(path.extname(file) == ".txt"){
                    res.write(file)
                }
            })
        }
    })
    
    res.end
})


server.listen(9999)