var ChatApp = React.createClass({
  getInitialState: function () {
    return {
      messages: [],
      socket: io('http://localhost:9999'),
      user: undefined
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
    var body = document.getElementById("message").value;
    var message = {
      body: body,
      user: this.state.user || "guest"
    };
    
    this.state.socket.emit("new-message", message);
    console.log(message);
  }
  ,pickUser: function () {
    var user = document.getElementById("user").value;
    this.setState({user: user});
  }
  ,render: function () {
    var self = this;
    var messages = self.state.messages.map(function (msg){
      return <li><strong>{msg.user} :</strong>{msg.body}</li>
    });
    
    return ( 
      <div >
        <ul >
          {messages}
        </ul> 
        <input type="text" id="user" placeholder="choose a username"/>
        <button onClick={()=>self.pickUser()}>select user</button>
        <br/>
                                           
        <input id = "message" type = "text" / >
        <button type="submit" onClick = {()=> this.submitMessage()}>Send message</button>
        <br/>
        
      </div >
    )
  }
});

ReactDOM.render( < ChatApp / > ,
  document.getElementById("chat")
)