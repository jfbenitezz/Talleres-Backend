import { UserType } from "../user.model";
import { users } from "../user.data";

// DECLARE ACTION FUNCTION
async function filterfactionAction(faction?: string): Promise<UserType[]> {
  const results = users.filter(user => user.faction === faction);
  return results;
}

// EXPORT ACTION FUNCTION
export default filterfactionAction;
