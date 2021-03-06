import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from "@ioc:Adonis/Lucid/Database";
import Mail from "@ioc:Adonis/Addons/Mail";


export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const name = request.input("name");
    const email = request.input("email");
    const password = request.input("password");
    const role = request.input("role");

    const newUser = await User.create({ name, email, password, role });
    const otp_code = Math.floor(100000 + Math.random() * 900000);
    await Database.table("otp_codes").insert({
      otp_code: otp_code,
      user_id: newUser.id,
    });
    await Mail.send((message) => {
      message
        .from("bayu@sanberdev.com")
        .to(email)
        .subject("Verification OTP CODE")
        .htmlView("emails/otp_verification", { otp_code });
    });

    if (role == "admin") {
      return response.created({
        message: "Succesfully Register Admin",
      });
    } else {
      return response.created({
        message: "Succesfully Register Users,cek your otp confirmation",
      });
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
    });

    try {
      await request.validate({ schema: userSchema });
      const email = request.input("email");
      const password = request.input("password");

      const token = await auth.use("api").attempt(email, password);
      return response.ok({ message: "Login Successfully!", token });
    } catch (error) {
      return response.badRequest({ message: error.message });
    }
  }
}
