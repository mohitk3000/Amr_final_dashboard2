// connection.jsx

import React, { useState, useEffect } from 'react';
import config from "../scripts/config";
import Alert from "react-bootstrap/Alert";
const Connection = () => {
  const [connection, setconnection] = useState(false);
  const [ros, setRos] = useState(null);

  useEffect(() => {
    // This will run once when the component mounts
    initConnection();
  }, []); // The empty dependency array ensures it runs only once

  function initConnection() {
    const newRos = new window.ROSLIB.Ros();
    setRos(newRos);
    console.log(newRos);
    
    console.log("hello world");
   
    
  
     

     // Attempt to connect
    
     try {
      newRos.connect('ws://'+config.ROSBRIDGE_SERVER_IP+':9090');
      console.log("printing ip from config file");
      console.log(config.ROSBRIDGE_SERVER_IP);
           
      } catch (error) {
        console.error('Error connecting to ROS server:', error);
        // Handle the connection error
      }

      newRos.onopen = () => {
        console.log('Connection opened.');
        console.log('isConnected:', newRos.isConnected);

        if (newRos.isConnected) {
            // Code to execute when the ROS connection is established
            console.log('ROS connection is established.');
          } else {
            // Code to execute when the ROS connection is not established
            console.log('ROS connection is not established.');
          }
    
      };



      
       // Event handler for when the connection is closed
       newRos.onclose = () => {
        setconnection(false);
        setTimeout(()=>{
            try {
              // newRos.connect('ws://localhost:9090');
              newRos.connect('ws://'+config.ROSBRIDGE_SERVER_IP+':9090');
           
                
              }catch (error) {
                console.error('Error connecting to ROS server:', error);
                // Handle the connection error
              }

        },3000);
        
        
        
      };
      setTimeout(()=>{
        
        if (newRos.isConnected) {
            // Code to execute when the ROS connection is established
            console.log('ROS connection is established.');
            setconnection(true);


            
            
          } else {
            // Code to execute when the ROS connection is not established
            console.log('ROS connection is not established.');
            setconnection(false);
          }
      },1000);
  
      newRos.onerror = (error) => {
        console.error('Connection error:', error);
        // You can handle the error or update the state accordingly
      };

    
      
  }
    
  return (
    <div>
    
  <Alert className='text-center m-3' variant={connection ? 'success' : 'danger'}>
  <p >Connection Status: {connection ? 'Robot Connected' : 'Robot Disconnected'}</p>

  </Alert>
   
     
   
    
      
    </div>
  );
};

export default Connection;