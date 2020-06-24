import React, {useState} from "react";
import styled from "styled-components";
import {Link as ReactRouterDomLink, useLocation} from "react-router-dom";

const HeaderWrapper = styled.header`
   height: 60px;
   width: 100%;
   box-sizing: border-box;
   display: flex;
   padding: 0 16px;
   position: fixed;
   top: 0;
   background: #eeeeee;
   background-image: linear-gradient(to right, #f8049c, #fdd54f);
   border-bottom: 3px solid #fdd54f;
`; 

const MobileMenuIcon = styled.div`
   margin: auto 0 auto auto;
   padding: 5px;
   width: 25px;
   min-width: 25px;

   >div{
       height: 3px;
       background: black;
       margin: 5px 0;
       width: 100%
   };

   @media(min-width: 768px){
     display: none
   }
`;

const Menu = styled.nav`
   display: ${p => p.open ? 'block' : 'none'};
   margin: auto 0 auto auto;
   width: 100%;
   position: absolute;
   padding: 8px;
   box-sizing: border-box;
   font-family: 'Open Sans';
   background: none;
   top: 60px;
   left: 0;
   border-bottom: 3px solid #fdd54f;

   @media(min-width: 768px){
       display: flex;
       background: none;
       left: initial;
       top: initial;
       margin: auto 0 auto auto;
       border-bottom: none;
       position: relative;
       width: initial;
   }
`;

const Link = ({isActive, children, ...props}) => {
    return(
        <ReactRouterDomLink {...props}>
            {children}
        </ReactRouterDomLink>
    );
}

const StyledLink = styled(Link)`
   margin: auto 0;
   box-sizing: border-box;
   padding: 4px 8px;
   text-align: center;
   display: block;
   font-weight: ${p => p.isActive ? 'bold': 'normal'};
`;

export function Header(){
    const {pathname} = useLocation();
    const [menuOpen, setMenuOpen] =  useState(false);
    return(
          <HeaderWrapper>
            <MobileMenuIcon onClick={() => setMenuOpen(s => !s)}>
                <div/>
                <div/>
                <div/>
            </MobileMenuIcon>
            <Menu open={menuOpen}>  
              <StyledLink to="/login" isActive={pathname === "/login"}>
                  Login
              </StyledLink>
              <StyledLink to="/register" isActive={pathname === "/register"}>
                  Register
              </StyledLink>
              </Menu>
          </HeaderWrapper>
    )
}