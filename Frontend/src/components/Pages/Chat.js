import React from "react";
import { Chat, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import styled from "styled-components";
import 'stream-chat-react/dist/css/index.css';

const Div = styled.div`
   .alt-chat1{
       position:relative;
       height:200px;
       width:200px;
   }
`;


const chatClient = new StreamChat('gx5a64bj4ptz');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicmFwaWQtYmFuZC00In0.1WD1M31AJzCN90bkBexwQpyIgydrMubqzPC9jOz4Nds';

chatClient.setUser(
  {
       id: 'rapid-band-4',
       name: 'Rapid band',
       image: 'https://getstream.io/random_svg/?id=rapid-band-4&name=Rapid+band'
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'godevs', {
  // add as many custom fields as you'd like
  image: 'https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png',
  name: 'Talk about Go',
});

export default function Chatbox(){
    return(
       <Div>
           chatbox
      </Div>
    )
}