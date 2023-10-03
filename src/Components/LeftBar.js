import React from 'react'
import './LeftBar.css'
import { FaFacebook } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa';
import {  useSelector } from "react-redux";
export default function LeftBar() {
  const color = useSelector((state)=>state.language.value2)
    const hrefstyle = {
        textDecoration:"none"
    }
    const ulstyle = {
        listStyleType:"none",
        paddingLeft:"0px"
    }
    const linkstyle={
        padding:"10px",
        border:"2px solid blue "
    }
  return (
    <div style={{float:"left",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: "180px",
    width:"60px",
    background:color=="dark"?"#333":"white",
    alignItems:"center",
    zIndex:"5",
    borderRadius:"3px",
    paddingTop:"10px"
    }}>
        <ul style={ulstyle}>
        <a href='' style={hrefstyle}><li className='List' style={{}}><FaFacebook size={45} color="blue" /></li></a>
        <a href='' style={hrefstyle}><li className='List' style={{}}><FaYoutube size={45} color="#ff0000" /></li></a>
        <a href='' style={hrefstyle}><li  className='List' style={{}}><FaTwitter size={45} color="#1da1f2" /></li></a>
        <a href='' style={hrefstyle}><li  className='List' style={{}}> <FaTelegram size={45} color="#0088cc" /></li></a>  
        </ul>
        
    </div>
  )
}
