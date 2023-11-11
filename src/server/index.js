
const server = require('./server.js')

// designates what port the app will listen to for incoming requests
server.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
