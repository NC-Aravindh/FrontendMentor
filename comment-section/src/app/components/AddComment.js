"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useData } from "../utils/DataContext";
import uuid from "../utils/randomIdGenerate";
const AddComment = () => {
  const inputComment = useRef(null);
  const [content, setContent] = useState("");
  const { commentArr, setData , currentUser} = useData();
  const { webp } = currentUser.image;
  const commentArrLen = commentArr.length;
  const currentDate = new Date().toLocaleDateString();

  function addNewComment() {
    setData((prevCommentArr) => {
      // const maxId = prevCommentArr.reduce(
      //   (max, comment) => Math.max(max, comment.id),
      //   0
      // );
      return [
        ...prevCommentArr,
        {
          id: uuid(),
          content: inputComment.current.value,
          createdAt: currentDate,
          score: 0,
          user: {
            image: {
              png: "/images/avatars/image-juliusomo.png",
              webp: "/images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
          replies: [],
        },
      ];
    });
    setContent("");
  }
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-white md:w-[75%] lg:w-[68%] xl:w-[45%] h-36 items-center justify-between">
      <Image src={webp} width={40} height={40} alt="userpic" />
      <textarea
        className="border border-gray-200 p-2 w-3/4 h-3/4 rounded-lg"
        placeholder="Add Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        ref={inputComment}
      />
      <button
        className="bg-primary-moderateBlue text-neutral-white p-2 w-28 rounded-lg"
        onClick={() => addNewComment()}
      >
        Send
      </button>
    </div>
  );
};

export default AddComment;
