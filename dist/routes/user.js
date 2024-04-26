import { getAllUsers, createUser, getSingleUser, updateUser, exportUser, archieveUser, deleteUser, } from "../controllers/user.js";
import { Router } from "express";
const router = Router();
router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getSingleUser);
router.put("/", updateUser);
router.get("/export/:id", exportUser);
router.get("/archieve/:id", archieveUser);
router.delete("/:id", deleteUser);
export default router;
//# sourceMappingURL=user.js.map