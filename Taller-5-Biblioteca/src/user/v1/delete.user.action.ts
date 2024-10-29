import { User } from "./user.model";

async function deleteUserAction(id: string): Promise<void> {
    await User.findByIdAndUpdate(id, { softDeleted: true });
}

export default deleteUserAction