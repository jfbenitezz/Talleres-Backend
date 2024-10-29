import { Router, Request, Response } from "express";
import { createUser, readUser, updateUser, deleteUser } from "./user.controller";
import { IUser } from "./user.types";
import { AuthMiddleware } from "../../middleware/auth";

// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
// Admin Users will be created with function not exposed to public
async function CreateUser(request: Request<IUser>, response: Response) {
  if (request.body.email === undefined || request.body.password === undefined) {
    return response.status(400).json({
      message: "Missing fields"
    })
  }

  try {
    const users = await createUser(request.body);
    
    response.status(200).json({
      message: "Success.",
      users: users,
    })

  } catch (error) {
    response.status(500).json({
      message: "Failure creating user",
      information: (error as any).toString()
    })
  }
}

async function loginUser(request: Request, response: Response) {
  const id = request.params.id;
  if (id === undefined) {
    return response.status(400).json({
      message: "Missing id"
    })
  }

  try {
    const users = await readUser(id);
    if (users === null) {
      return response.status(404).json({
        message: "User not found."
      })
    } else {
      response.status(200).json({
        message: "Success.",
        users: users,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: "Failure reading user",
      information: (error as any).toString()
    })
  }
}

async function UpdateUser(request: Request<IUser>, response: Response) {
  const id = request.params.id;
  try {
    const users = await updateUser(id, request.body);

    if (users === null) {
       response.status(404).json({
        message: "User not found."
      })
    } else {
      response.status(200).json({
        message: "Success.",
        users: users,
      });
    }

  } catch (error) {
    response.status(500).json({
      message: "Failure updating user",
      information: (error as any).toString()
    })
  }
}

async function DeleteUser(request: Request<IUser>, response: Response) {
  const id = request.params.id;
  try {
    await deleteUser(id);
    response.status(200).json({
      message: "Success.",
    });

  } catch (error) {
    response.status(500).json({
      message: "Failure deleting user",
      information: (error as any).toString()
    })
  }
}

// DECLARE ENDPOINTS
userRoutes.post("/", CreateUser);
//When implemented jwt change action
userRoutes.get("/:id", /*AuthMiddleware*/ loginUser);
userRoutes.put("/:id", /*AuthMiddleware*/ UpdateUser);
userRoutes.delete("/:id", /*AuthMiddleware*/ DeleteUser);


// EXPORT ROUTES
export default userRoutes;
