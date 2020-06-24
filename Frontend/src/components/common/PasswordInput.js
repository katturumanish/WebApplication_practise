import React, {useState} from "react";
import styled from "styled-components";
import { Input } from "./Input";

const PasswordInputWrapper = styled.div`
    display:flex;
    ~div{
        margin-bottom: 8px;
    }
`;

const StyledPasswordInput = styled(Input).attrs(() => ({
    type:'password',
    placeholder:'password'
}))`
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
`;

const ToggleButton = styled.div`
    display:flex;
    height: 40px;
    box-sizing: border-box;
    border-radius: 4px;
    border-left: 0;
    padding: 8px;
    font-size: 0.9em;
    background: white;
    font-weight: bold;
    color:black;
    cursor: pointer;
    border: 1px solid #ccc;
`;

export function PasswordInput(props){
   const [showPassword, setShowPassword] = useState(true);
   return(
       <>
         <PasswordInputWrapper>
            <StyledPasswordInput {...props}/>
            <ToggleButton onClick={() => setShowPassword(s => !s)}>
                {showPassword ? "Hide": "show"}
            </ToggleButton>
         </PasswordInputWrapper>
         <div>
            {showPassword ? props.value: ""}
         </div>
       </>
   )
}