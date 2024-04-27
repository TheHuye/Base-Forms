import multer from 'multer';
// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Middleware to handle file uploads
export const uploadFile = upload.single('file'); // Assuming your file input field is named 'file'
//# sourceMappingURL=multer.js.map