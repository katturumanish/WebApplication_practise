import React, {Component} from "react";
import styled from "styled-components";
import { Card } from "shards-react";
import RightSideBar from "./RightSideBar";
import Button from '@material-ui/core/Button';
import axios from "axios";
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const Div = styled.div`
   background-color:#f1f2f6;
   height:1000px;
   display:flex;
   .alt-cardmain{
      position:relative;
      display:flex;
      top:30px;
      left:200px;
      width:850px;
      height:300px;
      background-color:white;
      border-radius:10px;
      box-shadow: 0 0 10px #eeeeee;
   }
   .alt-cardmainimg{
    position: relative;
    border-radius:10px;
    width:850px;
    height:300px;
    z-index:0;
   }
   .alt-Section1{
       display:flex;
       width:1200px;
   }
   .alt-cardsearch{
       position:relative;
       width:1350px;
       height:60px;
       background-color:white;
       border-radius:10px;
       box-shadow: 0 0 10px #eeeeee;
   }
   .alt-img{
       position: absolute;
       left:380px;
       top:180px;
       width:150px;
       height:150px;
       border-radius:50%;
       border-width:thick;
       z-index:1;
   }
   .alt-card1{
    position:relative;
    top:40px;
    left:200px;
    width:380px;
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
       height:35px;
       width:300px;
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
   .alt-uploadimg{
    position:absolute;
    top:240px;
    left:630px;
   }
   .alt-upload-btn{
       font-size: 14px;
       font-weight:bold;
       text-transform: none;
   }
`;

export default class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
           coverPic:""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        axios.post("http://localhost:3001/users/getcoverpic", {
            email: localStorage.getItem("email")
        }).then(res => {
            var imagePreviewArr = [];
            let imagePreview = "data:image/jpg;base64, " + res.data;
            imagePreviewArr.push(imagePreview);
            console.log("imagePreviewArr:", imagePreviewArr);
            this.setState({
                coverPic: imagePreview
            });
        });
    }

    handleInputChange(e){
        e.preventDefault();
        const target = e.target;
        const name = target.name;
        console.log("name: ", name);
        const value = target.value;
    
        if (name === "photos") {
          console.log("Files : ", target.files);
          var photos = target.files;
          console.log("photos:", photos);
          let data = new FormData();
          for (var i = 0; i < photos.length; i++) {
            data.append("photos", photos[i]);
          }
    
          axios.defaults.withCredentials = true;
          let email = localStorage.getItem("email");
          axios
            .post(`http://localhost:3001/users/upload-file/`+ email, data)
            .then(response => {
              var imagePreviewArr = [];
              var photoArr = "";
              console.log("inside upload-file post call front end");
    
              if (response.status === 200) {
                for (var i = 0; i < photos.length; i++) {
                  photoArr =
                    photoArr.length == 0
                      ? photos[i].name
                      : photoArr + "," + photos[i].name;
                  axios.defaults.withCredentials = true;
                  axios
                    .post(
                      `http://localhost:3001/users/download-file/` +
                        photos[i].name
                    )
                    .then(response => {
                      //console.log("Imgae Res : ", response);
                      let imagePreview = "data:image/jpg;base64, " + response.data;
                      imagePreviewArr.push(imagePreview);
                      console.log("imagePreviewArr:", imagePreviewArr);
                      this.setState({
                        coverPic: imagePreview
                      });
                    })
                    .catch(err => {
                      if (err) {
                        //this.setState({
                        //  errorRedirect: true
                        //});
                      }
                    });
                }
    
                //console.log("Photos: ", this.state.photos);
              }
            })
            .catch(err => {
              if (err) {
                //this.setState({
                //  errorRedirect: true
                //});
              }
            });
        } else {
          //this.setState({
          //  [name]: value
          //});
        }
    }

    render(){
        return(
            <Div>
                <div className="alt-content">
                <Card className="alt-cardsearch">
                    <input className="alt-cardsearch-input" placeholder="    Search"></input>
                </Card>
                <div className="alt-Section1">
                  <Card className="alt-cardmain">
                      <img className="alt-cardmainimg" src={this.state.coverPic} />
                      <img className="alt-img" src="https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>
                      <div className="alt-uploadimg">
                         <input
                           type="file"
                           name="photos"
                           style={{display:"none"}}
                           id="contained-button-file"
                           onChange={this.handleInputChange}
                           multiple
                         />
                         <label htmlFor="contained-button-file">
                           <Button variant="contained" component="span" className="alt-upload-btn">
                             <CameraAltIcon />
                             Add Cover Photo
                           </Button>
                         </label>
                      </div>
                  </Card>
                  <RightSideBar />
                </div>
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
                </div>
            </Div>
        )
    }
}