import React, { useState, useEffect } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeFilter from "./EmployeeFilter";
import URLSearchParams from 'url-search-params';
import { useLocation } from "react-router-dom";
import EmployeeStatusFilter from "./EmployeeStatusFilter";
import { Box, Flex } from "@chakra-ui/react";


function EmployeeDirectory({employees, reloadData}) {
  const location = useLocation();
  const [inActive, setInActive] = useState(false);

  // get filters from query parameter and refresh table
  useEffect( () => {
    const params = new URLSearchParams(location.search);
    const employeeType = params.get("employeeType");
    
    const inActiveParam = params.get("inActive");
    setInActive(inActiveParam);

    // refetch table query based on filters
    if (inActiveParam){
      reloadData(null, true);
    }
    else if (employeeType) {
      reloadData(employeeType, false);
    }
    else {
      reloadData(); 
    }
  }, [location.search, reloadData]); 
  
  return (
    <>
    <div className="emp-list container">
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
      {!inActive && (<Box display="flex" flexDirection="column" alignItems="flex-start">
          <EmployeeFilter />
        </Box> )}
        <EmployeeStatusFilter />
      </Flex>
      <EmployeeTable employees={employees} />
    </div>
  </>
  );
}

export default EmployeeDirectory;
