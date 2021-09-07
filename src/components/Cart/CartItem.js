import styled from "styled-components";
const CartItemWrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  & + & {
    margin-top: 5px;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }
`;
const CartItemChild = styled.div`
  height: 40px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Amount = styled(CartItemChild)`
  justify-content: space-around;
  width: 25%;
`;
const Name = styled(CartItemChild)`
  width: 50%;
`;
const Price = styled(CartItemChild)`
  width: 10%;
  text-align: center;
  color: #4CAF50;
`;
const AmountItem = styled.div`
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const AmountContainer = styled(AmountItem)`
  width: 40%;
  cursor: default;
`;
const MinusButton = styled(AmountItem)`
  width: 30%;
  background: rgba(0, 0, 0, 0.1);
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;
const PlusButton = styled(AmountItem)`
  width: 30%;
  background: rgba(0, 0, 0, 0.1);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;
const CartItem = ({amount, name, price}) => {
  return (
    <CartItemWrapper>
      <Amount>
        <MinusButton>-</MinusButton>
        <AmountContainer>{amount}</AmountContainer>
        <PlusButton>+</PlusButton>
      </Amount>
      <Name>{name}</Name>
      <Price>${amount*price}</Price>
    </CartItemWrapper>
  )
}
export default CartItem;