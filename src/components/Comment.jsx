import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __addComment, __getComments, __deleteComment, __updateComment, commentIsMod } from '../redux/modules/comments';
import Btn from "../components/element/Btn"
import { GoTrashcan } from "react-icons/go";
import { IoMdCreate, IoIosSave   } from "react-icons/io";
import { IoArrowUndoSharp } from "react-icons/io5";


const Comment = (props) => {
    const dispatch = useDispatch();
    const { comments } = useSelector(state => state.comments);

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

    const [commentUpdata, setCommentUpdate] = useState();

    return (
        <>
        <CommentWrap>
            <CommentContentWrap>
                <ContentWrap>
                    {comments.map((comment) => {
                        return (
                            <Content key={comment.id}>
                                <ContentTitleWrap>
                                    <ContentTitle>{comment.writer}</ContentTitle>
                                    <ContentBtnGroup>
                                     {!comment.isMod ?
                                        <StSpan><Btn size="small" onClick={() => { dispatch(commentIsMod(comment.id)) }}><IoMdCreate className="ico" /></Btn>
                                            &nbsp;<Btn size="small" onClick={() => {
                                                const obj = {
                                                    id: comment.id,
                                                    contentId: props.detailConId
                                                }
                                                const result = window.confirm("삭제하시겠습니까?");
                                                if (result) {
                                                    dispatch(__deleteComment(obj));
                                                } else {
                                                    return;
                                                }
                                            }}><GoTrashcan className="ico" /></Btn></StSpan>
                                        :
                                        <StSpan><Btn size="small" onClick={() => {
                                            setCommentUpdate();
                                            dispatch(commentIsMod(comment.id));
                                        }}><IoArrowUndoSharp className="ico" /></Btn>
                                            &nbsp;<Btn size="small" onClick={() => {
                                                const obj = {
                                                    id: comment.id,
                                                    contentId: props.detailConId,
                                                    writer: comment.writer,
                                                    body: commentUpdata,
                                                    isMod: false
                                                }
                                                dispatch(__updateComment(obj));
                                            }}><IoIosSave className="ico" /></Btn></StSpan>
                                    }
                                    </ContentBtnGroup>
                                </ContentTitleWrap>
                                {
                                    !comment.isMod ?
                                        <ContentBody>{comment.body}</ContentBody>
                                        :
                                        <ContentModBody
                                            name='body'
                                            row='3'
                                            maxLength={100}
                                            onChange={(event) => {
                                                setCommentUpdate(event.target.value);
                                            }}
                                            value={commentUpdata || comment.body} />
                                }

                            </Content>
                        )
                    })}
                </ContentWrap>
                <WriterWrap onSubmit={onSubmit} id="comment">
                    <WriterInput type="text" name="writer" value={useWriteInput.writer || ""} onChange={onChange} placeholder='작성자 (5자 이내)' maxLength='5' />
                    <WriterTextarea name="body" value={useWriteInput.body || ""} onChange={onChange} placeholder='댓글을 추가하세요 (100자 이내)' maxLength='100' />
                    <Btn type='submit' form='comment'>댓글 등록하기</Btn>
                </WriterWrap>
            </CommentContentWrap>
        </CommentWrap >
        </>
    );
};

export default Comment;

const CommentWrap = styled.div`
    width: 20%;
    max-width: 300px;
    max-height : 75vh;
    height : 800px;
    position : fixed;
    right: 0;
    top: 20px;
    box-shadow: 0 2px 10px #9dabca;
    border-radius: 20px;
    margin: 60px 20px;
    padding: 10px;
    @media screen and (max-width: 1000px) {
    width: 90%;
    max-width: 700px;
    top: 10%;
    left: 0;
    right: 0;
    margin: 0 auto;
    }
 
`

const CommentContentWrap = styled.div`
    display: flex;
    width: 100%;
    height : 100%;
    flex-direction : column;
    /** done */

    `
const ContentWrap = styled.div`
    display: block;
    width : 100%;
    height : 68%;
    margin : 5px auto;
    overflow: auto;
`
const Content = styled.div`
    margin: 10px;
    padding: px;
    border-radius: 10px;
    box-shadow: 0px 2px 10px #9dabca;
    display: block;
`
const ContentTitleWrap = styled.div`
    width : 90%;
    height : 40px;
    margin: 0px auto;
    display : flex;
    flex-direction : row;
    gap : 5px;
    align-items: center;
    justify-content: space-between;
`
const ContentTitle = styled.div`
    margin-top: 10px;
    width : 50%;
    font-size: 1rem;

    @media screen and (max-width: 1050px) {
        font-size: 0.9rem;
    }
`

const ContentBtnGroup = styled.div`
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: right;
    width: 70%;    
    margin-top: 5px;
    
    .ico {
        font-size: 1.2rem;
        background-color: transparent;
        }
    
`
const ContentBody = styled.div`
    padding: 10px;
    width : 90%;
    min-height : 80px;
    margin : 10px auto;
    border-top : solid 1px #eee;
    font-size : 13px; 
    display: block;
`
const ContentModBody = styled.textarea`
  font-size: 0.9rem;
  line-height: 1.6;
  padding: 20px;
  color: #2c5cc5;
  margin: 10px auto;
  width : 90%;
  height: 100%;
  min-height: 80px;
  background-color: transparent;
  border: 0;
`


const WriterWrap = styled.form`
    width : 100%;
    height : 200px;
    margin : 10px auto;    
    display : flex;
    flex-direction : column;
    gap : 10px;
`
const WriterInput = styled.input`
height: 30px;
margin: 5px;
padding: 10px;
background-color: transparent;

outline: 0;
border-width: 1px solid;
border: 1px solid #2c5cc5;
  color: #121212;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 400;
`
const WriterTextarea = styled.textarea`
height: 100px;
margin: 5px;
padding: 10px;
background-color: transparent;
border: 1px solid #2c5cc5;
  color: #121212;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 400;
`

const StSpan = styled.span`
    background-color: transparent;
`
