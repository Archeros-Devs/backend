
import { Router } from 'express';
import multer from 'multer';
import multerConfig from '@config/multer';
import auth from "@config/authentication"
import AuthController from '@controllers/AuthController'
import UsuarioValidator from '@validators/UsuarioValidator'
import ProfissoesController from '@controllers/ProfissoesController'
import CategoriasController from '@controllers/CategoriasController';

const upload = multer(multerConfig);
const router = Router();

router.get('/', (req, res) => res.status(200).send('OK'))
router.post('/login', AuthController.login);
router.post('/cadastro', UsuarioValidator.cadastro, AuthController.cadastro);

router.get('/profissoes', ProfissoesController.index);
router.get('/categorias', CategoriasController.index);

router.use(auth)


export default router;