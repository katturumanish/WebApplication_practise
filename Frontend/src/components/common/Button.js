import React from "react";
import styled from "styled-components";

const Button = styled.button`
    border: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    background: ${p => p.secondary ? "#fdd54f": "#f8049c"};
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
    color: black;
`;

export {Button};