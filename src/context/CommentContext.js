import React, { createContext, useState } from 'react';

const CommentContext = createContext({});

export const CommentProvider = ({children}) => {

  const [comm, setComm] = useState();
  const [commentCount, setCommentCount] = useState(0);

  return(
    <>
      <CommentContext.Provider value={{ comm, setComm, commentCount, setCommentCount }}>
        {children}
      </CommentContext.Provider>
    </>
  );
}

export default CommentContext;