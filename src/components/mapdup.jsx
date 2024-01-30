import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Config from "../scripts/config";
import * as ROSLIB from 'roslib';



class RobotState extends Component {
  state={
    ros:null,
  };

  constructor(){
    super();
    this.state = {
      ros: new window.ROSLIB.Ros(),
      connection: false,
    };
    this.view_map=this.view_map.bind(this)

   
  }
  componentDidMount() {
    // Don't need to call getRobotState() here since it's already called in the 'connection' event
    this.initConnection();
    this.view_map();
     // Subscribe to the /map topic
     const mapTopic = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: "/map",
      messageType: "nav_msgs/OccupancyGrid",
    });

    mapTopic.subscribe((message) => {
      // Log received map data to the console
      console.log("Received Map Data: ", message);
      console.log("haare krishna");
    });
  }


  initConnection() {
    this.setState({ ros: new window.ROSLIB.Ros() });
    console.log("Map: " + this.state.ros);
  
    this.state.ros.on("error", (error) => {
      console.error("ROS Error:", error);
    });
  
    try {
      this.state.ros.connect(
        "ws://" +
          Config.ROSBRIDGE_SERVER_IP +
          ":" +
          Config.ROSBRIDGE_SERVER_PORT
      );
    } catch (error) {
      console.error(
        "ws://" +
          Config.ROSBRIDGE_SERVER_IP +
          ":" +
          Config.ROSBRIDGE_SERVER_PORT
      );
      console.error("Cannot connect to the WS robot. Try again after 1 second");
    }
  }


  
  view_map(){
    var viewer=new window.ROS2D.Viewer({
      divID:"nav_div3",
      width:160,
      height:299,
    });
    var navClient = new window.NAV2D.OccupancyGridClientNav({
      ros: this.state.ros,
      rootObject: viewer.scene,
      viewer: viewer,
      serverName: "/move_base",// Correct the property name here
      withOrientation: true,
    });
    
    
    
  }


  // ... your existing methods

  render() {
    return (
      <div>
        
        <div id="nav_div3"> <h1></h1></div>
      </div>
    );
  }
}


export default RobotState;


// name: "/robot_pose_ekf/odom_combined",
      // messageType: "geometry_msgs/PoseWithCovarianceStamped",