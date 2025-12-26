import { diskStorage } from "multer";
import { extname } from "path";

export function fileUploadConfig(destination: string = '', maxFileSizeMB: number = 5, allowedMimeTypes: string = "jpg|jpeg|png|gif") { 
    return {
        storage: diskStorage({
            destination: './uploads/' + destination,
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
            }
        }),
        fileFilter: (req, file, cb) => {
            const mimeTypePattern = new RegExp(`/(${allowedMimeTypes})$`);
            if (mimeTypePattern.test(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('File type not allowed!'), false);
            }
        },
        limits: {
            fileSize: maxFileSizeMB * 1024 * 1024
        }
    };
}

// export const fileUploadConfig = {
//     storage: diskStorage({
//         destination: './uploads',
//         filename: (req, file, cb) => {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//             cb(null, file.fieldname + '-' + uniqueSuffix);
//         }
//     }),
//     fileFilter: (req, file, cb) => {
//         if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
//             return cb(new Error('Only image files are allowed!'), false);
//         }
//         cb(null, true);
//     },
//     limits: {
//         fileSize: 3 * 1024 * 1024, // 3 MB
//     }
// };