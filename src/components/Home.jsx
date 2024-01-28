import React,{useState,useEffect } from 'react';
import {Row,Col,Container,Button} from "react-bootstrap";
import Connection from './Hconn'; // Import the Connection component
import Teleoperation from './Teleoperation'; 
import Map from './Map2'; 
import RobotState from './RobotState'; 





const Home=()=>{
  
 


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