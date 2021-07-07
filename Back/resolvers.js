const db = require("./db");
const Query = {
  greeting: () => {
    return "hello from  TutorialsPoint !!!";
  },
  sayHello:(root,args,context,info) => `Hi ${args.name} GraphQL server says Hello to you!!`,
  students: () => db.students.list(),
  studentById: (root, args, context, info) => {
    return db.students.get(args.id);
  },
};

const Student = {
  fullName: (root, args, context, info) => {
    return root.firstName + "___" + root.lastName;
  },
  college: (root) => {
    return db.colleges.get(root.collegeId);
  },
};

module.exports = { Query, Student };
