import type { Request, Response } from "express";
import { createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "./brands.service.js";

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

export async function updateBrandController(req: Request, res: Response) {
    try {
        const { id } = req.params
        const BrandId = Number(id)
        if (Number.isNaN(BrandId)) {
            return res.status(400).json({
                message: "id is not a number"
            })
        }
        const brand = await getBrandById(BrandId)
        if (!brand) {
            return res.status(404).json({
                message: "brand with this id is not exist"
            })
        }
        const updatedBrand = await updateBrand(BrandId, req.body)
        if (!updatedBrand) {
            return res.status(400).json({
                message: "No valid fields provided to update"
            })
        }
        return res.status(200).json(updatedBrand)

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update brand"
        });
    }

}

export async function deleteBrandController(req: Request, res: Response) {
    try {
        const { id } = req.params
        const brandID = Number(id)
        if (Number.isNaN(brandID)) {
            return res.status(400).json({
                message: "id is not a number"
            })
        }
        const brand = await getBrandById(brandID)
        if (!brand) {
            return res.status(404).json({
                message: "brand with this id is not exist"
            })
        }
        await deleteBrand(brandID)

        return res.status(200).json({
            message: "brand deleted Successfully"
        })

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete brand"
        });
    }

}