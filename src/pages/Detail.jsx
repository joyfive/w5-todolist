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
        <div>
            <Header />
            <DetailBox>
              <div>ID :{todo.id}</div>
                <Title>${todo.title}</Title>
                <hr />
                <Body>${todo.body}</Body>
                <BtnReturn
                    onClick={()=>{
                      navigate("/")
                    }}
                >
                  돌아가기
                </BtnReturn>
            </DetailBox>
            <Footer />
        </div>
      );
    
};

export default Detail;


const DetailBox = styled.div`
    width: 60%;
    margin: 240px auto 240px auto;
    border: 1px solid #121;
`;

const Title = styled.h1`
    font-size: 3rem;
    text-align : center;
    font-weight: 700;
    line-height: 2.0;
`;

const Body = styled.p`
    font-size: 1.2rem;
    line-height: 1.6;
`;

const BtnReturn = styled.button`
  padding: 10px;
`