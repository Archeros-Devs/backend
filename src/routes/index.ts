  
import { Router } from 'express';
import multer from 'multer';
import multerConfig from '@config/multer';
import auth from "@config/authentication"

const upload = multer(multerConfig);
const router = Router();



export default router;