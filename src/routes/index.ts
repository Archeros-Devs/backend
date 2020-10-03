
import { Router } from 'express';
import multer from 'multer';
import multerConfig from '@config/multer';
import { authUser, authAdmin } from "@config/authentication"
import AuthController from '@controllers/AuthController'
import UsuarioValidator from '@validators/UsuarioValidator'
import ProfissoesController from '@controllers/ProfissoesController'
import CategoriasController from '@controllers/CategoriasController';
import PastaController from '@controllers/PastaController';
import PastaValidators from '@validators/PastaValidators';
import AdministradoresController from '@controllers/AdministradoresController';
import UsuarioController from '@controllers/UsuarioController';

const upload = multer(multerConfig);
const router = Router();

router.get('/', (req, res) => res.status(200).send('OK'))
router.post('/login', AuthController.login);
router.post('/cadastro', UsuarioValidator.cadastro, AuthController.cadastro);

router.get('/profissoes', ProfissoesController.index);
router.get('/categorias', CategoriasController.index);

router.get('/usuarios', authAdmin, UsuarioController.index);
router.get('/administradores', authAdmin, AdministradoresController.index);

router.get('/pastas', authUser, PastaController.index);
router.post('/pastas', authUser, PastaValidators.criar, PastaController.store);
router.get('/pastas/:id_pasta', authUser, PastaController.show);
router.put('/pastas/:id_pasta/avaliar', authUser, PastaValidators.avaliacao, PastaController.avaliar);


export default router;