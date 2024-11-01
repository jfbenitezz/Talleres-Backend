import { IUser } from "./user.types";
import { User } from "./user.model";
import { generateToken } from "../../middleware/auth";
import { JwtPayload } from "jsonwebtoken";

async function loginUserAction(userInput: Partial<IUser>): Promise<Partial<IUser> & JwtPayload | null> {
  const user = await User.findOne({ email: userInput.email });
  if (!user) {
    return null;
  }
  
  // Use comparePassword to validate the password
  const isMatch = await user.comparePassword(userInput.password || '');
  if (isMatch) {
    const token = await generateToken(user);
    // Only send back the name and the token
    return { name: user.name, token };
  }
  return null;
}

export default loginUserAction;
