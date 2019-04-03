import React from 'react';
import { subscribe } from 'mqtt-react';

export class PostMessage extends React.Component {
  sendMessage(e) {
      e.preventDefault();
      //MQTT client is passed on
      const { mqtt } = this.props;
      console.log(mqtt);
      mqtt.publish('@demo/test', 'My Message');
  }  
  
  render() {
    return (
      <button onClick={this.sendMessage.bind(this)}>
        Send Message
      </button>
    );
  }
}

export default subscribe({
  topic: '@demo/test'
})(PostMessage)
