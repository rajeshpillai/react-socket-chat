var ChatApp = React.createClass({
  getInitialState: function () {
    return {
      messages: [],
      socket: io('http://localhost:9999')
    }
  },
  componentDidMount: function () {

  },
  render: function () {
    return ( < div >
      This will be the chat application < /div>
    )
  }
});

ReactDOM.render( < ChatApp / > ,
  document.getElementById("chat")
)