import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import config from "../scripts/config";
import * as ROSLIB from 'roslib';
import * as ROS2D from 'ros2d';

class RobotState extends Component {
  constructor() {
    super();
    this.state = {
      ros: new ROSLIB.Ros(),
      x: 0,
      y: 0,
      orientation: 0,
      linear_velocity: 0,
      angular_velocity: 0,
    };
    this.initConnection();
  }

  initConnection() {
    this.state.ros = new ROSLIB.Ros();

    try {
      this.state.ros.connect('ws://' + config.ROSBRIDGE_SERVER_IP + ':9090');

      this.state.ros.on('connection', () => {
        console.log('Connected to ROS Bridge.');
        this.getRobotState();
        this.setupMapVisualization(); // Add map visualization setup
      });

      this.state.ros.on('close', () => {
        console.log('Connection to ROS Bridge closed.');
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
    this.getRobotState();
  }

  getRobotState() {
    // ... your existing code for robot state

    // Map subscriber
    var mapSubscriber = new ROSLIB.Topic({
      ros: this.state.ros,
      name: "/map",
      messageType: "nav_msgs/OccupancyGrid"
    });

    mapSubscriber.subscribe((message) => {
      // Process the map data here if needed
      console.log('Received map message:', message);
    });
  }

  setupMapVisualization() {
    // Create a viewer for 2D visualization
    const viewer = new ROS2D.Viewer({
      divID: 'map-viewer', // ID of the HTML element where the map will be rendered
      width: 300,
      height: 300
    });

    // Add a grid to the viewer (optional)
    const gridClient = new ROS2D.OccupancyGridClient({
      ros: this.state.ros,
      topic: '/map',
      continuous: true,
      rootObject: viewer.scene,
      withOrientation: true, // Include orientation
    });
  }

  // ... your existing methods

  render() {
    return (
      <div>
        <Row>
          <Col>
            {/* ... your existing code */}
          </Col>
          <Col>
            <h4 className='mt-4'>Map</h4>
            <div id="map-viewer"></div>
          </Col>
        </Row>
        {/* ... your existing code */}
      </div>
    );
  }
}

export default RobotState;
