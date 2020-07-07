import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const Div = styled.div`
   .alt-friendslist{
       position: relative;
       left: 100px;
       top: 100px;
   }
   .alt-friend-btn{
       border-style: none;
       background: white;
       font-size: 15px;
   }
`;

export default class VideoFriends extends Component{
    constructor(){
        super();
        this.state= {
            friends:[],
            name:"",
            room:[]
        }
        this.friendClick = this.friendClick.bind(this);
        this.handleCreateroom = this.handleCreateroom.bind(this);
    }

    async componentDidMount(){
        let name = await localStorage.getItem("fname");
        this.setState({
            room:[name]
        })
        console.log("friends: ", this.state.friends);
        axios.get(`http://localhost:3001/users/getFriends?fname=${name}`)
         .then(res => {
             this.setState({
                 friends: res.data
             });
             console.log(this.state.friends);
         })
    }

    async friendClick(e){
        await this.setState({
            room:[
                ...this.state.room,
                e.target.value
            ]
        });
        console.log(this.state.room);
    }

    handleCreateroom(e){
        axios.post("http://localhost:3001/users/create-room", {
            members: this.state.room
        }).then(res => {
            localStorage.setItem("room_id", res.data);
            console.log(localStorage.getItem("room_id"));
        })
    }

    render(){
        return(
            <Div>
            <div className="alt-friendslist">
                <h3>Friends</h3>
                {this.state.friends.map((friend,index) => 
                    (
                    <p className="alt-friend1">
                       <button className="alt-friend-btn" name="name" onClick={this.friendClick} value={friend}>{friend}</button>
                    </p>
                ))}
                <button onClick={this.handleCreateroom}>Create a room</button>
            </div>
            </Div>
        )
    }
}