import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { bootstrapNestApp } from "./bootstrap";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  bootstrapNestApp(app);
  await app.listen(9999);
}
bootstrap();
