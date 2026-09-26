import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { pool } from './config/database.js'
import { BrandRouter } from './modules/brands/brands.route.js'
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Car Showroom  API is ring"
    })
})

app.get('/health/database', async (req, res) => {
    try {
        const result = await pool.query(`SELECT NOW()`)
        res.status(200).json({
            status: "ok",
            time: result.rows[0].now
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Database connection failed"
        });
    }
})
app.use('/api/brands', BrandRouter)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
