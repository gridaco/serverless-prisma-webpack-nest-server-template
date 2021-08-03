import { ValidationPipe } from "@nestjs/common";
import { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";

/**
 * bootstrap config nest app for both lambda and default nest server usage
 * @param app
 * @returns
 */
export function bootstrapNestApp(app: INestApplication): INestApplication {
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  return app;
}
