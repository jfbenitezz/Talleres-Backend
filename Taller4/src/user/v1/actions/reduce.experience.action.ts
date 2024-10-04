import { UserType } from "../user.model";
import { users } from "../user.data";

// DECLARE ACTION FUNCTION
async function reduceExperienceByTeam(team?: string): Promise<number> {
    const totalYears = users
    .filter(user => user.team === team)
    .reduce((acc, user) => acc + (user.years || 0), 0);
  return totalYears;
}

// EXPORT ACTION FUNCTION
export default reduceExperienceByTeam;
