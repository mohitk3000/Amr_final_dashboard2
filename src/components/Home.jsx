import React,{useState,useEffect } from 'react';
import {Row,Col,Container,Button} from "react-bootstrap";
import Connection from './Hconn'; // Import the Connection component
import Teleoperation from './Teleoperation'; 
import Map from './Map2'; 
import RobotState from './RobotState'; 





const Home=()=>{
  
  useEffect(() => {
    // Check if it's the first visit
    const isFirstVisit = localStorage.getItem('firstVisit');

    if (!isFirstVisit) {
      // If it's the first visit, set a timeout to refresh after 1 second
      setTimeout(() => {
        // Set the flag in localStorage to indicate that it's no longer the first visit
        localStorage.setItem('firstVisit', 'true');
        // Reload the page
        window.location.reload();
      }, 1000);
    }
  }, []); // Empty dependency array means this effect runs once, equivalent to componentDidMount



    const [counter, setCounter] = useState(219);
    // Function to handle the button click and update the counter
  const handleButtonClick = () => {
    // Increment the counter by 1
    setCounter(counter + 1);
  };
  
    return(
        
        
        <div className="footer">
          <Container>
         

          
            <h1 className="text-center mt-3">Robot Control Page</h1>
           <Row>
            <Col>
            <Connection/>
            
            
           
            </Col>
            
           </Row>

           <Row>
            <Col>
            <Teleoperation/>
            </Col>
            
            <Col>
          
          <RobotState/>
          </Col>
          <Col>
            <h1>MAP</h1>
           <Map/>
            
            </Col>
           </Row>

          
          
           
           
         
            
            
          

      
      {/* <Button onClick={handleButtonClick}>Increment</Button> */}
      </Container>

        </div>
    )
}

export default Home;