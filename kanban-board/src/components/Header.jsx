import React from 'react';
import styled from 'styled-components';
import '../index.css';

const HeaderContainer = styled.header`
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000; 
`;

const HeaderText = styled.h1`
    text-align: left;
    padding-left: 20px;
    font-size: 1.75em;
`;

function Header() {
    return (
        <HeaderContainer>
            <HeaderText>My Board App</HeaderText>
        </HeaderContainer>
    );
}

export default Header;
