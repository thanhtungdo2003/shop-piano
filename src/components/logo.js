import React from "react";
import logoPng from '../lib/logo_music.png'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const StyledLogo = styled.img`
    width: 90%;
    height: 90%;
    object-fit: cover;
    border-radius: 10px;
`;
export default function Logo() {
    const nav = useNavigate();
    const handleClick = ()=>{
        nav("/")
    }
    return (
        <>
            <div style={{overflow:"hidden", width:"100px", overflow:"hidden", height:"60px", cursor:"pointer", display:"flex", alignItems:"center"}}>
                <StyledLogo onClick={handleClick} src={logoPng} />
            </div>

        </>
    )
}