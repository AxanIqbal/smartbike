import firebase  from "@react-native-firebase/app"

export class MyWebsocket {
  ws: WebSocket
  ip: string

  setup(ip: string) {
    this.ws = new WebSocket(ip)
    this.ip = ip
    this.ws.onopen = () => {
      // connection opened
      this.ws.send("something") // send a message
    }

    this.ws.onmessage = (e) => {
      // a message was received
      const data = JSON.parse(e.data)
      firebase.database().ref(`bikes/${firebase.auth().currentUser.uid}`).update({
        battery: (data.battery/1024) * 100
      })
      console.log((data.battery/1024) * 100, "onmessage")
    }

    this.ws.onerror = (e) => {
      // an error occurred
      console.log(e, "on error")
    }

    this.ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason, "on close")
      this.ws = new WebSocket(this.ip)
    }
  }

  send(command: string) {
    this.ws.send(command)
  }
}
