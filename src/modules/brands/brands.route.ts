import express from 'express'
import { createBrandController, getAllBrandsController, getBrandByIdController } from './brands.controller.js'

export const BrandRouter = express.Router()

BrandRouter.post('/', createBrandController)
BrandRouter.get('/', getAllBrandsController)
BrandRouter.get('/:id', getBrandByIdController)