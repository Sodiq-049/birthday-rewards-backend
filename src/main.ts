import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule)

  app.enableCors({
      origin: [
    "http://localhost:5173",
    "https://birthday-rewards-frontend-git-main-sodiq049s-projects.vercel.app/"
  ],
  })

  const port = process.env.PORT || 3000
  await app.listen(port)

  console.log(`🚀 Server running on port ${port}`)
}

bootstrap()
