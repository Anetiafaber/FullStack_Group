import { GraphQLScalarType } from "graphql";
import { UserModel } from "../model/UserModel.js";

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
    getAllEmployees: async (_, { employeeType }) =>  {
      let filter = {};
      if (employeeType) {
        filter.employeeType = employeeType;
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
        age,
        dateOfJoining,
        title,
        department,
        employeeType,
        currentStatus,
      }
    ) => {
        try {
            const newEmployee = {
                firstName,
                lastName,
                age,
                dateOfJoining,
                title,
                department,
                employeeType,
                currentStatus,
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
