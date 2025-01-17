import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserButton from './UserButton';
import HeaderCartButton from './HeaderCartButton';
const HeaderContainer = styled.div`
  min-width: 600px;
  margin: 0 auto;
  background: #00000082;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
`;
const HeaderWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 80px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;
const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  height: 50px;
  width: 60px;
  cursor: ${props => props.$active ? 'not-allowed':'pointer'};
  color: black;
  text-decoration: none;
  background:  ${props => props.$active ? '#E7E7E7':'rgba(250, 250, 250)'};
  border-radius: 30px;
  border: none;
  margin-left: 15px;
  pointer-events: ${props => props.$active ? 'none':'auto'};
  visibility: ${props=>props.$hidden ? 'hidden':'visible'};
  &:hover {
    background: rgba(231, 231, 231);
  }
`;
const LeftContainer = styled.div`
  // border: 1px solid black;
  display: flex;
  align-items: center;
`;
const TitleContainer = styled(Link)`
  font-size: 32px;
  font-weight: bold;
  margin-left: 16px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  color: black;
  padding: 10px;
  color: white;
`;
const RightContainer = styled.div`
  // border: 1px solid black;
  display: flex;
  align-items: center;
  padding: 0 15px;
`;

const Header = ({onLogOut}) => {
  const location = useLocation();
  const user = useSelector(store => store.user.user);
  const pathname = location.pathname;
  const linkLoginObj = {pathname: '/login', state: {from: pathname}}
  const isHidden = location.pathname === '/checkout' || location.pathname === '/login' || location.pathname === '/register';
  const isActive = location.pathname === '/login' || location.pathname === '/register';
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LeftContainer>
          <UserButton $active={isActive} />
          <TitleContainer to='/'>
            Rber Eats
          </TitleContainer>
        </LeftContainer>
        <RightContainer>
          <HeaderCartButton $hidden={isHidden} />
          {user.id === 0 && <Nav to={linkLoginObj} $active={isActive}>登入</Nav>}
          {user.id !== 0 && <Nav as='div' $hidden={location.pathname === '/checkout'} onClick={onLogOut}>登出</Nav>}
        </RightContainer>
      </HeaderWrapper>
    </HeaderContainer>
  )
}
export default Header;