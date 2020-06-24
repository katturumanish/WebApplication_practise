import styled, {keyframes} from "styled-components";

const Rotation = keyframes`
   from{
       transform: rotate(0deg);
   }
   to{
       transform: rotate(360deg);
   }
`;
const Spinner = styled.div`
   border: 1px solid #f8049c;
   border-radius: 50%;
   border-top: none;
   border-bottom: none;
   height: 30px;
   width: 30px;
   margin: 16px auto;
   animation: ${Rotation} 1s linear infinite;
`;

export {Spinner};