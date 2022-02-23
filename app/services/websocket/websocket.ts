export class MyWebsocket {
  ws: WebSocket

  setup(ip: string) {
    this.ws = new WebSocket(ip)
    this.ws.onopen = () => {
      // connection opened
      this.ws.send("something") // send a message
    }

    this.ws.onmessage = (e) => {
      // a message was received
      console.log(e.data)
    }

    this.ws.onerror = (e) => {
      // an error occurred
      console.log(e)
    }

    this.ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason)
    }
  }

  send(command: string) {
    this.ws.send(command)
  }
}
