import { pool } from '../../config/database.js'
import type { CreateBrandInput } from './brands.types.js'

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