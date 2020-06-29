import React, {Component} from "react";
import styled from "styled-components";
import { Card, FormInput  } from "shards-react";

const Div = styled.div`
   background-color:#f1f2f6;
   height:1000px;
   .alt-cardmain{
      position:relative;
      top:30px;
      left:200px;
      width:900px;
      height:300px;
      background-color:white;
      border-radius:10px;
      box-shadow: 0 0 10px #eeeeee;
   }
   .alt-cardsearch{
       position:relative;
       top:10px;
       left:200px;
       width:900px;
       height:60px;
       background-color:white;
       border-radius:10px;
       box-shadow: 0 0 10px #eeeeee;
   }
   .alt-img{
       position:relative;
       left:380px;
       top:180px;
       width:150px;
       height:150px;
       border-radius:50%;
       border-width:thick;
   }
   .alt-card1{
    position:relative;
    top:40px;
    left:200px;
    width:420px;
    height:400px;
    background-color:white;
    border-radius:10px;
    box-shadow: 0 0 10px #eeeeee;
   }
   .alt-mainline{
       position:relative;
       display:flex;
       left:220px;
       top:35px;
       font-size:20px;
   }
   .alt-mainline-txt{
     position:relative;
     border-style:none;
     height:50px;
     font-weight:bold;
     font-size:15px;
     background-color:#f1f2f6;
   }
   .alt-mainline-txt1{
       position:relative;
       left:20px;
       border-style:none;
       height:50px;
       font-weight:bold;
       font-size:15px;
       background-color:#f1f2f6;
   }
   .alt-mainline-txt2{
       position:relative;
       left:40px;
       border-style:none;
       height:50px;
       font-weight:bold;
       font-size:15px;
       background-color:#f1f2f6;
   }
   .alt-card1-txt1{
       position:relative;
       left:50px;
       top:20px;
       font-weight:bold;
       font-size:25px;
   }
   .alt-card1-ele1{
       position:relative;
       display:flex;
       top:40px;
       left:20px;
       font-size:20px;
   }
   .alt-card1-ele1-txt1{
    position:relative;
    left:10px;
   }
   .alt-card1-ele2{
    position:relative;
    display:flex;
    top:70px;
    left:20px;
    font-size:20px;
   }
   .alt-card1-ele2-txt1{
    position:relative;
    left:10px;
   }
   .alt-cardsearch-input{
       position:relative;
       left:40px;
       top:12px;
       border-radius:20px;
       height:30px;
       border-style:none;
       background-color: #f1f2f6;
   }
   .alt-segment2{
       display:flex;
   }
   .alt-card2{   
       position:relative;
       top:40px;
       left:250px;
       width:420px;
       height:50px;
       background-color:white;
       border-radius:10px;
       box-shadow: 0 0 10px #eeeeee;
   }
`;

export default class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
           
        }
    }

    render(){
        return(
            <Div>
                <Card className="alt-cardsearch">
                    <input className="alt-cardsearch-input" placeholder="    Search"></input>
                </Card>
                <Card className="alt-cardmain">
                    <img className="alt-img" src="https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>
                </Card>
                <div className="alt-mainline">
                    <button className="alt-mainline-txt">Timeline</button>
                    <button className="alt-mainline-txt1">About</button>
                    <button className="alt-mainline-txt2">subjects</button>
                </div>
                <div className="alt-segment2">
                <Card className="alt-card1">
                    <div className="alt-card1-txt1">Intro</div>
                    <div className="alt-card1-ele1">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/id4jdGYPaIP.png"></img>
                        <div className="alt-card1-ele1-txt1">Studied at:</div>
                    </div>
                    <div className="alt-card1-ele2">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/id4jdGYPaIP.png"></img>
                        <div className="alt-card1-ele2-txt1">working at:</div>
                    </div>
                </Card>
                <Card className="alt-card2"></Card>
                </div>
                
            </Div>
        )
    }
}