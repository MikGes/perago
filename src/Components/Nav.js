// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Navbar, Container, Button, Group } from '@mantine/core';
// import { RiHomeHeartLine, RiUserShared2Line } from 'react-icons/ri';
// import { useSelector } from "react-redux";

//     <Navbar style={{ backgroundColor: color === "light" ? "#f2f2f2" : "#333", height: "80px", position: "sticky", top: "0px", paddingTop: "30px", zIndex: "10"}}>
//       <img src={image} style={style}></img>
//       <Container size="xl">
//         <Group align="center">
//             <a href='#'>
//             <Button component="a" variant="link" size="md" style={{ color: color === "dark" ? "white" : "#333333"}}>
//               {language === "english" ? "HOME" : "መጀመሪያ"}
//             </Button>
//             </a>
//           <a href='#Root'>
//             <Button component="a" variant="link"  size="md" style={{ color: color === "dark" ? "white" : "#333333" }}>
//               {language === "english" ? "POSITIONS" : "ሰራተኞች "}
//             </Button>
//           </a>
//           <a href='#sub'>
//             <Button component="a" variant="link"  size="md" style={{ color: color === "dark" ? "white" : "#333333" }}>
//               {language === "english" ? "HIERARCHY" : "ተዋረድ "}
//             </Button>
//           </a>
//         </Group>
//       </Container>
//     </Navbar>
import React from 'react';
import { HouseDoor } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Group } from '@mantine/core';
import image from '../perago.jpg';
import { Briefcase } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { PersonLinesFill } from 'react-bootstrap-icons';
function NavBar() {
  const language = useSelector((state) => state.language.value);
  const color = useSelector((state) => state.language.value2);

  const style = {
    width: '130px',
    height: '45px',
    position:"absolute",
    float:"right",
    top:"2px",
    left:"86%",
    marginTop:"30px",
    borderRadius:"10px"
  };

  const navbarColorClass = color === 'light' ? '#f2f2f2' : '#333';

  return (
    <Navbar
      expand="lg"
      style={{
        height: '80px',
        position: 'sticky',
        top: '0px',
        paddingTop: '20px',
        paddingLeft:"30px",
        zIndex: '10',
        backgroundColor:`${navbarColorClass}`
      }}
    >
            <img src={image} style={style} alt="Logo" />
      <Container size="xl">
        <Group>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ background: color === "dark" ? "white" : "lightgreen"}} />
          <Navbar.Collapse id="basic-navbar-nav" style={{paddingLeft:"0px"}}>
            <Nav className="me-auto" style={{ background:`${navbarColorClass}` }}>
              <Nav.Link href="#home" style={{ color: color === "dark" ? "white" : "#333333",marginLeft:"15px"}}> 
              <HouseDoor size={24} /> {language === 'english' ? 'HOME' : 'መጀመሪያ'}
              </Nav.Link>
              <Nav.Link href="#Root" style={{ color: color === "dark" ? "white" : "#333333",marginLeft:"15px"}}>
              <Briefcase size={24} /> {language === 'english' ? 'POSITIONS' : 'ሰራተኞች '}
              </Nav.Link>
              <Nav.Link href="#sub" style={{ color: color === "dark" ? "white" : "#333333",marginLeft:"15px"}}>
              <PersonLinesFill size={24}/> {language === 'english' ? 'HIERARCHY' : 'ተዋረድ '}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Group>
      </Container>
    </Navbar>
  );
}

export default NavBar;
