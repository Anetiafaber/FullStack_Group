import React, {useState, useEffect} from "react";
import { Select, FormControl, FormLabel, Box } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

function EmployeeFilter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [employeeType, setEmployeeType] = useState("");

  // Get employee type from query params to retain dropdown value
  useEffect( () => {
    const params = new URLSearchParams(location.search);
    const employeeTypeParam = params.get("employeeType") 
    setEmployeeType(employeeTypeParam || "");
  });

  // get selected filter value and set query params
  const handleSelectChange = (e) => {
    const params = new URLSearchParams(location.search);
    const selectedType = e.target.value;

    if (selectedType) {
      params.set("employeeType", selectedType);
    } else {
      params.delete("employeeType");
    }

    navigate(`${location.pathname}?${params.toString()}`);

    // navigate(selectedType ? `?employeeType=${selectedType}` : "/");
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      className="container filterBox"
    >
      <FormControl width="auto" ml="auto" mb={5}>
        <FormLabel>Filter by Employee Type</FormLabel>
        <Select value={employeeType}
          w={250}
          className="filterDropdown"
          sx={{
            "& > option": {
              color: "black",
            },
            ":focus-visible": {
              zIndex: 1,
              boxShadow: "0 0 0 1px #0000EB",
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
