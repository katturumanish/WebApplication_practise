import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const Div = styled.div`
    display:flex;
    .alt-VFcontainer{
        width:600px;
    }
    .alt-videofrnds-txtbx{
        box-shadow: 0 0 5px #82b0fa;
        height:400px;
        border-radius: 20px;
        background-color: #f3f6ff;
        position:relative;
        width:350px;
        top:30px;
        left:30px;
    }
    .alt-VF-txt{
        position: relative;
        left: 10px;
        top: 20px;
        font-size: 15px;
    }
   .alt-container1{
      background-color: #f3f6ff;
      width:700px;
      border-radius: 10px;
      height:1000px;
   }
   .alt-container2{
      width:700px;
      border-radius: 10px;
      height:1000px;
   }
   .alt-roomlist{
    position: relative;
    left: 100px;
    top: 20px;
    width: 300px; 
    height:300px;
    border-radius: 20px;
   }
   .alt-roommember-btn{
    border-style: none;
    background-color: #f3f6ff;
    color: black;
    box-shadow: 0 0 5px #82b0fa;
    border-radius:10px;
    width: 200px;
    height: 40px;
    font-size: 15px;
   }
   .alt-roommember{
       position:relative;
       left:10px;
   }
   .alt-friendslist{
       position: relative;
       left: 100px;
       top: 20px;
   }
   .alt-friend-btn{
       border-style: none;
       background-color: blue;
       color: white;
       box-shadow: 0 0 5px #82b0fa;
       border-radius:10px;
       width: 200px;
       height: 40px;
       font-size: 15px;
   }
   .alt-createrm-btn{
    border-style: none;
    background-color: #fbdb3a;
    color: white;
    box-shadow: 0 0 5px #82b0fa;
    border-radius:10px;
    width: 200px;
    height: 40px;
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
             console.log("friends: ", this.state.friends);
         });
        axios.get(`http://localhost:3001/users/getRoom_id?name=${name}`)
         .then(res => {
             console.log("room_id: ", res.data);
             localStorage.setItem("room_id", res.data);
         });
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
               <div className="alt-VFcontainer">
               <div className="alt-videofrnds-txtbx">
                  <p className="alt-VF-txt">Add your friends to watch the movie together</p>
               </div>
               </div>
               <div className="alt-container1">
               <div className="alt-friendslist">
                   <h3>Friends</h3>
                   <div>
                   {this.state.friends.map((friend,index) => 
                       (
                       <p className="alt-friend1">
                          <button className="alt-friend-btn" name="name" onClick={this.friendClick} value={friend}>{friend}
                          </button>
                       </p>
                   ))}
                   </div>
                   <button className="alt-createrm-btn" onClick={this.handleCreateroom}>Create a room</button>
               </div>
               </div>
               <div className="alt-container2">
                  <div className="alt-roomlist">
                  <h3>Room members</h3>
                  {this.state.room.map((room_member,index) => (
                      <p className="alt-roommember">
                      <button className="alt-roommember-btn" name="name" value={room_member}>{room_member}
                      </button>
                      </p>
                  ))}
                  </div>
               </div>
            </Div>
        )
    }
}