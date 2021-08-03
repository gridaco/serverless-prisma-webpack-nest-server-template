import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getServiceStatus(): string {
    return "Accounts service is running. for browser access, visit https://accounts.grida.co";
  }
}
