import React, {Component} from "react";
import styled from "styled-components";
import {Link, Redirect} from "react-router-dom";

const Div = styled.div`
   position:relative;
   top:20px;
   left:220px;
   .alt-friend{
       width:250px;
       color: #707175;
       font-weight:bold;
   }
   .alt-friend1{
       font-weight:bold;
       cursor:pointer;
       color:black;
   }
   .alt-friend-btn{
       text-align:left;
       width:100%;
       height:30px;
       border-style:none;
       background-color: #f1f2f6;
   }
`;


export default class RightSideBar extends Component{
    constructor(){
        super();
        this.state = {
            msg:"",
            redirect:"",
            friends:[
                {name: "Sudarshan", id: 0},
                {name: "Rachit", id: 1},
                {name: "Siddesh", id: 2},
                {name: "Divjot", id: 3},
                {name: "Neha", id: 4}
            ],
            name:"",
            url:""
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e){
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
             url: "/chatbox/"+e.target.value,
             redirect: true
        });
    }
    
    render(){
        if (this.state.redirect) return (<Redirect to={this.state.url} />)
        return(
            <Div>
               <div>
                   <div className="alt-friend">
                       <p>Contacts</p>
                       <hr />
                      {this.state.friends.map((friend,index) => 
                          (
                          <p className="alt-friend1">
                             <button className="alt-friend-btn" name="name" onClick={this.handleClick} value={friend.name}>{friend.name}</button>
                          </p>
                      ))}
                   </div>
               </div>
            </Div>
        )
    }
}