import React, { useEffect } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeFilter from "./EmployeeFilter";
import URLSearchParams from 'url-search-params';
import { useLocation } from "react-router-dom";


function EmployeeDirectory({employees, reloadData}) {
  const location = useLocation();

  // get employee type filter from query parameter and refresh table
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const employeeType = params.get("employeeType");

    if (employeeType) {
      reloadData(employeeType);
    } else {
      reloadData(null); 
    }
  }, [location.search, reloadData]); 

  return (
    <>
      <div className="emp-list">
        <EmployeeFilter/>
        <EmployeeTable employees={employees} />
      </div>
    </>
  );
}

export default EmployeeDirectory;
