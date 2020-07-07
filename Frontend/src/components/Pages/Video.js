import React, {Component} from "react";
import styled from "styled-components";

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

          }
      }

      componentDidMount(){
          
          var vid = document.getElementById("videoPlayer");
          //console.log("vid: ", vid);
          //vid.addEventListener('canplay', function() {
          //    this.currentTime = 50;
          //});
          vid.currentTime = 80;
          vid.play();
      }

      render(){
          return(
              <Div>
                  <div className="alt-room">
                    <div className="alt-video-card">
                       <video className="alt-video" id="videoPlayer" controls muted="muted" autoPlay> 
                           <source src="http://localhost:3001/video" type="video/mp4" />
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