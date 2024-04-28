import { getAllUsers, createUser, getSingleUser, updateUser, exportUser, archieveUser, deleteUser, downloadUserDetails, searchUsers } from "../controllers/user.js"
import { Router } from "express"
import { validateUserRegister } from "../middleware/userValidation.js"
import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });




const router: Router = Router()

router.get("/", getAllUsers)
router.post("/", upload.fields([
    { name: 'passportImage' },
    { name: 'idDocument' },
    { name: 'resultSlip' }
]), createUser);
router.get("/:id", getSingleUser)
router.put("/:id", updateUser)
router.get("/export/:id", exportUser)
router.get("/archieve/:id", archieveUser)
router.delete("/:id", deleteUser)
router.get("/download/:id", downloadUserDetails)
router.get("/search", searchUsers)

export default router