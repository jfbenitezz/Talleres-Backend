import { UserType } from "../user.model";
import { users } from "../user.data";

// DECLARE ACTION FUNCTION
async function filterHobbiesAction(hobby?: string): Promise<UserType[]> {
  const results = users.filter(user => user.hobbies?.includes(hobby as string));
  return results;
}

// EXPORT ACTION FUNCTION
export default filterHobbiesAction;
