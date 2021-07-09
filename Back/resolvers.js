const db = require("./db");
const Query = {
  greeting: () => {
    return "hello from  TutorialsPoint !!!";
  },
  sayHello: (root, args, context, info) => `Hi ${args.name} GraphQL server says Hello to you!!`,
  students: () => db.students.list(),
  getAllColleges: () => {
    console.info("allCollagesListed")
    return db.colleges.list()
  },
  studentById: (root, args, context, info) => {
    return db.students.get(args.id);
  },
  greetingAuth: (root, args, context, info) => {
    if (!context.user) {
      throw new Error('Unauthorized');
    }
    return "Hello from TutorialsPoint, welcome back : " + context.user.firstName;
  },
  getAllStudents: (root, args, context, info) => {
    if (!context.user) {
      throw new Error('Unauthorized');
    }
    return db.students.list()
  }
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
    const st = { ...args }
    console.info(args)
    const user = db.students.list().find((user) =>  user.email ===  args.input.email);
    if(user){
      return db.students.get(user);
    }
    return db.students.create({
      email: args.input.email,
      password: args.input.password,
      firstName: args.input.fname,
      lastName: args.input.lname
    })
    //This is not really relevant here but it is just here to show how this sort of stuff works
  }
};

const Student = {
  fullName: (root, args, context, info) => {
    return root.firstName + " " + root.lastName;
  },
  college: (root) => {
    return db.colleges.get(root.collegeId);
  },
};

module.exports = { Query, Mutation, Student };
