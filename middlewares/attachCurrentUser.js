import { userModel } from "../model/user.model.js";

export default async function attachCurrentUser(req, res, next) {
  try {
    const userData = req.auth;

    const user = await userModel.findOne(
      { _id: userData._id },
      { passwordHash: 0 }
    );

    if (!user) {
      return res.statsu(404).json("usuario nao encontrado");
    }

    req.currentUser = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
