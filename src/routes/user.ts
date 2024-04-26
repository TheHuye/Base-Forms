import { getAllUsers, createUser, getSingleUser, updateUser, exportUser, archieveUser, deleteUser, downloadUserDetails, } from "../controllers/user.js"
import { Router } from "express"

const router: Router = Router()

router.get("/", getAllUsers)
router.post("/", createUser)
router.get("/:id", getSingleUser)
router.put("/:id", updateUser)
router.get("/export/:id", exportUser)
router.get("/archieve/:id", archieveUser)
router.delete("/:id", deleteUser)
router.get("/download/:id", downloadUserDetails)

export default router


