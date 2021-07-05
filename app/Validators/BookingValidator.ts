import { schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BookingValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    play_date_start: schema.date.optional({
      format: "yyyy-MM-dd",
    }),
    play_date_end: schema.date.optional({
      format: "yyyy-MM-dd",
    }),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {};
}
