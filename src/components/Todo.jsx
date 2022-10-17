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
        <Todobox color={todo.isDone ? "#e2d3c4" : "#ffefe0"} border={todo.isDone ? "#ffefe0" : "#004d40;"}>
          <Container>
              <Title> 
                <TitText>{todo.title}</TitText>
              </Title>
              <Hr />
              <BodyWrap>
              <Body>작성자: {todo.writer}</Body>
              <BtnSet>
                  <Btn 
                  onClick={() => onEdit(todo.id)}>
                  {todo.isDone ? <IoIosCheckmarkCircle style={{backgroundColor: "rgba(0, 0, 0, 0)" , color: "#004d40"}} /> : <IoIosCheckmarkCircleOutline style={{backgroundColor: "rgba(0, 0, 0, 0)" , color: "#004d40"}} />}  
                  </Btn>
                  <Btn 
                  className="btn del"
                  onClick={() => onDelete(todo.id)}
                  ><GoTrashcan style={{backgroundColor: "rgba(0, 0, 0, 0)" , color: "#004d40"}} />
                  </Btn>
                  <Btn
                  onClick={onDetial}><IoIosArrowForward style={{backgroundColor: "rgba(0, 0, 0, 0)" , color: "#004d40"}} /></Btn>
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
  width: 80%;
  border: 1px solid ${props => props.border || "#39796b"};
  /** done */
  background-color: ${props => props.color || "blue"};
`

const Container = styled.div`
  background-color: transparent;
`
const Title = styled.div`

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1rem;
  line-height: 2;
  background-color: transparent;
  color: #39796b;
  `

  const TitText = styled.div`
    background-color: transparent;
  `

  const Body = styled.div`
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-weight: 300;
  font-size: 0.8rem;
  color: #00251a;
  background-color: transparent;
  margin: 15px 5px;
`

const Btn = styled.button`
  width: 30px;
  height: 30px;
  text-align: center;
  background-color:transparent;
  border: 0;
  border-radius: 20px;
  font-size: 1.1rem;
  line-height: 2.3;
  margin: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #fff;
  }
`
const Hr = styled.hr`
  border-top: 1px solid #39796b;
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