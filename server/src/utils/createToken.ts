import { JSON_WEB_TOKEN_SECRET } from "@/src/config/envConfig";
import jsonwebtoken from "jsonwebtoken";

export function createToken(id: string) {
  return jsonwebtoken.sign({ id: id }, JSON_WEB_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
}
