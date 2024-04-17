export const typeDefs = `
type employee{
    _id:String!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
}
type user{
    username: String!
    email: String!
    password: String!
}
  type Query {
    hello: String!
    getAllEmployee: [employee]
    searchById(id:String!): employee
    loginUser(username: String!, password:String!): String
  },
  type Mutation{
    addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): String!
    signUp(username: String!,email: String!, password: String!): String!
    updateEmployeeById(_id: String!,first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): String!
    deleteEmployeeById(_id: String!): String!
  }
`;