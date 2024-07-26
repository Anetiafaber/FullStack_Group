import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RadioGroup,
  Stack,
  Radio,
  Box,
  Flex,
  useToast
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import "../App.css";


function EmployeeCreate({addEmployee}) {
  const toast = useToast();

  // React-hook-form module used for form validation and submission
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [age, setAge] = useState(0);
  const [employeeType, setEmployeeType] = useState("");

  // Format date to YYYY-MM-DD 
  function formatDateToString(date) {
    const inputDate = new Date(date);
    return inputDate.toISOString().split("T")[0];
  }

  function handleAddSubmit(values) {

    // Convert date string to date object
    const dateOfJoiningDate = new Date(values.dateOfJoining);

    // Add employee to database
    addEmployee({
      variables: {
        ...values,
        age,
        dateOfJoining: dateOfJoiningDate,
        currentStatus: true,
      },
      // display toast message for the response
      onCompleted: () => {
        toast({
          title: "Employee added",
          description: "The new employee has been successfully added.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        reset();
        setAge(0);
        setEmployeeType("");
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

  return (
    <div>
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
          <form onSubmit={handleSubmit(handleAddSubmit)}>
            <FormControl
              className="add-emp-form-control"
              isInvalid={errors.firstName}
            >
              <FormLabel>FirstName</FormLabel>
              <Input
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              <FormErrorMessage>
                {errors.firstName && errors.firstName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              className="add-emp-form-control"
              isInvalid={errors.lastName}
            >
              <FormLabel>LastName</FormLabel>
              <Input
                id="lastName"
                type="text"
                {...register("lastName", { required: "Last Name is required" })}
              />
              <FormErrorMessage>
                {errors.lastName && errors.lastName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              className="add-emp-form-control"
              isInvalid={errors.age}
            >
              <FormLabel>Age</FormLabel>
              <NumberInput
                id="age"
                min={20}
                max={70}
                value={age}
                onChange={(valueString) => setAge(parseInt(valueString))}
              >
                <NumberInputField
                  {...register("age", { required: "Age is required" })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>
                {errors.age && errors.age.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              className="add-emp-form-control"
              isInvalid={errors.dateOfJoining}
            >
              <FormLabel>Date of Joining</FormLabel>
              <Input
                id="dateOfJoining"
                placeholder="Select Date and Time"
                size="md"
                type="date"
                max={formatDateToString(new Date())}
                {...register("dateOfJoining", {
                  required: "Date of Joining is required",
                })}
              />
              <FormErrorMessage>
                {errors.dateOfJoining && errors.dateOfJoining.message}
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
              isInvalid={errors.employeeType}
            >
              <FormLabel>Employee Type</FormLabel>
              <RadioGroup id="employeeType" value={employeeType} onChange={(value) => setEmployeeType(value)}>
                <Stack direction="row">
                  <Radio
                    value="FullTime"
                    {...register("employeeType", {
                      required: "Employee Type is required",
                    })}
                  >
                    FullTime
                  </Radio>
                  <Radio
                    value="PartTime"
                    {...register("employeeType", {
                      required: "Employee Type is required",
                    })}
                  >
                    PartTime
                  </Radio>
                  <Radio
                    value="Contract"
                    {...register("employeeType", {
                      required: "Employee Type is required",
                    })}
                  >
                    Contract
                  </Radio>
                  <Radio
                    value="Seasonal"
                    {...register("employeeType", {
                      required: "Employee Type is required",
                    })}
                  >
                    Seasonal
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {errors.employeeType && errors.employeeType.message}
              </FormErrorMessage>
            </FormControl>

            <Flex justify="center" mt={5}>
              <Button variant="dark" type="submit" color="teal">
                Add Employee
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </div>
  );
}

export default EmployeeCreate;
