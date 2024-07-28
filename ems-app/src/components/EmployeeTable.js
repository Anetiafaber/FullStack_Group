import React from "react";
import EmployeeTableRow from "./EmployeeTableRow";
import { Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function EmployeeTable({employees}) {
  const navigate = useNavigate();

  // navigate to employee details
  const navigateToDetail = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  // Add rows to table with dynamic composition
  const tableRows = employees.map((emp) => (
    <EmployeeTableRow key={emp.id} employee={emp} navigateToDetail={navigateToDetail}/>
  ));

  return !employees.length ? ( <Badge color={"white"} variant="outline" borderRadius="4" p="4" m="5"> No Employee Added </Badge> ) :  (
    <div className="content">
      <div className="">
        <div className="table-responsive">
          <table className="table table-striped custom-table">
            <thead>
              <tr>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Age</th>
                <th scope="col">Joining Date</th>
                <th scope="col">Title</th>
                <th scope="col">Department</th>
                <th scope="col">Employee Type</th>
                <th scope="col">Current Status</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTable;
