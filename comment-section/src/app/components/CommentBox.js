"use client";
import React, { useState } from "react";
import Image from "next/image";
import ReplyBox from "./ReplyBox";
import { useData } from "../utils/DataContext";
import AddReply from "./AddReply";

const CommentBox = ({ commentId }) => {
  const { commentArr, setData } = useData();
  const [replyEnabled, setEnableReply] = useState(false);
  // console.log(commentArr, commentId);

  const { content, createdAt, replies, score } = commentArr.find(
    (comment) => comment.id === commentId
  );

  const { username, image } = commentArr.find(
    (comment) => comment.id === commentId
  ).user;

  function upVoteComment() {
    // console.log("upVote");
    setData((currCommentArr) => {
      return currCommentArr.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            score: comment.score + 1,
          };
        }
        return comment;
      });
    });
  }

  function downVoteComment() {
    setData((currCommentArr) => {
      return currCommentArr.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            score: comment.score - 1,
          };
        }
        return comment;
      });
    });
  }

  function enableReply(){
    setEnableReply(!replyEnabled);
  }

  return (
    <div className="flex flex-col">
      <div className="flex-col md:flex-row flex gap-8 p-4 mb-4 md:m-6 bg-white rounded-xl relative md:static">
        <div className="w-fit px-4 gap-4 md:px-0 md:gap-0 md:w-auto flex md:flex-col bg-slate-100 rounded-xl md:h-24 items-center justify-between order-2 md:order-1">
          <button
            className="text-gray-300 max-w-10"
            onClick={() => upVoteComment()}
          >
            +
          </button>
          <p className="text-primary-moderateBlue font-bold w-10 p-3">
            {score}
          </p>
          <button
            className="text-gray-300 max-w-10"
            onClick={() => downVoteComment()}
          >
            -
          </button>
        </div>
        <div className="order-1 md:order-2 flex flex-col gap-2 ">
          <div className="flex gap-4 justify-between">
            <div className="flex gap-4">
              <Image src={image.webp} width={40} height={40} alt="userpic" />
              <p className="font-bold">{username}</p>
              <p className="text-gray-500">{createdAt}</p>
            </div>
            <div className="flex gap-1 items-start cursor-pointer absolute right-4 bottom-7 md:static"
            onClick={()=>enableReply()}
            >
              <img
                className="h-4"
                src="/images/icon-reply.svg"
                alt="reply_button"
              />
              <p className="font-bold text-primary-moderateBlue">Reply</p>
            </div>
          </div>
          <div>
            <p>{content}</p>
          </div>
        </div>
      </div>
      {replyEnabled && <AddReply commentId = {commentId} enableReply = {enableReply} />}
      {replies.length > 0 && (
  <div className="md:pl-16 flex items-stretch">
    <hr className="w-0 border-l-2 border-gray-200 h-auto" />
    <div className="flex flex-col">
      {replies.map((reply) => (
        <ReplyBox
          key={reply.id}
          replyId={reply.id}
          name={reply.user.username}
          imgPath={reply.user.image.webp}
          replyMsg={reply.content}
          timeline={reply.createdAt}
          commentId={commentId}
        />
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default CommentBox;
