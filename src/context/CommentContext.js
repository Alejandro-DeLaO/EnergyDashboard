import React, { createContext, useState } from 'react';
import useAuth from '../hooks/useAuth';

const CommentContext = createContext({});

export const CommentProvider = ({children}) => {

  const [comm, setComm] = useState();
  const [commentCount, setCommentCount] = useState(0);
  const auth = useAuth();

  return(
    <>
      <CommentContext.Provider value={{ comm, setComm, commentCount, setCommentCount, auth }}>
        {children}
      </CommentContext.Provider>
    </>
  );
}

export default CommentContext;