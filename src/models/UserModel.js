import { prisma } from "../utils/prisma.js";

export class UserModel {
  /**
   * Inserts a new user register into the table
   *
   * @version 1.0
   * @param {{
   *  documentId: string;
   *  fullName: string;
   *  email: string;
   *  phone: string;
   * }} data
   * @returns {Promise<{
   *  id: number;
   *  documentId: string;
   *  email: string;
   *  phone: string;
   * }>}
   */
  async insertUser(data) {
    const user = await prisma.users.create({
      data,
      select: {
        id: true,
        documentId: true,
        fullName: true,
        email: true,
        phone: true,
      },
    });

    return user;
  }

  /**
   * Finds an user based on the document id
   * Returns null if no matches are found
   */
  async findUser(documentId) {
    const user = await prisma.users.findFirst({
      where: {
        documentId,
      },
    });

    return user;
  }

  /**
   * Finds an user based on the email
   * Returns null if no matches are found
   */
  async findUserByEmail(email) {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}
