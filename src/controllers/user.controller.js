import { userModel } from "../models";
import { userService } from "../mongoServices";

const signup = async (req, res) => {
  try {
    let { body } = req;
    let { password, phone, email } = body;

    let filter = {
      $or: [{ email }, { phone }],
      isDeleted: false,
      isActive: true,
    };

    const checkExistingUser = await userService.findOneQuery(filter);

    if (checkExistingUser) throw new Error("User Credentials Already In Use");

    const hashed = await hashPassword(password);

    let data = {
      ...body,
      phone,
      region,
      password: hashed,
    };

    const user = new userModel(data);
    const saveUser = await user.save();

    if (!saveUser) throw new Error("Error While Saving User");

    user &&
      res.status(200).send({
        success: true,
        message: "Your account verify successfully, You can login now",
      });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    let { body } = req;
    let { phone, password } = body;

    let filter = {
      phone: user,
    };

    const checkUser = await userService.findOneQuery(filter);
    if (!checkUser) throw new Error("User credentials not found");
    let { role, email, firstname, lastname } = checkUser;
    const verifyPassword = await comparePassword(password, checkUser.password);
    if (!verifyPassword)
      throw new Error("The phone number or password is incorrect");

    res.status(200).send({
      success: true,
      data: { token },
      message: `${role} Login Successfully`,
      role: role,
      email: email,
      firstname: firstname || "",
      lastname: lastname || "",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Logout SuccessFully",
    });
  } catch (error) {
    errorLogger(error.message || error, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message || error,
    });
  }
};

export default {
  signup,
  login,
  logout,
};
