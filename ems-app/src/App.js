import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import './App.css';
import EmployeeDirectory from "./components/EmployeeDirectory";
import NavigationBar from "./components/NavigationBar";
import EmployeeCreate from "./components/EmployeeCreate";
import NotFound from "./components/NotFound";
import EmployeeDetails from "./components/EmployeeDetails";
import { useQuery, gql, useMutation } from "@apollo/client";

// apollo client queries and mutations
const GET_EMPLOYEES = gql`
  query GetAllEmployees($employeeType: employeeType, $isActive: Boolean) {
    getAllEmployees(employeeType: $employeeType, isActive: $isActive) {
      id,
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
      isActive
    }
  }
`;

const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee(
    $firstName: String!,
    $lastName: String!,
    $age: Int!,
    $dateOfJoining: Date!,
    $title: title!,
    $department: department!,
    $employeeType: employeeType!,
    $currentStatus: Boolean!,
    $isActive: Boolean!
  ) {
    createEmployee(
      firstName: $firstName,
      lastName: $lastName,
      age: $age,
      dateOfJoining: $dateOfJoining,
      title: $title,
      department: $department,
      employeeType: $employeeType,
      currentStatus: $currentStatus,
      isActive: $isActive
    ) {
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
      isActive
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!,
    $title: title,
    $department: department,
    $currentStatus: Boolean
  ) {
    updateEmployee(
      id: $id
      title: $title,
      department: $department,
      currentStatus: $currentStatus
    ) {
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
      isActive
    }
  }
`;

const UPDATE_EMPLOYEE_STATUS = gql`
  mutation UpdateEmployeeStatus(
    $id: ID!
    $isActive: Boolean!
  ) {
    updateEmployeeStatus(
      id: $id
      isActive: $isActive
    ) {
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
      isActive
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee(
    $id: ID!
  ) {
    deleteEmployee(
      id: $id
    ) {
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
      isActive
    }
  }
`;

function App() {
  // Read data of all employees with useQuery hook
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES, {
    variables: {isActive: true},
  });
  const [employees, setEmployees] = useState([]);

  // reload data of employees based on filtering
  const reloadData = async (employeeType, inActive) => {
    if (inActive) {
      await refetch({ employeeType: null, isActive: false });
    } 
    else if (employeeType) {
      const filters = { employeeType: null};
      if (employeeType) {
        filters.employeeType = employeeType;
      }
      await refetch(filters);
    } 
    else {
      await refetch({ employeeType: null, isActive: true });
    }
  };

  // refetch data of inactive employees
  // const refetchInactive = async (inActive) => {
  //   await refetch({ isActive: !inActive });
  // };

  // useEffect hook used to ensure data is initialized after loading
  useEffect(() => {
    if (data && data.getAllEmployees) {
      setEmployees(data.getAllEmployees);
    }
  }, [data]);

  // Mutation to add an employee and refetch table
  const [addEmployee, { loading: createLoading, error: createError, data: createData }] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  // Mutation to update an employee and refetch table
  const [updateEmployee, { loading: updateLoading, error: updateError, data: updateData }] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  // Mutation to delete/change an employee status and refetch table
  const [updateEmployeeStatus, { loading: updateStatusLoading, error: updateStatusError, data: updateStatusData }] = useMutation(UPDATE_EMPLOYEE_STATUS, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  // Mutation to delete an employee and refetch table
  // const [deleteEmployee, { loading: deleteLoading, error: deleteError, data: deleteData }] = useMutation(DELETE_EMPLOYEE, {
  //   refetchQueries: [{ query: GET_EMPLOYEES }],
  // });
  

  return (
      <Routes>         
          <Route path="/" element={<Layout />}>
            <Route index element={<EmployeeDirectory employees={employees} reloadData={reloadData}/>} />
            <Route path="create" element={<EmployeeCreate addEmployee={addEmployee}/>} />
            <Route path="employee/:employeeId" element={<EmployeeDetails updateEmployee={updateEmployee} updateEmployeeStatus={updateEmployeeStatus}/>} />
            <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <NavigationBar />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}


export default App;
