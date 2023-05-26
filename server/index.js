const express = require('express')
const app = express()
//const cors = require('cors')
const websocket = require('express-ws')(app)
const PORT = 3001


const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    let clientsSet = websocket.getWss().clients
    clientsSet.forEach(client => {
        if (client.id === msg.id) {
            client.send(`${JSON.stringify(msg)}`)
        }
    })
}

app.listen(PORT, () => {
    console.log(`Example App listening on port ${PORT}`)
})

// app.use(cors())
//
// app.get('/', function (req, res) {
//     res.send('GET request to the homepage');
// });
//
// // POST method route
// app.post('/', function (req, res) {
//     res.send('POST request to the homepage');
// });


// interface Message {
//     name: string
//     id: number,
//     method: string
// }

app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg)
                break
            case 'draw':
                broadcastConnection(ws, msg)
                console.log(msg)
                break
        }
    })
})
