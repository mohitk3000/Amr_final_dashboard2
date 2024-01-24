import React, { Component } from "react";
import config from "../scripts/config";

class Map extends Component {
    state = {
          ros: null,
        };

      init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
    
        try {
          this.state.ros.connect('ws://' + config.ROSBRIDGE_SERVER_IP + ':9090');
    
          this.state.ros.on('connection', () => {
            console.log('Connected to ROS Bridge.');
            this.getRobotState(); // Move the subscription here
          });
    
          this.state.ros.on('close', () => {
            console.log('Connection to ROS Bridge closed.');
            // this.setState({ connection: false });
          });
    
          this.state.ros.on('error', (error) => {
            console.error('Error connecting to ROS Bridge:', error);
          });
        } catch (error) {
          console.error('Error connecting to ROS Bridge:', error);
        }
      }
    
      componentDidMount() {
        // Don't need to call getRobotState() here since it's already called in the 'connection' event
        this.init_connection();
      }

  render() {
    return <div>This is the map component my map</div>;
  }
}

export default Map;

