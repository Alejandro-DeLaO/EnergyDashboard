import React, { createContext, useState } from "react";

const BuildingContext = createContext({});

export const BuildingProvider = ({children}) => {

  const [buildingId, setBuildingId] = useState();
  const [count, setCount] = useState(0);

  return(
    <>
      <BuildingContext.Provider value={{ buildingId, setBuildingId, count, setCount }}>
        {children}
      </BuildingContext.Provider>
    </>
  )
};

export default BuildingContext;