import React, {Component} from "react";
import styled from "styled-components";
import Axios from "axios";

const Div = styled.div`
   .alt-video-card{
       position: relative;
       width:700px;
       height:400px;
       left: 60px;
       top:70px;
       border-radius: 20px;
       box-shadow: 0 0 5px #eeeee;
   }
   .alt-video{
       width:700px;
       height:400px;
       border-radius: 20px;
   }
   .alt-room{
       display:flex;
       left: 0px;
   }
   .alt-room-btn{
       position:relative;
       height:30px;
       top:60px;
       left:100px;
   }
`;

export default class Video extends Component{
      constructor(){
          super();
          this.state = {
               room_id: ""
          }
      }

       async componentDidMount(){
          let name = localStorage.getItem("fname");
          Axios.get(`http://localhost:3001/users/getRoom_id?name=${name}`)
          .then(res =>{
              console.log(res.data);
              localStorage.setItem("room_id", res.data);
              this.setState({
                  room_id: res.data
              })
              
          })
          var vid = document.getElementById("videoPlayer");
          vid.currentTime = 80;
          vid.play();
      }

       render(){
           let src = `http://localhost:3001/users/video?room_id=${this.state.room_id}`;
          return(
              <Div>
                  <div className="alt-room">
                    <div className="alt-video-card">
                       <video className="alt-video" id="videoPlayer" controls muted="muted" autoPlay> 
                           <source src={src} type="video/mp4" />
                       </video>
                    </div>
                    <div className="alt-room-btn">
                        Add friends

                        <button className="">Create a room</button>
                    </div>
                    
                  </div>
              </Div>
          )
      }
}