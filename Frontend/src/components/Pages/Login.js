import React,{useState} from "react";
import {PageLayout} from "../common/PageLayout";
import {Input} from "../common/Input";
import {Button} from "../common/Button";
import {PasswordInput} from "../common/PasswordInput";
import styled from "styled-components";
import {Link, Redirect} from "react-router-dom";
import {Spinner} from "../common/Spinner";
import axios from "axios";

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

export function Login(){
   const [formFields, setFormFields] = useState({username:"", password:"", redirect:""})
   const [loading, setLoading] =  useState(false);

   function handleInputChange(e){
      e.persist();
      setFormFields(s => ({
         ...s,
         [e.target.name] : e.target.value
      }));  
   }

   function handleSubmit(e){
      e.preventDefault();
      setLoading(true);
      timeout = setTimeout(() => {
         setLoading(false);
      }, 2000);
      axios.post("http://localhost:3001/users/login",{
         username:formFields.username,
         password:formFields.password
      }).then(res => {
         console.log(res.data);
         if(res.status == 200){
            setFormFields(s => ({
               ...s,
               redirect: true
            }));
         }
           
      })
   }
    if(formFields.redirect) return <Redirect to ="/Dashboard"/>;
    return(
       <PageLayout>
          <h1>
             Login
          </h1>
          <Form onSubmit={handleSubmit}>
            {loading ? <Spinner/>:
            <>
             <Input
               value={formFields.username}
               onChange={handleInputChange}
               name="username" 
               type="text"
               placeholder="username"/>
             <PasswordInput 
               value={formFields.password}
               onChange={handleInputChange}
               name="password"/>
             <Button secondary type="submit">
                Login
             </Button>
             <div className="alt-text">
                <Link to="/register">
                Don't have an account ? Create One!
                </Link>
             </div>
            </>
            }
          </Form>
       </PageLayout>
    );
}