import React, { Component } from "react";
import styled from "styled-components";

const Div = styled.div`
   position:relative;
   left:20px;
`;

export default class MessageContent extends Component{
    constructor(props){
        super();
        this.state = {
             msgs:[],
        };
    }
    render(){
       return(
           <Div>
               Message Content
           </Div>
       )
    }
} 