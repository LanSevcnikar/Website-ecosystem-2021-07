const { createTokens } = require("./auth");
const notAuth = "Unauthorized";
const Hashes = require("jshashes");

//const Hashes = require('jshashes')
const Query = {
  greeting: (root, args, context, info) => {
    return "Greetings and salutations";
  },
  greetingAuth: (root, args, context, info) => {
    if (!context.user) throw new Error(notAuth);
    return "Greetings and salutations, " + context.user.first_name;
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
  deleteStudent: async function (root, args, context, info) {
    if (!context.user || context.user.role != "admin") throw new Error(notAuth);
    const tempConst = await context.pg.query('delete from students where id = $1', [args.id]);
    return 'Deleted student';
  },
  signUpUser: async function (root, args, context, info) {
    const user = await context.pg.query('select * from students where email = $1', [args.input.email]);
    if (user.rows.length > 0) throw new Error('User with same email already exists');
    const queryText = 'insert into students(first_name, last_name, email, password, role, college_id) values($1,$2,$3,$4,$5,$6) returning *';
    const queryValues = [args.input.fname, args.input.lname, args.input.email, new Hashes.SHA256().b64(args.input.password), "user", 3];
    const newUser = await context.pg.query(queryText, queryValues)
    if (newUser.rows.length > 0) return 'Success';
    throw new Error('Something went wrong');
  },
  logInUser: async (root, args, context, info) => {
    const email = args.email;
    const password = new Hashes.SHA256().b64(args.password);

    const userQuery = await context.pg.query('select * from students where email = $1', [email]);
    const user = userQuery.rows[0];

    if (!user) throw new Error("User does not exist");
    if (user.password != password) throw new Error("Incorect password");
    const [token, refreshToken] = await createTokens(user);

    return {
      token,
      refreshToken,
    };
  },
  invalidateToken: async (root, args, context, info) => {
    if (!context.user) throw new Error("There is no user to unauthenticate");
    const queryText = 'insert into invalid_tokens(token) values($1) returning *';
    const queryValues = [context.user.refreshToken];
    const newUser = await context.pg.query(queryText, queryValues)
    if(newUser.rows.length>0) return true;
    return false;
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
    return college.rows[0];
  },
};
module.exports = { Query, Mutation, Student };
