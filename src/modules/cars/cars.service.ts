import { pool } from '../../config/database.js'
import type { CreateCarInput } from './cars.types.js'

export async function createCar(input: CreateCarInput) {
    const result = await pool.query(
        `INSERT INTO cars (brand_id, model, year, price, picture, description)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, brand_id, model, year, price, picture, description,created_at
        `, [input.brand_id, input.model, input.year, input.price, input.picture ?? null, input.description ?? null]
    )

    return result.rows[0]
}

export async function getAllCars() {
    const result = await pool.query(`
        SELECT
        c.id,
        c.model,
        c.year,
        c.price,
        c.picture,
        c.description,
        c.created_at,
        b.id AS brand_id,
        b.name AS brand_name
        FROM cars c
        JOIN brands b ON c.brand_id = b.id
        ORDER BY c.created_at DESC;
        `)
    return result.rows
}

export async function getCarById(id: number) {
    const result = await pool.query(`
        SELECT 
        c.id,
        c.model,
        c.year,
        c.price,
        c.picture,
        c.description,
        c.created_at,
        b.name AS brand_name
        FROM cars c
        JOIN brands b ON c.brand_id= b.id
        WHERE c.id=$1 
        `, [id])
    return result.rows[0]

}

import type { UpdateCarInput } from "./cars.types.js";

export async function updateCar(id: number, input: UpdateCarInput) {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (input.brand_id !== undefined) {
        values.push(input.brand_id);
        fields.push(`brand_id = $${values.length}`);
    }

    if (input.model !== undefined) {
        values.push(input.model);
        fields.push(`model = $${values.length}`);
    }

    if (input.year !== undefined) {
        values.push(input.year);
        fields.push(`year = $${values.length}`);
    }

    if (input.price !== undefined) {
        values.push(input.price);
        fields.push(`price = $${values.length}`);
    }

    if (input.picture !== undefined) {
        values.push(input.picture);
        fields.push(`picture = $${values.length}`);
    }

    if (input.description !== undefined) {
        values.push(input.description);
        fields.push(`description = $${values.length}`);
    }

    if (fields.length === 0) {
        return undefined;
    }

    values.push(id);

    const result = await pool.query(
        `
        UPDATE cars
        SET ${fields.join(", ")}
        WHERE id = $${values.length}
        RETURNING id, brand_id, model, year, price, picture, description, created_at
        `,
        values
    );

    return result.rows[0];
}

export async function deleteCar(id: number) {
    const result = await pool.query(`
                DELETE FROM cars WHERE id=$1     
                RETURNING id, brand_id, model, year, price, description, picture, created_at  
            `, [id])
    return result.rows[0]

}