import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartItem } from "../../components/Cart";
import useInput from "../../hooks/useInput";
import { addOrder } from "../../WebApi";
import { clearCart } from "../../redux/reducers/cartReducer"
const Root = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 100px;
`
const Container = styled.div`
  width: 540px;
  min-height: 360px;
  margin: 0 auto;
  padding: 10px 15px 0px;
  background: white;
  border: 1px solid black;
`
const Title = styled.div`
  padding: 0 20px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`
const StoreName = styled.div`
  font-size: 28px;
  font-weight: bold;
`
const StoreLink = styled(Link)`
  text-decoration: none;
  color: black;
  border: none;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
`
const OrderForm = styled.form`
  box-sizing: border-box;
  width: 540px;
  margin: 0 auto 30px;
  padding: 0 20px;
  // border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`
const OrderTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  padding: 0 20px;
  margin-bottom: 10px;
  color: #008CBA;
`
const OrderItemContainer = styled.div`
  box-sizing: border-box;
  width: 540px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: 150px;
  max-height: 220px;
  overflow-y: scroll;
`
const TotalAmountWrapper = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 45px;
`;
const TotalAmountTitle = styled.div`
  height: 30px;
  font-size: 20px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TotalAmount = styled(TotalAmountTitle)`
  font-weight: bold;
`
const OrderFormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const OrderFormInput = styled.input`
  height: 20px;
  font-size: 18px;
  padding: 5px 10px;
`
const OrderFormLabel = styled.label`
  color: grey;
  margin-bottom: 5px;
`
const OrderFormErrorLabel = styled.label`
  visibility : ${props => props.$show ? 'visible':'hidden'};
  color: #F44336;
  margin-bottom: 5px;
`
const OrderFormButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
const OrderFormButton = styled.button`
  height: 50px;
  font-size: 20px;
  background: ${props => props.disabled ? 'grey':'lightseagreen'};
  border: none;
  color: white;
  cursor: ${props => props.disabled ? 'not-allowed':'pointer'};
`
const Checkout = () => {
  const items = useSelector(store => store.cart.items);
  const cartStore = useSelector(store => store.cart.cartStore);
  const totalAmount = useSelector(store => store.cart.totalAmount);
  const user = useSelector(store => store.user.user);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const isEmpty = (value) => value.trim() !== '';
  const {
    inputRef: nameRef,
    isValid: isNameValid,
    hasError: nameHasError,
    handleInputBlur: handleNameBlur,
    reset: resetName
  } = useInput(isEmpty);

  const {
    inputRef: addressRef,
    isValid: isAddressValid,
    hasError: addressHasError,
    handleInputBlur: handleAddressBlur,
    reset: resetAddress
  } = useInput(isEmpty);

  const {
    inputRef: phoneRef,
    isValid: isPhoneValid,
    hasError: phoneHasError,
    handleInputBlur: handlePhoneBlur,
    reset: resetPhone
  } = useInput(isEmpty);

  const isValid = isNameValid && isAddressValid && isPhoneValid;
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if(!isValid){
      return;
    }
    console.log('name', nameRef.current.value);
    console.log('address', addressRef.current.value);
    console.log('phone', phoneRef.current.value);
    // addOrder({
    //   order: [...items],
    //   user: {
    //     user: user,
    //     name: nameRef.current.value,
    //     address: addressRef.current.value,
    //     phone: Number(phoneRef.current.value)
    //   }
    // }).then(res => {
    //   if(res.ok === 0){
    //     console.log('error', res.message);
    //     return;
    //   }
    //   console.log('Order submitted!');
    // })
    // clean cartStore, state.cart.items
    dispatch(clearCart());
    setIsSubmitted(true);
    resetName();
    resetAddress();
    resetPhone();
  }
  const handleClickEnter = (e) => {
    e.key === 'Enter' && e.preventDefault();
  }
  const orderContent = (
    <Container>
      <Title>
        <StoreName>{cartStore.name}</StoreName>
        <StoreLink to={`/store/${cartStore.id}`} target="_top">新增餐點</StoreLink>
      </Title>
      <OrderTitle>您的餐點</OrderTitle>
      <OrderItemContainer>
        {items.map(item => 
          <CartItem
            key={item.id}
            id={item.id}
            amount={item.amount}
            name={item.name}
            price={item.price} 
          />
        )}
      </OrderItemContainer>
      <TotalAmountWrapper>
        <TotalAmountTitle>總計:</TotalAmountTitle>
        <TotalAmount>${totalAmount}</TotalAmount>
      </TotalAmountWrapper>
      <hr />
      <OrderTitle>您的資訊</OrderTitle>
      <OrderForm onKeyDown={handleClickEnter} onSubmit={handleSubmitOrder}>
        <OrderFormInputWrapper>
          <OrderFormLabel htmlFor='name'>取餐者姓名:</OrderFormLabel>
          <OrderFormInput 
            type='text'
            id='name'
            placeholder='請輸入姓名'
            ref={nameRef}
            onBlur={handleNameBlur}
          />
          <OrderFormErrorLabel $show={nameHasError}>姓名不得為空</OrderFormErrorLabel>
        </OrderFormInputWrapper>
        <OrderFormInputWrapper>
          <OrderFormLabel htmlFor='address'>外送地址:</OrderFormLabel>
          <OrderFormInput
            type='text'
            id='address'
            placeholder='請輸入地址'
            ref={addressRef}
            onBlur={handleAddressBlur}
          />
          <OrderFormErrorLabel $show={addressHasError}>地址不得為空</OrderFormErrorLabel>
        </OrderFormInputWrapper>
        <OrderFormInputWrapper>
          <OrderFormLabel htmlFor='phone'>聯絡電話:</OrderFormLabel>
          <OrderFormInput
            type='text'
            id='phone'
            placeholder='請輸入連絡電話'
            ref={phoneRef}
            onBlur={handlePhoneBlur}
          />
          <OrderFormErrorLabel $show={phoneHasError}>請填妥電話</OrderFormErrorLabel>
        </OrderFormInputWrapper>
        <OrderFormButtonWrapper>
          <OrderFormButton disabled={!isValid}>送出訂單</OrderFormButton>
        </OrderFormButtonWrapper>
      </OrderForm>
    </Container>
  )
  const submittedContent = (
    <div>Your order have been already sent.</div>
  )
  return (<Root>
    {!isSubmitted && items.length!==0 && orderContent}
    {isSubmitted && submittedContent}
  </Root>)
}
export default Checkout;