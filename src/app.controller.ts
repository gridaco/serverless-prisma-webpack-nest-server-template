import { Controller, Get, Redirect } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect("https://accounts.grida.co", 301)
  getHello() {
    return { url: "https://accounts.grida.co" };
  }
}
