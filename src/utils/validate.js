import validator from "validator";

const validateSignup = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter Name");
  } else if (!emailId) {
    throw new Error("Enter Email id");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter valid emailId");
  } else if (!password) {
    throw new Error("Enter password");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("enter strong password");
  }
};

// verif user edit

const verifyUserEdit = (req) => {
  const allowedUserEdit = [
    "firstName",
    "lastName",
    "age",
    "skills",
    "photoUrl",
    "about",
  ];

  const allowedEdit = Object.keys(req.body).every((key) =>
    allowedUserEdit.includes(key),
  );

  if (!allowedEdit) {
    throw new Error("invalid edit request");
    
    
  }else{
    return true;
  }
};

export { validateSignup, verifyUserEdit };
