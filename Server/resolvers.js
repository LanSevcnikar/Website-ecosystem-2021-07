const db = require("./db");

const jwt = require("jsonwebtoken");
const { createTokens, refreshTokens } = require("./auth");
const notAuth = "Unauthorized";
const Hashes = require("jshashes");

const secret = "ImagineJeFUlKulModel";

//const Hashes = require('jshashes')
const Query = {
  greeting: async function (root, args, context, info) {
    return "Greetings and salutations";
  },
  greetingAuth: (root, args, context, info) => {
    if (!context.user) throw new Error(notAuth);
    return "Greetings and salutations, " + context.user.firstName;
  },
  getAllColleges: async function (root, args, context, info) {
    const colleges = await context.pg.query("select * from colleges");
    let colleges2 = [];
    colleges.rows.forEach((element) => {
      colleges2.push(element);
    });
    return colleges2;
  },
  getAllStudents: async function (root, args, context, info) {
    if (!context.user) throw new Error(notAuth);
    const students = await context.pg.query("select * from students");
    let students3 = [];
    students.rows.forEach((element) => {
      students3.push({
        ...element,
        firstName: element.first_name,
        lastName: element.last_name,
        collegeId: element.college_id,
      });
    });
    return students3;
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
    db.invalidatedTokens.create({ token: context.user.refreshToken });
  },
};

const Student = {
  fullName: (root, args, context, info) => {
    return root.firstName + " " + root.lastName;
  },
  college: async (root, args, context, info) => {
    //Using root here
    const collegeId = root.collegeId;
    const college = await context.pg.query(
      "select distinct * from colleges where id =" + collegeId
    );
    console.log(college.rows[0].name);
    return college.rows[0];
  },
};
module.exports = { Query, Mutation, Student };
