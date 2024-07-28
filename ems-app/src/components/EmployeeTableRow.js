import React from "react";

function EmployeeTableRow({ employee, navigateToDetail }) {
  // Function to format date as MMM D YYYY
  function formatDateToString (date) {
    let inputDate = new Date(date);
    return `${inputDate.toLocaleString('default', { month: 'short' })} ${inputDate.getDate()} ${inputDate.getFullYear()}`;
  }

  // navigate to details page passing the emp id of the selected row
  const handleRowClick = () => {
    navigateToDetail(employee.id);
  };

  return (
    <tr scope="row" onClick={handleRowClick} style={{ cursor: "pointer" }}>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.age}</td>
      <td>{formatDateToString(employee.dateOfJoining)}</td>
      <td>{employee.title}</td>
      <td>{employee.department}</td>
      <td>{employee.employeeType}</td>
      <td>{employee.currentStatus ? "Working" : "Retired"}</td>
    </tr>
  );
}

export default EmployeeTableRow;
