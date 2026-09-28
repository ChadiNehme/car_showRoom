import type { Request, Response } from "express";
import { createCar, deleteCar, getAllCars, getCarById, updateCar } from "./cars.service.js";

export async function createCarController(req: Request, res: Response) {
    try {
        const car = await createCar(req.body)
        res.status(201).json(car)
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create car"
        });
    }
}

export async function getAllCarsController(req: Request, res: Response) {
    try {
        const cars = await getAllCars()
        res.status(200).json(cars)
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to load cars"
        });
    }
}

export async function getCarByIdController(req: Request, res: Response) {
    try {
        const { id } = req.params
        const carId = Number(id)
        if (Number.isNaN(carId)) {
            return res.status(400).json({
                message: "id is not a number"
            })
        }
        const car = await getCarById(carId)
        if (!car) {
            return res.status(404).json({
                message: "car with this id is not exist"
            })
        }

        return res.status(200).json(car)

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to load car"
        });
    }
}

export async function updateCarController(req: Request, res: Response) {
    try {
        const { id } = req.params
        const carId = Number(id)
        if (Number.isNaN(carId)) {
            return res.status(400).json({
                message: "id is not a number"
            })
        }
        const car = await getCarById(carId)
        if (!car) {
            return res.status(404).json({
                message: "car with this id is not exist"
            })
        }
        const updatedCar = await updateCar(carId, req.body)
        if (!updatedCar) {
            return res.status(400).json({
                message: "No valid fields provided to update"
            })
        }
        return res.status(200).json(updatedCar)
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update car"
        });
    }

}

export async function deleteCarController(req: Request, res: Response) {
    try {
        const { id } = req.params
        const carId = Number(id)
        if (Number.isNaN(carId)) {
            return res.status(400).json({
                message: "id is not a number"
            })
        }
        const car = await getCarById(carId)
        if (!car) {
            return res.status(404).json({
                message: "car with this id is not exist"
            })
        }
        await deleteCar(carId)

        return res.status(200).json({
            message: "car deleted Successfully"
        })

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete car"
        });
    }

}