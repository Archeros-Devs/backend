
import { Router } from 'express';
import multer from 'multer';
import multerConfig from '@config/multer';
import { authUser, authAdmin } from "@config/authentication"
import AuthController from '@controllers/AuthController'
import UsuarioValidator from '@validators/UsuarioValidator'
import ProfissoesController from '@controllers/ProfissoesController'
import CategoriasController from '@controllers/CategoriasController';
import EscolaridadesController from '@controllers/EscolaridadesController';
import PastaController from '@controllers/PastaController';
import PastaValidators from '@validators/PastaValidators';
import AdministradoresController from '@controllers/AdministradoresController';
import UsuarioController from '@controllers/UsuarioController';
import EstudoController from '@controllers/EstudoController';
import EstudoValidators from '@validators/EstudoValidators';
import CrudController from '@controllers/CrudController';
import Cidade from '@entity/Cidade';

const upload = multer(multerConfig);
const router = Router();

router.get('/', (req, res) => res.status(200).send('OK'))
router.post('/login', AuthController.login);

router.get('/profissoes', ProfissoesController.index);
router.get('/categorias', CategoriasController.index);
router.get('/escolaridades', EscolaridadesController.index);
router.get('/cidades', CrudController.index(Cidade));

router.post('/usuarios', UsuarioValidator.cadastro, UsuarioController.create);
router.get('/usuarios', authAdmin, UsuarioController.index);
router.get('/usuarios/:id_usuario', authUser, UsuarioController.show)
router.delete('/usuarios/:id_usuario', authAdmin, UsuarioController.banir)
router.get('/administradores', authAdmin, AdministradoresController.index);

router.get('/pastas', authUser, PastaController.index);
router.post('/pastas', authUser, PastaValidators.criar, PastaController.store);
router.get('/pastas/:id_pasta', authUser, PastaController.show);
router.put('/pastas/:id_pasta/avaliar', authUser, PastaValidators.avaliacao, PastaController.avaliar);
router.put('/pastas/:id_pasta/seguir', authUser, PastaController.seguir);

router.get('/pastas/:id_pasta/estudos', authUser, EstudoController.index);
router.post('/pastas/:id_pasta/estudos', authUser, EstudoValidators.store, EstudoController.store);


export default router;