import React from "react";
import { FormControl, FormLabel, Box, Checkbox } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

function UpcomingRetirement() {
  const navigate = useNavigate();
  const location = useLocation();

  // get selected filter value and set the query params
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const params = new URLSearchParams(location.search);

    if (isChecked) {
      params.set("showRetirement", "true");
    } else {
      params.delete("showRetirement");
    }

    navigate(`${location.pathname}?${params.toString()}`);
  };

  // check showRetirement query param to retain checkbox value
  const isChecked = new URLSearchParams(location.search).get("showRetirement") === "true";

  return (
    <Box
      display="flex"
      className="container filterBox"
    >
      <FormControl width="auto" mb={5} display="flex" alignItems="center">
        <FormLabel mb="0">Show Upcoming Retirements</FormLabel>
        <Checkbox
          colorScheme="teal"
          isChecked={isChecked}
          onChange={handleCheckboxChange}
          sx={{
            "& .chakra-checkbox__control": {
              _checked: {
                bg: "#274c77",
                borderColor: "#274c77",
              },
            },
          }}
        />
      </FormControl>
    </Box>
  );
}

export default UpcomingRetirement;
