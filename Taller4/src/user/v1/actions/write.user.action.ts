import { UserType } from "../user.model";
import { users } from "../user.data";


async function writeUserAction(user: UserType): Promise<UserType | undefined> {
    if (users.some(u => u.id === user.id)) {
        throw new Error("User already exists.");
    }
    users.push(user);
    return user;
}

export default writeUserAction