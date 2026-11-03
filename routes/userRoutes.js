import express from "express"
import {getAllUsers, getUser, createUser, updateUser, deleteUser} from "../controllers/userController.js"

const router = express.Router()
// ======================
// USER ROUTES
// ======================

router
  .route("/")
  .get(getAllUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

  export default router