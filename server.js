let express = require("express")
let app = express()

let server = require('http').Server(app)

server.listen(3000)

app.use(express.static('.'))

app.get('/', function(){
    res.redirect('index.html')
})