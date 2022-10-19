import express = require('express');
import timeout = require('connect-timeout')
const server = express();
server.use(timeout('5s'))
server.use((req, res, next) => {
    if (!req.timedout) next()
})
server.get('/', (request, response) => {
    let m = new Object()

    for(let hkey in request.headers) {
        let s: string
        if (typeof request.headers[hkey] === "string") {
            s = request.headers[hkey] as string
        } else {
            s = (request.headers[hkey] as string[]).join(",")
        }
        m[hkey] = s
        console.log(`[${hkey}]: ${s}`)
        response.setHeader(hkey, s)
    }
    m["body"] = request.body
    let s = JSON.stringify(m)
    response.setHeader("Content-Length", s.length)
    console.log(s)
    response.send(s)
});
server.listen(3000, () => {
    console.log(`Server listening on localhost:3000!`)
});
