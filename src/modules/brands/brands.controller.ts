import type { Request, Response } from "express";
import { createBrand, getAllBrands, getBrandById } from "./brands.service.js";

export async function createBrandController(req: Request, res: Response) {
    try {
        const { name, picture } = req.body
        const brand = await createBrand({ name, picture })
        res.status(201).json(brand)
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create brand"
        });
    }
}

export async function getAllBrandsController(req: Request, res: Response) {
    try {
        const brands = await getAllBrands()
        res.status(200).json(brands)

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to load brands"
        });
    }

}

export async function getBrandByIdController(req: Request, res: Response) {
    try {
        const { id } = req.params
        const brandId = Number(id)
        if (Number.isNaN(brandId)) {
            return res.status(400).json({
                message: "not a valid number"
            })
        }
        const brand = await getBrandById(brandId)

        if (!brand) {
            return res.status(404).json({
                message: "brand not found"
            })
        }
        return res.status(200).json(brand)


    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
    }
}