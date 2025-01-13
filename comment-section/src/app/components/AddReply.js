import React, { useRef, useState } from "react";
import { useData } from "../utils/DataContext";
import Image from "next/image";
import uuid from "../utils/randomIdGenerate";

const AddReply = ({ commentId, enableReply }) => {
  const [content, setContent] = useState("");
  const inputReply = useRef();
  const { commentArr, setData, currentUser } = useData();
  const { webp, png } = currentUser.image;
  const currentDate = new Date().toLocaleDateString();

  function addNewReply() {
    setData((prevCommentArr) => {
      return prevCommentArr.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: uuid(),
                content: inputReply.current.value,
                createdAt: currentDate,
                score: 0,
                replyingTo: comment.user.username,
                user: {
                  image: {
                    png: png,
                    webp: webp,
                  },
                  username: currentUser.username,
                },
              },
            ],
          };
        } else {
          return comment;
        }
      });
    });

    setContent("");
    enableReply();
  }
  return (
    <div className="flex gap-4 p-4 mx-6 rounded-lg bg-white w-[93%] h-36 items-center justify-between">
      <Image src={webp} width={40} height={40} alt="userpic" />
      <textarea
        className="border border-gray-200 p-2 w-3/4 h-3/4 rounded-lg"
        placeholder="Add Comment"
        value={content}
        onChange={() => setContent()}
        ref={inputReply}
      />
      <div className="flex flex-col gap-4">
        <button
          className="bg-primary-moderateBlue text-neutral-white p-1  w-24 rounded-lg"
          onClick={() => addNewReply()}
        >
          Reply
        </button>
        <button
          className="bg-primary-moderateBlue text-neutral-white p-1 w-24 rounded-lg"
          onClick={() => enableReply()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddReply;
