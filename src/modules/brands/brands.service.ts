import { pool } from '../../config/database.js'
import type { CreateBrandInput, UpdateBrandInput } from './brands.types.js'

export async function createBrand(input: CreateBrandInput) {
    const result = await pool.query(
        `INSERT INTO brands (name, picture)
        VALUES ($1,$2)
        RETURNING id,name,picture,created_at
        `,
        [input.name, input.picture ?? null]

    );
    return result.rows[0]

}

export async function getAllBrands() {
    const result = await pool.query(`
            SELECT id, name, picture, created_at
            FROM brands
            ORDER BY created_at DESC;
        `)
    return result.rows //rows is the array of returning rows from postgres each row is an object

}

export async function getBrandById(id: number) {
    const result = await pool.query(`
            SELECT id, name, picture, created_at
            FROM brands
            WHERE id=$1;
        `, [id]
    )
    return result.rows[0]
}

export async function updateBrand(id: number, input: UpdateBrandInput) {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (input.name !== undefined) {
        values.push(input.name)
        fields.push(`name = $${values.length}`)
    }
    if (input.picture !== undefined) {
        values.push(input.picture)
        fields.push(`picture = $${values.length}`)
    }
    if (fields.length === 0) {
        return undefined;
    }

    values.push(id)

    const result = await pool.query(
        `
        UPDATE brands
        SET ${fields.join(", ")}
        WHERE id = $${values.length}
        RETURNING id, name, picture, created_at
        `,
        values
    );
    return result.rows[0]
}

export async function deleteBrand(id: number) {
    const result = await pool.query(`
        DELETE FROM brands WHERE id=$1
        RETURNING id, name, picture, created_at 
        `, [id])
    return result.rows[0]

}