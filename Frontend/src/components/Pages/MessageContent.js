import React, { Component } from "react";
import styled from "styled-components";
import Axios from "axios";

const Div = styled.div`
   position:relative;
   display: flex;
   flex-direction: column;
   background-color: #eee7dd;
   .alt-chatmsgdiv{
       width:100%;
   }
   .alt-chatmsg1{
       margin:10px;
       padding:10px;
       position:relative;
       float:right;
       background-color:#e2ffc7;
       border-radius:10px;
       font-size:13px;
   }
   .alt-chatmsg2{
       padding:10px;
       width:300px;
       background-color:white;
       border-radius:10px;
       float:left;
       position:relative;
       margin:10px;
       font-size:13px;
   }
`;

export default class MessageContent extends Component{
    constructor(props){
        super();
        this.state = {
             msgs:[],
             SMFlag:"",
        };
    }

    componentDidMount(){
        Axios.post("http://localhost:3001/users/getMessages",{
                name1: localStorage.getItem("fname"),
                name2: this.props.name
        }).then(res => {
            console.log(res.data.arr)
            this.setState({
                msgs: res.data.arr,
                SMFlag: res.data.SMFlag
            });

        })
    }

    render(){       
       return(
           <Div>
               {this.state.msgs.map((msg,index) => {
                   if(msg.Flag == this.state.SMFlag){ 
                     return <div className="alt-chatmsgdiv"><div className="alt-chatmsg1">{msg.Message}</div></div> 
                   }
                   else{
                     return <div className="alt-chatmsgdiv"><div className="alt-chatmsg2">{msg.Message}</div></div>
                   }
               }
               )}
           </Div>
       )
    }
} 