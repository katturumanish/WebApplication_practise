import React,{useState} from "react";
import { Chat, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { useParams } from "react-router";
import { StreamChat } from 'stream-chat';
import styled from "styled-components";
import 'stream-chat-react/dist/css/index.css';
import Avatar from '@material-ui/core/Avatar';
import MessageContent from "./MessageContent";
import Axios from "axios";

const Div = styled.div`
   background-color:#f1f2f6;
   height:1000px;
   .alt-chat1{
       position:relative;
       height:200px;
       width:200px;
   }
   .alt-msgcard{
    position:relative;
    top:30px;
    left:300px;
    width:450px;
    height:500px;
    background-color:white;
    border-radius:10px;
    box-shadow: 0 0 10px #eeeeee;
   }
   .alt-msgcard-text{
       position: relative;
       left:10px;
       color: #707175;
       font-weight:bold;
   }
   .alt-msgcard-ele1{
       position: relative;
       display:flex;
       left:20px;
       top:10px;
   }
   .alt-msgcard-msgtxtbox{
       display:flex;
       position: absolute;
       bottom:30px;
   }
   .alt-msgcard-msgtxtbox-input{
    position:relative;
    left:20px;
    top:12px;
    border-radius:20px;
    height:35px;
    width:300px;
    border-style:none;
    background-color: #f1f2f6;
   }
   .alt-msgcard-msgtxtbox-btn{
       position: relative;
       width:80px;
       border-style: none;
       border-radius:20px;
       top:10px;
       left:30px;
   }
   .alt-MessageContent{
       height:370px;
       overflow:scroll;
   }
`;


export default function Chatbox(){
    let { name } = useParams();
    const [formElements, setFormElements] = useState({textmsg:"", refreshFlag: true})
     
    return(
       <Div>
           <div className="alt-msgcard">
               <div className="alt-msgcard-ele1">
                  <Avatar className="alt-msgcard-avatar" src=""></Avatar>
                  <p className="alt-msgcard-text">{name}</p>
               </div>
               <hr />
               <div className="alt-MessageContent">
                  <MessageContent name={name} />
               </div>
               
           </div>
      </Div>
    )
}