import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Venue from 'App/Models/Venue'
// import User from 'App/Models/User'
// import Field from "App/Models/Field";
import VenueValidator from 'App/Validators/VenueValidator'

export default class VenuesController {
  public async index({ response }: HttpContextContract) {
    const venue = await Venue.query().preload("author", (authorQuery) => {
      authorQuery.select({ name: "name", email: "email" });
    });
    return response.ok({ message: "You have Venues Data", data: venue });
  }

  public async create({}: HttpContextContract) {}

  public async store({ response, auth, request }: HttpContextContract) {
    try {
      const data = await request.validate(VenueValidator);
      const newArt = new Venue();
      newArt.name = data.name;
      newArt.address = data.address;
      newArt.phone = data.phone;

      const authUser = auth.user;
      await authUser?.related("venue").save(newArt);
      return response.created({ message: "Created Success" });
    } catch (error) {
      return response.unprocessableEntity({ message: error.message });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const venue = await Venue.query().preload("author", (authorQuery) => {
      authorQuery.select({ name: "name", email: "email" });
    });
    return response.ok({
      message: "Show Data Venues " + params.id,
      data: venue,
    });
  }

  public async edit({ response, params }: HttpContextContract) {
    const venue = await Venue.find(params.id);
    return response.ok({ message: "Get Edit Data " + params.id, data: venue });
  }

  public async update({ params, response, request }: HttpContextContract) {
    let venue = await Venue.findOrFail(params.id);
    venue.name = request.input("name");
    venue.address = request.input("address");
    venue.phone = request.input("phone");
    await venue.save();
    return response.ok({ message: "Updated" });
  }

  public async destroy({ params, response }: HttpContextContract) {
    let venue = await Venue.findOrFail(params.id);
    await venue.delete();
    if (venue) {
      return response.ok({ message: "Delete success" });
    } else {
      return response.badRequest({ message: "Data Not Found", data: venue });
    }
  }
}
