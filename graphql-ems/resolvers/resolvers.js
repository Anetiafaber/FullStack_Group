import { GraphQLScalarType } from "graphql";
import { UserModel } from "../model/UserModel.js";
import moment from "moment";

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
  Query: {
    getAllEmployees: async (_, { employeeType, isActive, upcomingRetirement }) =>  {
      let filter = {isActive};
      if (employeeType) {
        filter.employeeType = employeeType;
      }

      if (upcomingRetirement) {
        // get employees who have upcoming retirement in the next 6 months
        const today = moment();
        const retirementAge = 65;
        const sixMonthsFromNow = today.clone().add(6, 'months');
        const retirementStartDate = today.clone().subtract(retirementAge, 'years').startOf('day').toDate();
        const retirementEndDate = sixMonthsFromNow.clone().subtract(retirementAge, 'years').endOf('day').toDate();  

        filter.dateOfBirth = { 
          $gte: retirementStartDate ,
          $lte: retirementEndDate
          };
      }

      return await UserModel.find(filter)
    },
    getEmployeeById: async (_, { id }) => {
      try {
        return await UserModel.findById(id);
      } catch (error) {
        console.error("Error fetching employee: ", error);
        throw new Error("Failed to fetch employee");
      }
    }
  },
  Mutation: {
    createEmployee: async (
      _,
      {
        firstName,
        lastName,
        dateOfBirth,
        age,
        dateOfJoining,
        title,
        department,
        employeeType,
        currentStatus,
        isActive
      }
    ) => {
        try {
            const newEmployee = {
                firstName,
                lastName,
                dateOfBirth,
                age,
                dateOfJoining,
                title,
                department,
                employeeType,
                currentStatus,
                isActive
            };
            await UserModel.create(newEmployee);
            return newEmployee;
        } catch (error) {
            console.error("Error creating employee: ", error);
            throw new Error("Failed to create employee");
        }
    },

    updateEmployee: async (
      _,
      {
        id,
        title,
        department,
        currentStatus,
      }
    ) => {
        try {
            const updateValues = {
                title,
                department,
                currentStatus,
            };
            const updatedEmployee = await UserModel.findByIdAndUpdate(id, updateValues, {new: true});
            return updatedEmployee;
        } catch (error) {
            console.error("Error updating employee: ", error);
            throw new Error("Failed to update employee");
        }
    },

    updateEmployeeStatus: async (
      _,
      {
        id,
        isActive
      }
    ) => {
        try {
            const updateValues = {
                isActive
            };
            const updatedEmployee = await UserModel.findByIdAndUpdate(id, updateValues, {new: true});
            return updatedEmployee;
        } catch (error) {
            console.error("Error deleting employee: ", error);
            throw new Error("Failed to delete employee");
        }
    },

    deleteEmployee: async ( _, { id } ) => {
        try {
          await UserModel.findByIdAndDelete(id);
        } catch (error) {
          console.error("Error deleting employee: ", error);
          throw new Error("Failed to delete employee");
        }
    },
  },
};
