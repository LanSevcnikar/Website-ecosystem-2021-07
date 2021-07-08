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
