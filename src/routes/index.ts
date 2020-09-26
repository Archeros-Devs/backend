
import { Router } from 'express';
import multer from 'multer';
import multerConfig from '@config/multer';
import auth from "@config/authentication"
import AuthController from '@controllers/AuthController'
import UsuarioValidator from '@validators/UsuarioValidator'

const upload = multer(multerConfig);
const router = Router();

router.get('/', (req, res) => res.status(200).send('OK'))
router.post('/login', AuthController.login);
router.post('/cadastro', UsuarioValidator.cadastro, AuthController.cadastro);

router.use(auth)


export default router;