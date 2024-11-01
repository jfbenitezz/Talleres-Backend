import createUserAction from "./create.user.action";
import readUserAction from "./read.loginUser.action";
import updateUserAction from "./update.user.action";
import deleteUserAction from "./delete.user.action";
import { IUser } from "./user.types";
import { JwtPayload } from "jsonwebtoken";

// DECLARE CONTROLLER FUNCTIONS
async function readUser(userInput: Partial<IUser>): Promise<Partial<IUser> & JwtPayload | null> {
  return await readUserAction(userInput);
}
async function createUser(userData: IUser): Promise<IUser> {
  const createdUser = await createUserAction(userData);
  return createdUser;
}

async function updateUser(id: string, updatedData: Partial<IUser>): Promise<IUser | null> {
  return await updateUserAction(id, updatedData);
}
async function deleteUser(id: string): Promise<void> {
  await deleteUserAction(id);
}

// EXPORT CONTROLLER FUNCTIONS
export { readUser, createUser, updateUser, deleteUser };
