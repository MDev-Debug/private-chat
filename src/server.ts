import { server } from "./http"
import './websocket'

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
