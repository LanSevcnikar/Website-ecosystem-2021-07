const db = require("./db");
const Query = {
  greeting: () => {
    return "hello from  TutorialsPoint !!!";
  },
  sayHello: (root, args, context, info) => `Hi ${args.name} GraphQL server says Hello to you!!`,
  students: () => db.students.list(),
  studentById: (root, args, context, info) => {
    return db.students.get(args.id);
  },
};

const Mutation = {
  createStudentReturn: (root, args, context, info) => {
    const id = db.students.create({
      collegeId: args.collegeId,
      firstName: args.firstName,
      lastName: args.lastName
    });
    return db.students.get(id)
  },
  createStudent: (root, args, context, info) => {
    return db.students.create({
      collegeId: args.collegeId,
      firstName: args.firstName,
      lastName: args.lastName
    })
  },
  signUp: (root, args, context, info) => {
    const { email, firstName, password } = args.input;
    const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailExpression.test(String(email).toLowerCase())
    if (!isValidEmail)
      throw new Error("email not in proper format")

    if (firstName.length > 15)
      throw new Error("firstName should be less than 15 characters")

    if (password.length < 8)
      throw new Error("password should be minimum 8 characters")

    return "success";
    //This is not really relevant here but it is just here to show how this sort of stuff works
  }
};

const Student = {
  fullName: (root, args, context, info) => {
    return root.firstName + "___" + root.lastName;
  },
  college: (root) => {
    return db.colleges.get(root.collegeId);
  },
};

module.exports = { Query, Mutation, Student };
