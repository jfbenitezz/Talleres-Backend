import { Router, Request, Response, NextFunction } from "express";
import { createUser, readUser, updateUser, deleteUser } from "./user.controller";
import { IUser } from "./user.types";
import { AuthMiddleware } from "../../middleware/auth";
import { requirePermissions }  from "../../middleware/permissions";
// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
const ALLOWED_PERMISSIONS = [
  "UserModifyRole",         // Allows the user to modify other users
  "UserDeleteRole",         // Allows the user to delete other users
  "BooksCreateRole",        // Allows creating books
  "BooksModifyRole",        // Allows modifying books
  "BooksDeleteRole",        // Allows deleting books
  "BooksInstanceRole"       // Allows creating instances of a book (copies)
];

//Since this is a test project, any user can have any permissions through the same endpoint
async function CreateUser(request: Request<IUser>, response: Response) {
  if (request.body.email === undefined || request.body.password === undefined) {
    return response.status(400).json({
      message: "Missing fields"
    })
  }

  const { permissions } = request.body;
  // Check if permissions are valid (assumes permissions is an array)
  if (!Array.isArray(permissions) || !permissions.every(perm => ALLOWED_PERMISSIONS.includes(perm))) {
    return response.status(400).json({
      message: "Invalid permissions"
    });
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
  const { email, password } = request.body;
  
  if (email === undefined || password === undefined) {
    return response.status(400).json({  
      message: "Missing fields"
    })
  }

  try {
    const userInput = { email, password };
    const users = await readUser(userInput);

    if (users === null) {
      return response.status(404).json({
        message: "Invalid credentials."
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

async function UpdateUser(request: Request, response: Response) {
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

async function DeleteUser(request: Request, response: Response) {
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
userRoutes.get("/login", loginUser);
userRoutes.put("/:id", AuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const jwtUserId = req.body.authorization.id;
  // Allow user to modify their own account without additional permission check
  if (jwtUserId=== userId) {
      console.log("Self-modifying");
      return UpdateUser(req, res);
  }

  // If not self-modifying, proceed with permission check
   requirePermissions(["UserModifyRole"])(req, res, next);
}, UpdateUser);

userRoutes.delete("/:id", AuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const jwtUserId = req.body.authorization.id;
  // Allow user to delete themselves without permission check
  if (jwtUserId === userId) {
      console.log("Self-deleting");
      return DeleteUser(req, res);
  }

  // If not self-deleting, proceed with permission check
  requirePermissions(["UserDeleteRole"])(req, res, next);
}, DeleteUser);


// EXPORT ROUTES
export default userRoutes;
