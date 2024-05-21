import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
    text-align: center;
    font-size: 1.75em;
`;

const NavLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    margin-right: 10px;
    &:hover {
        text-decoration: underline;
    }
`;

function Header() {
    return (
        <HeaderContainer>
            <HeaderText>My Board App</HeaderText>
            <NavLink to="/todo">Todo</NavLink>
            <NavLink to="/doing">Doing</NavLink>
            <NavLink to="/done">Done</NavLink>
        </HeaderContainer>
    );
}

export default Header;