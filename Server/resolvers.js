const db = require("./db");
const jwt = require("jsonwebtoken");
const { createTokens, refreshTokens } = require("./auth");
const notAuth = "Unauthorized";
const Hashes = require("jshashes");

const secret = "ImagineJeFUlKulModel";

//const Hashes = require('jshashes')
const Query = {
  greeting: (root, args, context, info) => {
    //context.res.header('something','somethingeseewra')
    return "Greetings and salutations"
  },
  greetingAuth: (root, args, context, info) => {
    if (!context.user) throw new Error(notAuth);
    return "Greetings and salutations, " + context.user.firstName;
  },
  getAllColleges: () => {
    return db.colleges.list()
  },
  getAllStudents: (root, args, context, info) => {
    if (!context.user) throw new Error(notAuth);
    return db.students.list();
  },
  checkLoginStatus: (root, args, context, info) => {
    if (!context.user) return false;
    return true;
  },
};

const Mutation = {
  deleteStudent: (root, args, context, info) => {
    if (!context.user || context.user.role != "admin") throw new Error(notAuth);
    return db.students.delete(args.id);
  },
  signUpUser: (root, args, context, info) => {
    const user = db.students
      .list()
      .find((user) => user.email === args.input.email);
    if (user) return db.students.get(user);
    return db.students.create({
      email: args.input.email,
      password: new Hashes.SHA256().b64(args.input.password),
      firstName: args.input.fname,
      lastName: args.input.lname,
      role: "user",
      collegeId: "col-103",
    });
  },
  logInUser: async (root, args, context, info) => {
    const email = args.email;
    const password = new Hashes.SHA256().b64(args.password);
    const user = db.students.list().find((user) => user.email === email);

    if (!user) throw new Error("User does not exist");
    if (user.password != password) throw new Error("Incorect password");


    //const [accessToken, refreshToken] = await createTokens(user, secret);
    const [token, refreshToken] = await createTokens(user);

    return {
      token,
      refreshToken,
    };
  },
  invalidateToken: (root, args, context, info) => {
    if (!context.user) throw new Error("There is no user to unauthenticate");
    db.invalidatedTokens.create({token: context.user.refreshToken})
  }
};

const Student = {
  fullName: (root, args, context, info) => {
    return root.firstName + " " + root.lastName;
  },
  college: (root) => {  //Using root here
    return db.colleges.get(root.collegeId);
  },
};
module.exports = { Query, Mutation, Student };
