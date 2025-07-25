import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only image files are allowed') as unknown as null, false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: 6,
    fileSize: 5 * 1024 * 1024 // 5MB max per file
  }
});
