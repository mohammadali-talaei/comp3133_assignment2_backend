import { ApolloServer, gql } from 'apollo-server-micro';
import { typeDefs } from "./graphql/typeDefs.js";
import { mongoose } from "mongoose";
import { Employees } from "./schema/employee.js";
import { User } from "./schema/User.js";

mongoose
  .connect(
    "mongodb+srv://mohammadali-talaei:nrQpFEmdIRpzlfA8@cluster0.qpdhf3x.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      hello: () => "Hello world!",
      getAllEmployee: async () => {
        return await Employees.find({});
      },
      searchById: async (_, args) => {
        return await Employees.findById(args.id);
      },

      loginUser: async (_, args) => {
        const users = await User.find()
          .where({
            $and: [
              {
                $or: [{ username: args.username }, { email: args.username }],
              },
              { password: args.password },
            ],
          })
          .exec();
        if (users.length === 0) {
          return "Check the username and password";
        } else {
          return "Sucessful";
        }
      },
    },
    Mutation: {
      addEmployee: async (_, args) => {
        const emp = new Employees({
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          gender: args.gender,
          salary: args.salary,
        });
        try {
          await emp.save();
          return "Employee added sucessfully";
        } catch (err) {
          return err.message;
        }
      },
      signUp: async (_, args) => {
        const usr = new User({
          ...args,
        });
        try {
          await usr.save();
          return "User added sucessfully";
        } catch (err) {
          return err.message;
        }
      },
      deleteEmployeeById: async (_, args) => {
        try {
          console.log(args._id);
          const employee = await Employees.findByIdAndDelete(args._id);
          console.log(employee);
          if (!employee) {
            throw new Error("Employee not found");
          }
          return "Employee deleted successfully";
        } catch (error) {
          console.error("Error deleting employee:", error);
          throw error;
        }
      },
      updateEmployeeById: async (_, args) => {
        const emp = {
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          gender: args.gender,
          salary: args.salary,
        };

        const employ = await Employees.findByIdAndUpdate(args._id, emp, {
          new: true,
        });

        console.log(employ);
        if (!employ) {
          return "Employee not found";
        }
        return "Employ updated";
      },
    },
  },
});

await server.start();

export default server.createHandler({ path: "/" });
