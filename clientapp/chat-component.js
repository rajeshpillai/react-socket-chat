var ChatApp = React.createClass({
  getInitialState: function () {
    return {
      messages: [],
      socket: io('http://localhost:9999')
    }
  },
  componentDidMount: function () {
    var self = this;
    this.state.socket.on("receive-message", function (msg) {
      // setState will trigger render
      var messages = self.state.messages;
      messages.push(msg);
      self.setState({
        messages: messages
      });
      
      console.log(self.state.messages);
    });
  }
  ,submitMessage: function () {
    var message = document.getElementById("message").value;
    this.state.socket.emit("new-message", message);
    console.log(message);
  }
  ,render: function () {
    var self = this;
    var messages = self.state.messages.map(function (msg){
      return <li>{msg}</li>
    });
    
    return ( 
      <div >
        <ul >
          {messages}
        </ul> 
        <input id = "message" type = "text" / >
        <button type="submit" onClick = {()=> this.submitMessage()}>Send</button>
      </div >
    )
  }
});

ReactDOM.render( < ChatApp / > ,
  document.getElementById("chat")
)