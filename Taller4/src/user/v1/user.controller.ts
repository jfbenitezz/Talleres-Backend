import filterHobbiesAction from "./actions/filter.hobby.action";
import readUserAction from "./actions/read.user.actiont";
import reduceExperienceByTeam from "./actions/reduce.experience.action";
import filterfactionAction from "./actions/filter.faction.action";
import writeUserAction from "./actions/write.user.action";

import { UserType } from "./user.model";

// DECLARE CONTROLLER FUNCTIONS
async function filterUsersByHobby(hobby?: string): Promise<UserType[]> {
  const users = await filterHobbiesAction(hobby);
  return users;
}

async function findUserById(id?: number): Promise<UserType | undefined> {
  const user = await readUserAction(id);
  return user;
}

async function experieceByTeam(team?: string): Promise<number> {
  const results = await reduceExperienceByTeam(team);
  return results?? 0;
}

async function filterUsersByFaction(faction?: string): Promise<UserType[]> {
  const users = await filterfactionAction(faction);
  return users;
}

async function writeUser(user: UserType): Promise<UserType | undefined> {
  const newUser = await writeUserAction(user);
  if (!newUser) {
    throw new Error("User already exists.");
  }
  return newUser;
}

// EXPORT CONTROLLER FUNCTIONS
export { filterUsersByHobby, findUserById, experieceByTeam, filterUsersByFaction, writeUser };
