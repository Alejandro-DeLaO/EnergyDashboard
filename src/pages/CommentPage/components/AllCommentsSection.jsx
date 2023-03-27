import React, { useState, useEffect } from "react";
import * as commentService from "../../../services/CommentService";

export default function AllCommentsSection() {
  
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const result = await commentService.getComments();
        setComments(result.data.data.comments);
        console.log(result.data.data.comments);
      } catch(err) {
        console.log(err);
      }
    }
    getComments();
  }, []);
  
  return(
    <div className="container">
      {comments.length === 0 && <p>Cargando...</p>}
      {
        comments.map(comment => (
          <div className="my-3 mx-auto py-4 p-3 rounded" style={{width: "90%", border: "1px solid black"}} key={comment._id}>
            <h4>{comment?.user?.name}</h4>
            <p>{comment.content}</p>
          </div>
        ))
      }
    </div>
  );
}