import React, {Component} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

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
`;

const renderFriend = (friend,index) => {
    return(
        <p className="alt-friend1">
            <Link to="/chatbox">{friend.name}</Link>
        </p>
    )
}

export default class RightSideBar extends Component{
    constructor(){
        super();
        this.state = {
            msg:"",
            friends:[
                {name: "Sudarshan", id: 0},
                {name: "Rachit", id: 1},
                {name: "Siddesh", id: 2},
                {name: "Divjot", id: 3},
                {name: "Neha", id: 4}
            ],
        }
    }

    render(){
        return(
            <Div>
               <div>
                   <div className="alt-friend">
                       <p>Contacts</p>
                       <hr />
                      {this.state.friends.map(renderFriend)}
                   </div>
               </div>
            </Div>
        )
    }
}