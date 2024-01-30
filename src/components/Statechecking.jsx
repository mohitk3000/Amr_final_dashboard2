import React, { useEffect, useState } from 'react';
import * as ROSLIB from 'roslib';

const Home = () => {
  const [ros, setRos] = useState(null);

  useEffect(() => {
    const initConnection = () => {
      const newRos = new ROSLIB.Ros();

      newRos.on('error', (error) => {
        console.error('ROS Error:', error);
        handleConnectionChange(false);
      });

      newRos.on('close', () => {
        console.log('ROS Connection closed');
        handleConnectionChange(false);
      });

      try {
        newRos.connect('ws://localhost:9090'); // Update with your ROS Bridge server URL
        handleConnectionChange(true);
      } catch (error) {
        console.error('Cannot connect to the WS robot. Try again after 1 second');
        handleConnectionChange(false);
      }

      setRos(newRos);
    };

    const handleConnectionChange = (connected) => {
      if (!connected) {
        // If disconnected, set a timeout to refresh after 1 second
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      // You can add more logic here if needed
    };

    initConnection();

    return () => {
      // Cleanup on component unmount
      if (ros) {
        ros.close();
        handleConnectionChange(false);
      }
    };
  }, []); // Empty dependency array means this effect runs once, equivalent to componentDidMount

  return (
    <div>
    
    </div>
  );
};

export default Home;
