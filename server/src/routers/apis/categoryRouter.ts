import { Router } from 'express';
import Category from '../../models/category';
import { getCategory } from '../../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.get('/', getCategory);

export default categoryRouter;
