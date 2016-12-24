var ChatApp = React.createClass({
  getInitialState: function () {
    return {
      messages: [],
      socket: io('http://localhost:9999')
    }
  },
  componentDidMount: function () {
    this.state.socket.on("new-message", function (msg) {
      // setState will trigger render
      this.setState({
        messages: this.state.messages.push(msg)
      })
    });
  }
  ,submitMessage: function () {
    var message = document.getElementById("message").value;
    this.state.socket.emit("new-message", message);
    console.log(message);
  }
  ,render: function () {
    return ( 
      <div >
        <ul >
        </ul> 
        <input id = "message" type = "text" / >
        <button type="button" onClick = {()=> this.submitMessage()}>Send</button>
      </div >
    )
  }
});

ReactDOM.render( < ChatApp / > ,
  document.getElementById("chat")
)