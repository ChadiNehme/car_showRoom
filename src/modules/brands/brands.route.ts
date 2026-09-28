import express from 'express'
import { createBrandController, deleteBrandController, getAllBrandsController, getBrandByIdController, updateBrandController } from './brands.controller.js'

export const BrandRouter = express.Router()

BrandRouter.post('/', createBrandController)
BrandRouter.get('/', getAllBrandsController)
BrandRouter.get('/:id', getBrandByIdController)
BrandRouter.patch('/:id', updateBrandController)
BrandRouter.delete('/:id', deleteBrandController)