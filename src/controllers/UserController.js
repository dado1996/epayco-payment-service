import { UserModel } from "../models/UserModel.js";
import { WalletModel } from "../models/WalletModel.js";

// User class to handle route logic
export class UserController {
  /**
   * Creates a new user
   *
   * @version 1.0
   * @param {{
   *  documentId: string;
   *  fullName: string;
   *  email: string;
   *  phone: string;
   * }} data
   *
   * @returns {Promise<{
   *  status: number;
   *  message: string;
   *  data?: {
   *    id: number;
   *    documentId: string;
   *    fullName: string;
   *    email: string;
   *    phone: string;
   * }
   * }>}
   */
  async store(data) {
    const userModel = new UserModel();
    const walletModel = new WalletModel();
    const existingUser =
      (await userModel.findUser(data.documentId)) ||
      (await userModel.findUserByEmail(data.email));

    if (existingUser) {
      return {
        status: 200,
        message: "The document id or email already exists",
      };
    }

    const user = await userModel.insertUser(data);
    const wallet = await walletModel.insertWallet(user.id);
    return {
      status: 201,
      message: "User created succesfully",
      data: {
        ...user,
        ...wallet,
      },
    };
  }

  /**
   * Finds and returns 10 users based on offset value
   *
   * @param {number} offset
   */
  async find(offset) {
    const userModel = new UserModel();
    const users = await userModel.findAll(offset);

    return {
      status: 200,
      message: "Users found succesfully",
      data: users,
    };
  }
}
