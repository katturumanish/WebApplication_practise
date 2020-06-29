import React,{useState, Component} from "react";
import {PageLayout} from "../common/PageLayout";
import {Input} from "../common/Input";
import {Button} from "../common/Button";
import {PasswordInput} from "../common/PasswordInput";
import axios from "axios";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Spinner} from "../common/Spinner";

const Form = styled.form`
   width: 100%;
   max-width: 400px;
   background: white;
   box-sizing: border-box;
   color: black;
   border-radius: 4px;
   border: 1px solid #eee;
   padding: 16px;
   box-shadow:5px 10px #eeeeee;
   margin: auto 0 auto auto;

   .alt-text{
      text-align: center;
      margin: 10px 0;
      cursor: pointer;
   }
`;

let timeout;

export default class Register extends Component{
    constructor(){
        super();
        this.state = {
            FirstName:"",
            LastName:"",
            email:"",
            username:"",
            password:"",
            retypepassword:"",
            loading:"",
            formFields:"",
            msg:"",

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange(e){
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
     }
  
    handleSubmit(e){
        e.preventDefault();
        if(this.state.password == this.state.retypepassword){
           axios.post("http://localhost:3001/users/register",{
               firstName: this.state.FirstName,
               lastName: this.state.LastName,
               email: this.state.email,
               username: this.state.username,
               password: this.state.password,
           }).then(res => {
               console.log(res.data);
               this.setState({
                   msg: res.data
               })
           })
        }else{
            this.setState({
                msg: "Passwords don't match"
            })
        }
    }

    handlerValidations(){

    }
    
    render(){
     return(
        <PageLayout>
          <h1>
             Register
          </h1>
          <Form onSubmit={this.handleSubmit}>
            {this.state.loading ? <Spinner/>:
            <>
             <Input
               value={this.state.FirstName}
               onChange={this.handleInputChange}
               name="FirstName" 
               type="text"
               placeholder="First Name"/>
             <Input
               value={this.state.LastName}
               onChange={this.handleInputChange}
               name="LastName" 
               type="text"
               placeholder="Last Name"/>
             <Input
               value={this.state.email}
               onChange={this.handleInputChange}
               name="email" 
               type="email"
               placeholder="email"/>
             <Input
               value={this.state.username}
               onChange={this.handleInputChange}
               name="username" 
               type="text"
               placeholder="username"/>
             <Input 
               value={this.state.password}
               onChange={this.handleInputChange}
               type="password"
               name="password"
               placeholder="password"/>
             <Input 
               value={this.state.retypepassword}
               onChange={this.handleInputChange}
               type="password"
               name="retypepassword"
               placeholder="retype-password"/>
             <Button secondary type="submit">
                Register
             </Button>
             <div className="alt-text">
                <Link to="/login">
                Already have an account? Login here
                </Link>
             </div>
             <p>Join for Free</p>
            </>
            }
          </Form>
       </PageLayout>
     )
    }
}