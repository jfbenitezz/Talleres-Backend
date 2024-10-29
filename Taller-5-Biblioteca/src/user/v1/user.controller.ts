import createUserAction from "./create.user.action";
import readUserAction from "./read.user.action";
import updateUserAction from "./update.user.action";
import deleteUserAction from "./delete.user.action";

import { IUser } from "./user.types";

// DECLARE CONTROLLER FUNCTIONS
async function readUser(id: string): Promise<IUser | null> {
  return await readUserAction(id);
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
