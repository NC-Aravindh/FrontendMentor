"use client";
import React from "react";
import CommentBox from "./CommentBox";
import { useData } from "../utils/DataContext";

const CommentSection = () => {
  const { commentArr } = useData();
  console.log(commentArr);
  return (
    <div className="w-full md:w-[85%] lg:w-3/4 xl:w-1/2 h-auto rounded-lg md:p-3">
      {commentArr.map((comment) => {
        return <CommentBox key={comment.id} commentId={comment.id} />;
      })}
    </div>
  );
};

export default CommentSection;
