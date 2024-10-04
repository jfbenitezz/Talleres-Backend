import { Router, Request, Response } from "express";
import { filterUsersByHobby, findUserById, experieceByTeam, filterUsersByFaction, writeUser } from "./user.controller";



// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function GetUsersByHobby(request: Request, response: Response) {
  const { hobby } = request.query as { hobby?: string };
  const users = await filterUsersByHobby(hobby);

  response.status(200).json({
    message: "Success.",
    users: users,
  });
}

async function getUserById(request: Request, response: Response) {
  const { id } = request.query as { id?: number };
  const user = await findUserById(id); 

  if (!user) {
    return response.status(404).json({
      message: "User not found.",
    });
  }
  response.status(200).json({
    message: "Success.",
    user: user,
  });
}

async function getExperienceByTeam(request: Request, response: Response) {
  const { team } = request.query as { team?: string };
  const results = await experieceByTeam(team);
  response.status(200).json({
    message: "Success.",
    results
  });
}

async function  getUsersByFaction(request: Request, response: Response) {
  const { faction } = request.query as { faction?: string };
  const users = await filterUsersByFaction(faction);
  response.status(200).json({
    message: "Success.",
    users
  });
}

async function createUser(request: Request, response: Response) {
  try {
    const user = await writeUser(request.body);
    response.status(201).json({
      message: "Success.",
      user: user,
    });
  } catch (error) {
    response.status(400).json({
      message: (error as Error).message || "An error occurred.",
    });
  }
}

// DECLARE ENDPOINTS
userRoutes.get("/hobby", GetUsersByHobby);
userRoutes.get("/exists", getUserById);
userRoutes.get ("/team-experience", getExperienceByTeam)
userRoutes.get ("/by-faction", getUsersByFaction)
userRoutes.post("/", createUser)
  

// EXPORT ROUTES
export default userRoutes;
