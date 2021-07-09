const db = require("./db");
const Hashes = require('jshashes')
const Query = {
  greeting: () => "hello from  TutorialsPoint !!!",
  greetingAuth: (root, args, context, info) => {
    if (!context.user) throw new Error('Unauthorized');
    return "Hello from TutorialsPoint, welcome back : " + context.user.firstName;
  },
  getAllColleges: () => db.colleges.list(),
  getAllStudents: (root, args, context, info) => {
    if (!context.user) throw new Error('Unauthorized');
    return db.students.list()
  }
};

const Mutation = {
  deleteStudent: (root, args, context, info) => {
    if (!context.user || context.user.role != "admin") throw new Error('Unauthorized');
    console.info("Deleted a student with the ID: ", args.id)
    return db.students.delete(args.id)
  },
  signUp: (root, args, context, info) => {
    const st = { ...args }
    const user = db.students.list().find((user) =>  user.email ===  args.input.email);
    if(user) return db.students.get(user);
    return db.students.create({
      email: args.input.email,
      password: new Hashes.SHA256().b64(args.input.password),
      firstName: args.input.fname,
      lastName: args.input.lname,
      role: "user",
      collegeId: "col-103"
    })
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
