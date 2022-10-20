import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { GoTrashcan } from "react-icons/go";
import { IoIosCheckmarkCircleOutline, IoIosCheckmarkCircle, IoIosArrowForward } from "react-icons/io";


function Todo({ todo, onEdit, onDelete }) {
  const navigate = useNavigate();

  const onDetial = () => {
    navigate(`/${todo.id}`)
  }
  

 return (
        <Todobox color={todo.isDone ? "#eee" : "#fff"}>
          <Container>

                <TitText>{todo.title.length < 12 ? todo.title : todo.title.slice(0,12) + '...' }</TitText>

              <Hr />
              <BodyWrap>
              <Body>@{todo.writer}</Body>
              <BtnSet>
                  <Btn 
                  onClick={() => onEdit(todo.id)}>
                  {todo.isDone ? <IoIosCheckmarkCircle style={{backgroundColor: "rgba(0, 0, 0, 0)" , color: "#2c5cc5"}} /> : <IoIosCheckmarkCircleOutline style={{backgroundColor: "rgba(0, 0, 0, 0)" , color: "#2c5cc5"}} />}  
                  </Btn>
                  <Btn 
                  className="btn del"
                  onClick={() => onDelete(todo.id)}
                  ><GoTrashcan style={{backgroundColor: "rgba(0, 0, 0, 0)" , color: "#2c5cc5"}} />
                  </Btn>
                  <Btn
                  onClick={onDetial}><IoIosArrowForward style={{backgroundColor: "rgba(0, 0, 0, 0)" , color: "#2c5cc5"}} /></Btn>
                </BtnSet>
                
                </BodyWrap>
          </Container>
          

      </Todobox>
      );
    
};
export default Todo;


const Todobox = styled.article`
margin: 10px;
padding: 20px;
width: 200px;
max-width: 80%;
height: 100px;
/** done */
background-color: ${props => props.color || "blue"};
border-radius: 10px;
box-shadow: 0px 2px 10px #9dabca;
@media screen and (max-width: 900px) {
        min-height: 100px;
        margin: 0 auto;
        max-height: 100%;
        flex-direction: column;
        flex-wrap: wrap;
        width: 90%;
        margin-bottom: 20px;
        align-content: center;
    }
`

const Container = styled.div`
background-color: transparent;
width: 100%;
`
// const Title = styled.div`

// `

const TitText = styled.div`
font-weight: 600;
font-size: 1rem;
line-height: 2;
color: #2c5cc5;
width: 100%;
background-color: transparent;
word-break: break-all;
`

  const Body = styled.div`
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-weight: 300;
  font-size: 0.9rem;
  color: #16367d;
  background-color: transparent;
  margin: 15px 5px;
  line-height: 0.8;
  width: 33%;
  word-break: break-all;
`

const Btn = styled.button`
  width: 30px;
  height: 30px;
  background-color:transparent;
  border: 0;
  border-radius: 20px;
  font-size: 1.2rem;
  line-height: 1.6;
  margin: 5px;
  cursor: pointer;
  
  &:hover {
  background-color: #fff;
}
`
const Hr = styled.hr`
border-top: 1px solid #2c5cc5;
border-bottom: 0;

`

const BodyWrap = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  background-color: transparent;
`

const BtnSet = styled.div`
    background-color: transparent;
`