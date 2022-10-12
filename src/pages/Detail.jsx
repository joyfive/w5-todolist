import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTodoID } from "../redux/modules/todos";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Detail = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.todo);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTodoID(id));
  }, [dispatch, id]);

 return (
        <Layout>
            <Header />
            <DetailBox>
              <TitBox>
                <Title>{todo.title}</Title>
                <div>ID :{todo.id}</div>
              </TitBox>
                <Body>{todo.body}</Body>
                <BtnReturn
                    onClick={()=>{
                      navigate("/")
                    }}
                >
                  돌아가기
                </BtnReturn>
            </DetailBox>
            <Footer />
        </Layout>
      );
    
};

export default Detail;

const Layout = styled.div`
    width: 100%;
    background-color: #fff3e0;
    margin: 0;
    padding: 0;
`;

const DetailBox = styled.div`
    width: 60%;
    margin: 240px auto 240px auto;
    border: 1px solid #ccc0ae;
    background-color: #aebfbe;
    display: flex;
    flex-direction: column;

`;

const TitBox = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    background-color: #004d40;
    color: #fff3e0;
    
`;

const Title = styled.h1`
    font-size: 1.6rem;
    text-align : center;
    font-weight: 700;
`;

const Body = styled.p`
    font-size: 0.9rem;
    line-height: 1.6;
    padding: 0 20px;
    color: #004d40;
    height: 100%;
    min-height: 240px;
`;

const BtnReturn = styled.button`
  padding: 10px 40px;
  margin: 20px 0;
  align-self: center;
  height: 32px;
  color: #39796b;
  font-weight: 600;
  font-size: 0.7rem;
  border: 1px solid #39796b;
  background-color: transparent;

&:hover {
  background-color: #39796b;
  color: white;
}
`