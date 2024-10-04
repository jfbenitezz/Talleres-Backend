import { UserType } from "../user.model";
import { users } from "../user.data";

// DECLARE ACTION FUNCTION
async function readUserAction(id?: number): Promise<UserType | undefined> {
  const results =  users.find(user => user.id === Number(id));
  return results;
}

// EXPORT ACTION FUNCTION
export default readUserAction;
