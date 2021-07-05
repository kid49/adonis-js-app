import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Field from "App/Models/Field";

export default class FieldsController {

  public async index({ response }: HttpContextContract) {
    const venue = await Field.query().preload("author", (authorQuery) => {
      authorQuery
        .select({ name: "name", email: "email" })
        .preload("venue", (VenueQuery) => {
          VenueQuery.select({
            name: "name",
            address: "address",
            phone: "phone",
          });
        });
    });
    return response.ok({ message: "You have Fields Data", data: venue });
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      // await request.validate(FieldValidator);
      const storeField = new Field();
      storeField.name = request.input("name");
      storeField.type = request.input("type");
      storeField.venueId = request.input("venue");
      const authUser = auth.user;
      // const venue = await Venue.related('tempat').save(storeField);
      await authUser?.related("field").save(storeField);
      return response.created({ message: "Created Success" });
    } catch (error) {
      return response.unprocessableEntity({ message: error.message });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const field = await Field.query().preload("author", (authorQuery) => {
      authorQuery
        .select({ name: "name", email: "email" })
        .preload("venue", (VenueQuery) => {
          VenueQuery.select({
            name: "name",
            address: "address",
          });
        });
    });
    return response.ok({ message: "Show field" + params.id, data: field });
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, response, request }: HttpContextContract) {
    let field = await Field.findOrFail(params.id);
    field.name = request.input("name");
    field.type = request.input("type");
    await field.save();
    return response.ok({ message: "Updated" });
  }

  public async destroy({ params, response }: HttpContextContract) {
    let field = await Field.findOrFail(params.id);
    await field.delete();
    if (field) {
      return response.ok({ message: "Delete success" });
    } else {
      return response.badRequest({ message: "Data Not Found", data: field });
    }
  }
}
