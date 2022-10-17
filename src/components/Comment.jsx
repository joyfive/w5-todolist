import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __addComment, __getComments, commentIsMod } from '../redux/modules/comments';

const Comment = (props) => {
    const dispatch = useDispatch();
    const { comments } = useSelector(state => state.comments);
    const [useIsDisplay, setUseIsDisplay] = useState("none");

    useEffect(() => {
        dispatch(__getComments(props.detailConId));
    }, [dispatch, props.detailConId])

    const [useWriteInput, setUseWriteInput] = useState({
        writer: "",
        body: ""
    });

    const onChange = (event) => {
        let { name, value } = event.target;
        if (name === 'writer') {
            if (value.length > 5) value = value.substring(0, 5);
        }
        if (name === 'body') {
            if (value.length > 100) value = value.substring(0, 100);
        }
        setUseWriteInput({ ...useWriteInput, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (useWriteInput.writer.trim() === "" || useWriteInput.body.trim() === "")
            return;
        dispatch(__addComment({ contentId: props.detailConId, ...useWriteInput }));
        setUseWriteInput({});
    }

    const commentTogle = () => {
        useIsDisplay === "none" ? setUseIsDisplay("flex") : setUseIsDisplay("none");
    }

    return (
        <CommentWrap>
            <CommentBtn onClick={commentTogle}>댓글</CommentBtn>
            <CommentContentWrap isDisplay={useIsDisplay} >
                <ContentWrap>
                    {comments.map((comment, i) => {
                        return (
                            <Content key={comment.id}>
                                <ContentTitleWrap>
                                    <ContentTitle>{comment.writer}</ContentTitle>
                                    <ContentBtn onClick={() => { dispatch(commentIsMod(comment.id)) }}>수정</ContentBtn>
                                    <ContentBtn>삭제</ContentBtn>
                                </ContentTitleWrap>
                                {!comment.isMod ?
                                    <ContentBody>{comment.body}</ContentBody>
                                    :
                                    <ContentModBody>{comment.body}</ContentModBody>
                                }
                            </Content>
                        )
                    })}
                </ContentWrap>
                <WriterWrap onSubmit={onSubmit} id="comment">
                    <WriterInput type="text" name="writer" value={useWriteInput.writer || ""} onChange={onChange} placeholder='작성자 (5자 이내)' maxLength='5' />
                    <WriterTextarea name="body" value={useWriteInput.body || ""} onChange={onChange} placeholder='댓글을 추가하세요 (100자 이내)' maxLength='100' />
                    <WriterBtn type='submit' form='comment'>댓글 등록하기</WriterBtn>
                </WriterWrap>
            </CommentContentWrap>
        </CommentWrap >
    );
};

export default Comment;

const CommentWrap = styled.div`
    max-height : 100%;
    height : 750px;
    display : flex;
    flex-direction : row;
    align-items: center;
    justify-content: center;
    margin-top : 40px;
    
`
const CommentBtn = styled.button`
    background-color : #004D40;
    color: #ffefe0;
    width : 60px;
    height : 60px;
    border : 1px solid;
    border-radius : 50% 0% 0% 50%;
`
const CommentContentWrap = styled.div`
    width : 450px;
    height : 100%;
    display : ${(props) => props.isDisplay};
    flex-direction : column;
`
const ContentWrap = styled.div`
    width : 400px;
    height : 100%;
    margin : 5px auto;
    overflow: auto;
`
const Content = styled.div`
    width : 380px;
    height : 130px;
    margin : 5px 0;
    background-color: #aebfbe;
`
const ContentTitleWrap = styled.div`
    width : 380px;
    height : 40px;
    display : flex;
    flex-direction : row;
    gap : 5px;
    align-items: center;
    justify-content: center;
    background-color: #aebfbe;
`
const ContentTitle = styled.div`
    width : 270px;
    padding-left: 5px;
    background-color: #aebfbe;
`
const ContentBtn = styled.button`
  padding: 10px;
  align-self: center;
  height: 32px;
  color: #39796b;
  font-weight: 600;
  font-size: 0.7rem;
  line-height: 1;
  border: 1px solid #39796b;
  background-color: transparent;
  font-family: 'IBM Plex Sans KR', sans-serif;
  cursor: pointer;
&:hover {
  background-color: #39796b;
  color: white;
}
`
const ContentBody = styled.div`
    width : 360px;
    height : 80px;
    margin : 0 auto;
    border-top : solid 2px;
    font-size : 13px;
    background-color: #aebfbe;
`
const ContentModBody = styled.textarea`
    width : 360px;
    height : 80px;
    margin : 0 auto;
    border-top : solid 2px;
    font-size : 13px;
    background-color: #aebfbe;
`


const WriterWrap = styled.form`
    width : 400px;
    height : 200px;
    margin : 10px auto;    
    display : flex;
    flex-direction : column;
    gap : 10px;
`
const WriterInput = styled.input`
    width : 98%;
    background-color: #aebfbe;
    color: #004d40;
`
const WriterTextarea = styled.textarea`
    width : 98.5%;
    height : 80px;
    background-color: #aebfbe;
    color: #004d40;
`
const WriterBtn = styled.button`
    padding: 10px 40px;
  align-self: center;
  height: 32px;
  color: #39796b;
  font-weight: 600;
  font-size: 0.7rem;
  line-height: 1;
  border: 1px solid #39796b;
  background-color: transparent;
  font-family: 'IBM Plex Sans KR', sans-serif;
  cursor: pointer;
&:hover {
  background-color: #39796b;
  color: white;
}
`