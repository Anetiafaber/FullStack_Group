import React from "react";
import { Select, FormControl, FormLabel, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function EmployeeFilter() {
  const navigate = useNavigate();

  // get selected filter value
  const handleSelectChange = (e) => {
    const selectedType = e.target.value;
    navigate(selectedType ? `?employeeType=${selectedType}` : "/");
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      className="container filterBox"
    >
      <FormControl width="auto" ml="auto" mb={5}>
        <FormLabel color="white">Filter by Employee Type</FormLabel>
        <Select defaultValue=""
          w={250}
          className="filterDropdown"
          sx={{
            color: "white",
            "::placeholder": {
              color: "white",
            },
            "& > option": {
              color: "black",
            },
            ":focus-visible": {
              zIndex: 1,
              borderColor: "#fdd114",
              boxShadow: "0 0 0 1px #fdd114",
            },
          }}
          onChange={handleSelectChange}
        >
          <option value="">All Employees</option>
          <option value="FullTime">Full Time</option>
          <option value="PartTime">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
        </Select>
      </FormControl>
    </Box>
  );
}

export default EmployeeFilter;
