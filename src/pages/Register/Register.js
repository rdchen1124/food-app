import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/userReducer';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { setAuthUser } from '../../utils';
import { addUser, checkUserExisted } from '../../WebApi';
import InputField from '../../components/InputField/InputField';
const Root = styled.div`
  margin: 100px auto 0;
  width: 600px;
  height: calc(100vh - 210px);
  min-height: 600px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`
const RegisterForm = styled.form`
  background: white;
  width: 500px;
  height: 450px;
  padding: 0 50px;
  border: none;
  border-radius: 15px;
  box-shadow: 3px 3px 10px;
`
const RegisterFormTitle = styled.h3`
  font-size: 28px;
  font-weight: normal;
`
const RegisterFormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;
`
const RegisterFormErrorLabel = styled.label`
  visibility : ${props => props.$show ? 'visible':'hidden'};
  color: #F44336;
`
const RegisterFormButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
const LoginLink = styled(Link)`
  height: 25px;
  text-decoration: none;
  color: green;
`
const LoginLinkWrapper = styled.div`
  margin-bottom: 5px;
`
const RegisterFormButton = styled.button`
  height: 50px;
  font-size: 20px;
  background: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background: #11CC17;
  }
`
const isEmpty = (value) => value.trim() === "";
const Register = () => {
  const [registerError, setRegisterError] = useState("");
  useEffect(()=>{
    document.body.style.overflowY = 'hidden';
    return ()=>{
      document.body.style.overflowY = 'auto';
    }
  }, []);
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const resetInputRefs = () => {
    nameRef.current.value = "";
    passwordRef.current.value = "";
  }
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setRegisterError("");
    if(isEmpty(nameRef.current.value) || isEmpty(passwordRef.current.value)){
      setRegisterError("帳號或密碼不得為空");
      resetInputRefs();
      return;
    }
    console.log("name:", nameRef.current.value);
    console.log("password", passwordRef.current.value);
    checkUserExisted(nameRef.current.value).then(res => {
      if(!res.length){ // this username is legal.
        addUser({
          name: nameRef.current.value,
          password: passwordRef.current.value,
          favorites: []
        }).then(res => {
          if(res.ok === 0){
            setRegisterError(res.message);
            resetInputRefs();
          }else{
            const {id, name, favorites} = res;
            const formattedUser = {
              id,
              name,
              favorites: JSON.parse(favorites)
            }
            setAuthUser(formattedUser);
            dispatch(setUser(formattedUser));
            history.push('/');
          }
        })
      }else{
        setRegisterError("這個使用者名稱已被註冊");
        resetInputRefs();
      }
    })
  }
  const handleClickEnter = (e) => {
    e.key === 'Enter' && e.preventDefault();
  }
  const handleInputClick = () => {
    if(registerError !== ""){
      setRegisterError("");
    }
  }
  return <Root>
    <RegisterForm onKeyDown={handleClickEnter} onSubmit={handleSubmit}>
      <RegisterFormTitle>歡迎您註冊本服務，朋友</RegisterFormTitle>
      <RegisterFormInputWrapper>
        <InputField
          label='挑選一個使用者名稱'
          name='name'
          placeholder='請輸入使用者名稱'
          type='text'
          onClick={handleInputClick}
          ref={nameRef}
        />
      </RegisterFormInputWrapper>
      <RegisterFormInputWrapper>
        <InputField
          label='挑選一個適當的密碼'
          name='password'
          placeholder='請輸入密碼'
          type='password'
          onClick={handleInputClick}
          ref={passwordRef}
        />
      </RegisterFormInputWrapper>
      <RegisterFormButtonWrapper>
        <LoginLinkWrapper><span>已註冊的使用者? </span><LoginLink to='/login'>登入</LoginLink></LoginLinkWrapper>
        <RegisterFormButton>註冊</RegisterFormButton>
        <RegisterFormErrorLabel $show={registerError !== ""}>{registerError}</RegisterFormErrorLabel>
      </RegisterFormButtonWrapper>
    </RegisterForm>
  </Root>
}
export default Register;