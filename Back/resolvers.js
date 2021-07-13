const db = require("./db");
const jwt = require("jsonwebtoken");
const notAuth = "Unauthorized";
const Hashes = require("jshashes");

const secret = "somecoolsecretkey";

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
    console.info("The students are being called")
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
    console.info("Deleted a student with the ID: ", args.id);
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
  logInUser: async (_, args, {res}) => {
    const email = args.email;
    const password = new Hashes.SHA256().b64(args.password);
    const user = db.students.list().find((user) => user.email === email);

    if (!user) throw new Error("User does not exist");
    if (user.password != password) throw new Error("Incorect password");


    //const [accessToken, refreshToken] = await createTokens(user, secret);
    const token = await jwt.sign({userId: user.id}, secret, {expiresIn: 120});
    const refreshToken = await jwt.sign({userId: user.id}, secret, {expiresIn: 120});

    return {
      token,
      refreshToken,
    };
  },
};

const Student = {
  fullName: (root, args, context, info) => {
    return root.firstName + " " + root.lastName;
  },
  college: (root) => {
    return db.colleges.get(root.collegeId);
  },
};

const createTokens = async function (user, secret) {
  let userModel = { id: user.id };

  const refreshToken = await jwt.sign(userModel, secret, { expiresIn: 60 });

  // You can control how much of the data goes into the jwt
  //It is readable by everyone and is thus importaint to protext user information
  // Usually, you put in the id, the role and that is
  userModel = { ...db.students.get(user.id) };

  const accessToken = await jwt.sign(userModel, secret, { expiresIn: 18 });

  return [accessToken, refreshToken];
};

const refresgTokens = async function (token, refreshToken, secret) {
  let userId = -1;
  try {
    const {
      user: { id },
    } = jwt.verify(refreshToken, secret);
    userId = id;
  } catch (err) {
    return {};
  }

  const user = db.students.get(userId);

  const [newToken, newRefreshToken] = await createTokens(user, SECRET);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

module.exports = { Query, Mutation, Student };
