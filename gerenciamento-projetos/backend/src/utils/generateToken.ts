import jsonwebtoken from "jsonwebtoken";
import Users from "src/database/models/users.model";

export default function generateToken(user: Partial<Users>) {
  const payload = { email: user.email, name: user.name, role: user.role };
  const secret = process.env.JWT_SECRET as string;
  const jwt = jsonwebtoken;
  return jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: "1d" });
}
