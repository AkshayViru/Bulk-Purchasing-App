/*The importing technique is CommonJS. On frontend, node modules have been used.*/
import path from 'path' 
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors' 
import morgan from 'morgan' 
import productRoutes from './routes/productRoutes.js' 
import { notFound, errorHandler } from './middleware/errorMiddleware.js' 
import userRoutes from './routes/userRoutes.js' 
import orderRoutes from './routes/orderRoutes.js' 
import uploadRoutes from './routes/uploadRoutes.js' 
import pkg from 'cloudinary' 

const cloudinary = pkg
dotenv.config()

connectDB()

const app = express()

app.use(express.json()) 

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

app.use('/api/products', productRoutes) 
app.use('/api/users', userRoutes) 
app.use('/api/orders', orderRoutes) 
app.use('/api/upload', uploadRoutes) 

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

/*Error handling middleware*/
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000 

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)