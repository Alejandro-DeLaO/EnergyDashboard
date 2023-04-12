import React, { createContext, useState }  from "react";

const UserContext = createContext({});

export const UserProvider = ({children}) => {

    const [count, setCount] = useState();

    return(
        <>
          <UserContext.Provider value={{ count, setCount }}> 
            {children}
          </UserContext.Provider>
        </>
      )

}

export default UserContext;