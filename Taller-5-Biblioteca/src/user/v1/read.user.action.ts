import { IUser } from "./user.types";
import {User} from "./user.model";
// DECLARE ACTION FUNCTION
async function readUserAction(id: string): Promise<IUser | null> {
  return await User.findOne({ email: id, softDeleted: false });
}

// EXPORT ACTION FUNCTION
export default readUserAction;
