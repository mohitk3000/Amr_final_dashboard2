import React, { useEffect } from 'react';
import ROSLIB from 'roslib';
import Config from "../scripts/config";

const RosImageComponent = () => {
  useEffect(() => {
    // Connecting to ROS
    

    const ros = new ROSLIB.Ros({
      url: "ws://" +
      Config.ROSBRIDGE_SERVER_IP +
      ":" +
      Config.ROSBRIDGE_SERVER_PORT,
    });

    ros.on('connection', function () {
      console.log('Connected to websocket server.');
    });

    ros.on('error', function (error) {
      console.log('Error connecting to websocket server: ', error);
    });

    ros.on('close', function () {
      console.log('Connection to websocket server closed.');
    });

    // Subscribing to Image Topic
    const imageTopic = new ROSLIB.Topic({
      ros: ros,
      name: '/camera/image_raw/compressed',
      messageType: 'sensor_msgs/CompressedImage',
    });

    imageTopic.subscribe(function (message) {
      document.getElementById('my_image').src = "data:image/jpg;base64," + message.data;
      imageTopic.unsubscribe();
    });

    // Cleanup on component unmount
    return () => {
      imageTopic.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>ROS Image Dashboard</h1>
      <img id="my_image" style={{ height: '100%', width: '100%', objectFit: 'contain' }} src="assets/img/placeholder.png" alt="ROS Image" />
    </div>
  );
};

export default RosImageComponent;