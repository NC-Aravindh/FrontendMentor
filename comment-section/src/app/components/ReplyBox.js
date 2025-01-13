import React, { useRef, useState } from "react";
import Image from "next/image";
import { useData } from "../utils/DataContext";
import AddReply from "./AddReply";

const ReplyBox = ({ replyId, commentId }) => {
  const { commentArr, currentUser, setData } = useData();
  const [isReplyEditable, setEditReply] = useState(false);
  const [replyEnabled , setEnableReply] = useState(false)

  const commentIndex = commentArr.find((comment) => comment.id === commentId);

  const reply = commentIndex.replies.filter((reply) => reply.id === replyId);

  const { content, createdAt, score } = reply[0];
  const [replyContent, setReplyContent] = useState(content);
  const { username, image } = reply[0].user;

  const currentUsername = currentUser.username;

  function upVoteReply() {
    setData((commentArr) => {
      return commentArr.map((comment) => {
        return {
          ...comment,
          replies: comment?.replies.map((reply) => {
            if (reply.id === replyId) {
              return {
                ...reply,
                score: reply.score + 1,
              };
            }
            return reply;
          }),
        };
      });
    });
  }

  function downVoteReply() {
    setData((commentArr) => {
      return commentArr.map((comment) => {
        return {
          ...comment,
          replies: comment?.replies.map((reply) => {
            if (reply.id === replyId) {
              return {
                ...reply,
                score: reply.score - 1,
              };
            }
            return reply;
          }),
        };
      });
    });
  }

  function deleteReply() {
    setData((commentArr) => {
      return commentArr.map((comment) => {
        return {
          ...comment,
          replies: comment?.replies.filter((reply) => reply.id != replyId),
        };
      });
    });
  }

  function editReply() {
    setData((commentArr) => {
      return commentArr.map((comment) => {
        return {
          ...comment,
          replies: comment.replies?.map((reply) => {
            if (reply.id === replyId) {
              return {
                ...reply,
                content: replyContent,
              };
            }
            return reply;
          }),
        };
      });
    });
    setEditReply(false);
  }

  function enableReply(){
    setEnableReply(!replyEnabled);
  }

  return (
    <>
    <div className="flex-col lg:flex-row flex gap-8 p-4 m-4 bg-white rounded-xl relative md:left-10 w-[95%] md:w-[85%] lg:w-[88%] ">
      <div className="max-342-width:gap-1 max-342-width:px-2 w-fit md:w-28 px-4 gap-4 lg:px-0 lg:gap-0 lg:w-auto flex lg:flex-col bg-slate-100 rounded-xl lg:h-24 items-center justify-between order-2 lg:order-1">
        <button className="text-gray-300 w-full" onClick={() => upVoteReply()}>
          +
        </button>
        <p className="text-primary-moderateBlue font-bold w-10 p-3">
          {score}
        </p>
        <button
          className="text-gray-300 w-full"
          onClick={() => downVoteReply()}
        >
          -
        </button>
      </div>
      <div className="flex flex-col gap-2 flex-grow order-1 lg:order-2">
        <div className="flex gap-4 justify-between ">
          <div className="flex gap-1 lg:gap-4">
            <Image 
            src={image.webp} width={40} height={40} alt="userpic" />
            <p className="font-bold">{username}</p>
            <p className="text-gray-500">{createdAt}</p>
          </div>
          {currentUsername == username ? (
            <>
              <div
                className="flex gap-1 items-start cursor-pointer absolute right-20 bottom-7 lg:static"
                onClick={() => deleteReply()}
              >
                <img
                  className="h-4"
                  src="/images/icon-delete.svg"
                  alt="reply_button"
                />
                <p className="font-bold text-primary-moderateBlue">Delete</p>
              </div>
              <div
                className="flex gap-1 items-start cursor-pointer absolute right-4 bottom-7 lg:static"
                onClick={() => setEditReply(true)}
              >
                <img
                  className="h-4"
                  src="/images/icon-edit.svg"
                  alt="reply_button"
                />
                <p className="font-bold text-primary-moderateBlue">Edit</p>
              </div>
            </>
          ) : (
            <div className="flex gap-1 items-start cursor-pointer absolute right-4 bottom-7 lg:static"
            onClick={()=>enableReply()}
            >
              <img
                className="h-4"
                src="/images/icon-reply.svg"
                alt="reply_button"
              />
              <p className="font-bold text-primary-moderateBlue">Reply</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <p className={isReplyEditable ? "hidden" : "block"}>{content}</p>
          <textarea
            className={isReplyEditable ? "block w-[28rem] h-24" : "hidden"}
            value={replyContent}
            onChange={(event) => setReplyContent(event.target.value)}
          ></textarea>
          <button
            className={
              isReplyEditable
                ? "bg-primary-moderateBlue text-neutral-white p-2 w-28 rounded-lg self-end"
                : "hidden"
            }
            onClick={() => editReply()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
    {replyEnabled && <AddReply commentId = {commentId} enableReply = {enableReply} />}
    </>
    
  );
};

export default ReplyBox;
