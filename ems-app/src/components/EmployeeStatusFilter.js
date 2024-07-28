import React, {useEffect, useState} from "react";
import { FormControl, FormLabel, Box, Switch } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

function EmployeeStatusFilter() {
    const location = useLocation();
    const navigate = useNavigate();
    const [inActive, setInActive] = useState(false);

    // get selected filter value and set query params
    const handleSwitchChange = (e) => {
      const inActiveChecked = e.target.checked;
      navigate(inActiveChecked ? `?inActive=1` : "/");
    };
    
    // get params to set/retain switch selection
    useEffect( () => {
        const params = new URLSearchParams(location.search);
        const inActiveParam = params.get("inActive") ? true : false
        setInActive(inActiveParam);
    });

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      className="container filterBox"
    >
      <FormControl width="auto" ml="auto" mb={5} display="flex" alignItems="center">
        <FormLabel mb="0">Show InActive Employees</FormLabel>
        <Switch 
          colorScheme="teal"
          isChecked={inActive}
          onChange={handleSwitchChange}
          sx={{
            "& .chakra-switch__track": {
              _checked: {
                bg: "#274c77",
              },
            },
          }}
        />
      </FormControl>
    </Box>
  );
}

export default EmployeeStatusFilter;
