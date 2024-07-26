import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import './App.css';
import EmployeeDirectory from "./components/EmployeeDirectory";
import NavigationBar from "./components/NavigationBar";
import EmployeeCreate from "./components/EmployeeCreate";
import NotFound from "./components/NotFound";
import EmployeeDetails from "./components/EmployeeDetails";
import { useQuery, gql, useMutation } from "@apollo/client";

// apollo client queries and mutations
const GET_EMPLOYEES = gql`
  query GetAllEmployees($employeeType: employeeType) {
    getAllEmployees(employeeType: $employeeType) {
      id,
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
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
    $currentStatus: Boolean!
  ) {
    createEmployee(
      firstName: $firstName,
      lastName: $lastName,
      age: $age,
      dateOfJoining: $dateOfJoining,
      title: $title,
      department: $department,
      employeeType: $employeeType,
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
    }
  }
`;

function App() {
  // Read data of all employees with useQuery hook
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES, {
    variables: {},
  });
  const [employees, setEmployees] = useState([]);

  // reload data of employees on filtering
  const reloadData = async (employeeType) => {
    if(employeeType) {
      await refetch({ employeeType });
    }
    else {
      await refetch({ employeeType: null });
    }
  };

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

  // Mutation to delete an employee and refetch table
  const [deleteEmployee, { loading: deleteLoading, error: deleteError, data: deleteData }] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });
  

  return (
      <Routes>         
          <Route path="/" element={<Layout />}>
            <Route index element={<EmployeeDirectory employees={employees} reloadData={reloadData}/>} />
            <Route path="create" element={<EmployeeCreate addEmployee={addEmployee}/>} />
            <Route path="employee/:employeeId" element={<EmployeeDetails updateEmployee={updateEmployee} deleteEmployee={deleteEmployee}/>} />
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

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}


export default App;
