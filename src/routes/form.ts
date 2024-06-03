import { getAllFormSubmissions, createSubmission, getSingleFormSubmission, updateSubmission, exportFormSubmission, archieveFormSubmission, deleteFormSubmission, downloadSubmissionDetails, searchFormSubmissions } from "../controllers/form.js"
import { Router } from "express"
import { validateFormSubmission } from "../middleware/formValidation.js"
import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });




const router: Router = Router()

router.get("/", getAllFormSubmissions)
router.post(
    "/",
    upload.fields([
        { name: 'passportImage' },
        { name: 'idDocument' },
        { name: 'resultSlip' }
    ]),
    validateFormSubmission,
    createSubmission
);
router.get("/:id", getSingleFormSubmission)
router.put("/:id", updateSubmission)
router.get("/export/:id", exportFormSubmission)
router.get("/archieve/:id", archieveFormSubmission)
router.delete("/:id", deleteFormSubmission)
router.get("/download/:id", downloadSubmissionDetails)
router.get("/search", searchFormSubmissions)
export default router