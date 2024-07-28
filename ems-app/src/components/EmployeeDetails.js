import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  RadioGroup,
  Stack,
  Radio,
  Box,
  Flex,
  useToast
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import "../App.css";
import { useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

// Query to fetch a single employee by id
const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    getEmployeeById(id: $id) {
      id
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


function EmployeeDetails({updateEmployee, updateEmployeeStatus}) {
  const toast = useToast();

  // get the emp id from route parameter
  const { employeeId } = useParams();
  const navigate = useNavigate();

  // get details api for fetching the details of a single employee
  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
      variables: { id: employeeId },
    });

  // React-hook-form module used for form validation and submission
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [age, setAge] = useState(0);
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [currentStatus, setCurrentStatus] = useState();
  const [isActive, setIsActive] = useState();

  // Format date to YYYY-MM-DD 
  function formatDateToString(date) {
    const inputDate = new Date(date);
    return inputDate.toISOString().split("T")[0];
  }

  // display data in the form
  useEffect(() => {
    if (data?.getEmployeeById?.dateOfJoining) {
        setDateOfJoining(formatDateToString(data.getEmployeeById.dateOfJoining));
    }

    reset({
      firstName: data?.getEmployeeById?.firstName || "",
      lastName: data?.getEmployeeById?.lastName || "",
      age: data?.getEmployeeById?.age || 0,
      title: data?.getEmployeeById?.title || "",
      department: data?.getEmployeeById?.department || "",
    });

    setAge(data?.getEmployeeById?.age || 0);
    setEmployeeType(data?.getEmployeeById?.employeeType || "")
    setCurrentStatus(data?.getEmployeeById?.currentStatus || false)
    setIsActive(data?.getEmployeeById?.isActive || false)

  }, [data, reset]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Update details of employee in database
  function handleEditSubmit(values) {
    updateEmployee({
      variables: {
        id: employeeId,
        title: values.title,
        department: values.department,
        currentStatus
    },
    // display toast message for the response
      onCompleted: () => {
        toast({
          title: "Employee updated",
          description: "The employee has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "An error occurred",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  }

  // delete(make them inactive) employee from database
  function handleDelete() {
    // if employee is working, do not allow deletion
    if (currentStatus) {
      toast({
        title: "Error deleting Employee",
        description: "The employee is currently working and cannot be deleted.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      return;
    }

    // delete (make them inactive) mutation
    updateEmployeeStatus({
      variables: {
        id: employeeId, 
        isActive: false
    },
    // display toast message for the response
      onCompleted: () => {
        toast({
          title: "Employee deleted",
          description: "The employee has been successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // close confirmation popup and navigate to home page
        onClose();
        setTimeout(() => {
            navigate('/', { replace: true });
          }, 2000);
      },
      onError: (error) => {
        toast({
          title: "An error occurred",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      },
    });

    // deleteEmployee({
    //   variables: { id: employeeId },
    //   // display toast message for the response
    //   onCompleted: () => {
    //     toast({
    //       title: "Employee deleted",
    //       description: "The employee has been successfully deleted.",
    //       status: "success",
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //     onClose();
    //     setTimeout(() => {
    //         navigate('/', { replace: true });
    //       }, 2000);
    //   },
    //   onError: (error) => {
    //     toast({
    //       title: "An error occurred",
    //       description: error.message,
    //       status: "error",
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //     onClose();
    //   },
    // });
  }

  // Enable Active status of employee
  function handleEnable() {
    updateEmployeeStatus({
      variables: {
        id: employeeId,
        isActive: true
    },
    // display toast message for the response
      onCompleted: () => {
        toast({
          title: "Employee Enabled",
          description: "The employee has been successfully enabled.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "An error occurred",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  }

  // open and close the confirmation modal
  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  return (
    <>
      <Flex justify="center" align="center" minHeight="100vh">
        <Box
          w="50%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={6}
          boxShadow="lg"
          bg="white"
          my={4}
        >
          <form onSubmit={handleSubmit(handleEditSubmit)}>
            <FormControl
              className="add-emp-form-control"
            >
              <FormLabel>FirstName</FormLabel>
              <Input
                id="firstName"
                type="text"
                className="read-only-field"
                isReadOnly
                {...register("firstName")}
              />
            </FormControl>

            <FormControl
              className="add-emp-form-control"
            >
              <FormLabel>LastName</FormLabel>
              <Input
                id="lastName"
                type="text"
                isReadOnly
                className="read-only-field"
                {...register("lastName")}
              />
            </FormControl>

            <FormControl
              className="add-emp-form-control"
            >
              <FormLabel>Age</FormLabel>
              <NumberInput
                id="age"
                min={20}
                max={70}
                value={age}
                isReadOnly
                onChange={(valueString) => setAge(parseInt(valueString))}
              >
                <NumberInputField
                  {...register("age", { required: "Age is required" })}
                  className="read-only-field"
                />
              </NumberInput>
              <FormErrorMessage>
                {errors.age && errors.age.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              className="add-emp-form-control"
            >
              <FormLabel>Date of Joining</FormLabel>
              <Input
                id="dateOfJoining"
                placeholder="Select Joining Date"
                size="md"
                type="date"
                value={dateOfJoining}
                isReadOnly
                className="read-only-field"
                max={formatDateToString(new Date())}
                {...register("dateOfJoining")}
              />
            </FormControl>

            
            <FormControl
              className="add-emp-form-control"
              isInvalid={errors.employeeType}
            >
              <FormLabel>Employee Type</FormLabel>
              <RadioGroup id="employeeType" value={employeeType}>
                <Stack direction="row">
                  <Radio
                    value="FullTime"
                    isReadOnly
                    className="read-only-field"
                    {...register("employeeType")}
                  >
                    FullTime
                  </Radio>
                  <Radio
                    value="PartTime"
                    isReadOnly
                    className="read-only-field"
                    {...register("employeeType")}
                  >
                    PartTime
                  </Radio>
                  <Radio
                    value="Contract"
                    isReadOnly
                    className="read-only-field"
                    {...register("employeeType")}
                  >
                    Contract
                  </Radio>
                  <Radio
                    value="Seasonal" isReadOnly className="read-only-field"
                    {...register("employeeType")}
                  >
                    Seasonal
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl
              className="add-emp-form-control"
              isInvalid={errors.isActive}
            >
              <FormLabel>Is he/she an Active Employee?</FormLabel>
              <RadioGroup id="isActive" value={isActive ? "Yes" : "No"}>
                <Stack direction="row">
                  <Radio
                    value="Yes"
                    isReadOnly
                    className="read-only-field"
                    {...register("isActive")}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="No"
                    isReadOnly
                    className="read-only-field"
                    {...register("isActive")}
                  >
                    No
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {errors.isActive && errors.isActive.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              className="add-emp-form-control"
              isInvalid={errors.title}
            >
              <FormLabel>Title</FormLabel>
              <Select
                id="title"
                placeholder="Select a Title"
                {...register("title", { required: "Title is required" })}
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </Select>
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              className="add-emp-form-control"
              isInvalid={errors.department}
            >
              <FormLabel>Department</FormLabel>
              <Select
                id="department"
                placeholder="Select a Department"
                {...register("department", {
                  required: "Department is required",
                })}
              >
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </Select>
              <FormErrorMessage>
                {errors.department && errors.department.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              className="add-emp-form-control"
              isInvalid={errors.currentStatus}
            >
              <FormLabel>Current Status</FormLabel>
              <RadioGroup id="currentStatus" value={currentStatus ? "Working" : "Retired"}
              onChange={(value) => setCurrentStatus(value === "Working")}>
                <Stack direction="row">
                  <Radio
                    value="Working"
                    {...register("currentStatus", {
                      required: "Current Status is required",
                    })}
                  >
                    Working
                  </Radio>
                  <Radio
                    value="Retired"
                    {...register("currentStatus", {
                      required: "Current Status is required",
                    })}
                  >
                    Retired
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {errors.currentStatus && errors.currentStatus.message}
              </FormErrorMessage>
            </FormControl>

            <Flex justify="center" mt={5} gap={5}>
              <Button variant="dark" type="submit" color="teal">
                Edit Employee
              </Button>
              {isActive ? (
                <Button variant="danger" colorscheme="red" onClick={onOpen}>
                  Delete Employee
                </Button>
              ) : (
                <Button variant="success" colorscheme="green" onClick={handleEnable}>
                  Enable Employee
                </Button>
              )}
              {/* <Button variant="danger" colorscheme="red" onClick={onOpen}>
                Delete Employee
              </Button> */}

              <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Are you sure you want to delete this employee?
                </ModalBody>
                <ModalFooter>
                  <Button variant="danger" colorscheme="red" onClick={handleDelete} mr={4}>
                    Delete
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            </Flex>
          </form>
        </Box>
      </Flex>
    </>
  );
}

export default EmployeeDetails;