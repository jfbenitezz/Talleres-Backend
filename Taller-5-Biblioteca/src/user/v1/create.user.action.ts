import { User } from "./user.model";
import { IUser } from "./user.types";

// DECLARE ACTION FUNCTION
async function createUserAction(userData: IUser): Promise<IUser> {
  if (userData.softDeleted) {
    throw new Error("Cannot create user with softDeleted set to true");
  }

  if (userData.isAdmin) {
    throw new Error("Cannot create user with isAdmin set to true");
  }

  const emailExists = await User.exists({ email: userData.email });
  if (emailExists) {
    throw new Error("Email already exists");
  }
  const newUser = await User.create(userData);
  return newUser;
}

// EXPORT ACTION FUNCTION
export default createUserAction;
