import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule)

  // CORS setup for local dev + Vercel frontend
  app.enableCors({
    origin: [
      "http://localhost:5173",
      "https://birthday-rewards-frontend.vercel.app" // ❌ removed trailing slash
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
    credentials: true, // if you need cookies/auth
  })

  const port = process.env.PORT || 3000
  await app.listen(port)

  console.log(`🚀 Server running on port ${port}`)
}

bootstrap()
