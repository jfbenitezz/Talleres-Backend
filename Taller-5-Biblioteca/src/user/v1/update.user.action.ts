import { User } from "./user.model";
import { IUser } from "./user.types";

async function updateUserAction(id: string, updatedData: Partial<IUser>): Promise<IUser | null> {
   const user = await User.findById(id);
   if (user === null) return null;
   // Use save to make sure the hash is updated
   Object.assign(user, updatedData);
   const updatedUser = await user.save();
   return updatedUser
}

export default updateUserAction