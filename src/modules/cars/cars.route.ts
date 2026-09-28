import express from 'express'
import { createCarController, deleteCarController, getAllCarsController, getCarByIdController, updateCarController } from './cars.controller.js'


export const CarRouter = express.Router()

CarRouter.post('/', createCarController)
CarRouter.get('/', getAllCarsController)
CarRouter.get('/:id', getCarByIdController)
CarRouter.patch('/:id', updateCarController)
CarRouter.delete('/:id', deleteCarController) 