import React, { useEffect } from "react";
import NavBar from "./Components/Nav";
import { Center, Text, Badge } from '@mantine/core';
import { IoMoonOutline } from 'react-icons/io5';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { useState } from "react";
import TableList from "./Components/Table";
import { Select } from '@mantine/core';
import { RiSunLine } from 'react-icons/ri';
import Cards from "./Components/Card";
import ListCard from "./Components/ListCard";
import { RiEarthLine } from 'react-icons/ri';
import { change,changeColor } from "./store";
import LeftBar from "./Components/LeftBar";
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
export default function App(){
  const dispatch = useDispatch();
  const color = useSelector((state)=>state.language.value2)
  const language = useSelector((state)=>state.language.value)
  useEffect(()=>{
    window.addEventListener("mousemove",(e)=>{
      var target = document.getElementById("circle")
      if(target){
        target.style.left = e.clientX-5 +"px"
        target.style.top = e.clientY + window.scrollY-5  + 'px';
      }
    })
  },[])
  return<>
  <div id="circle" style={{
    width:"50px",
    height:"50px",
    background:color=="dark"?"yellow":"green",
    opacity:"0.1",
    border:"none",
    borderRadius:"100%",
    position:"absolute",
    zIndex:"100",
    boxShadow: '-5px 5px 10px'+ color=="dark"?"yellow":"green",
  }}></div>
  <MantineProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/"  />
          <Route path="/hierarchy"  />
          <Route path="/employees"  />
        </Routes>
      </Router>
    <LeftBar/>
      <Cards/>
      <ListCard/>
      <TableList/>
    </MantineProvider>

 <footer
      style={{
        backgroundColor: color=="light"?"#f2f2f2":"#333",
        padding: '40px 0',
        marginTop: '40px',
      }}
    >
      <Center>
        <Select
      onChange={(value) => dispatch(changeColor(value))}
  
      placeholder="Theme"
      data={[
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
      ]}
      style={{width:"200px",color:"black"}}
      icon={color=='dark'?<IoMoonOutline style={{ color: 'darkgray' }} size="lg"/>:<RiSunLine size="lg"/>}
    /><br></br>
        <Select
      onChange={(value) => dispatch(change(value))}
      placeholder="Language"
      data={[
        { value: 'english', label: 'English' },
        { value: 'amharic', label: 'Amharic' },
      ]}
      style={{width:"200px"}}
      icon={<RiEarthLine size="lg"/>}
    />
      </Center><br></br>
    </footer>
  </>
}