import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Field from "App/Models/Field";
// import Venue from "App/Models/Venue";

export default class FieldsController {
  /**
   * @swagger
   * /api/v1/fields:
   *    get:
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Fields
   *      responses:
   *        200:
   *          description: success get all data fields
   *          content:
   *            application/json:
   *              schemas:
   *                message:
   *                  type: string
   *                  example:
   *                    message: success fetch Venues
   *                data:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id: int
   *                      name: string
   *                      type: string
   *                      venue_id: int
   */

  /**
   * @swagger
   * /api/v1/fields:
   *    post:
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Fields
   *      responses:
   *        200:
   *          description: success get all data venues
   *          content:
   *            application/json:
   *              schemas:
   *                message:
   *                  type: string
   *                  example:
   *                    message: success fetch Venues
   *                data:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id: int
   *                      name: string
   *                      type: string
   *                      venue_id: string
   */

  /**
   * @swagger
   * /api/v1/fields:
   *    put:
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Fields
   *      responses:
   *        200:
   *          description: Success Updated Data Fields
   *          content:
   *            application/json:
   *              schemas:
   *                message:
   *                  type: string
   *                  example:
   *                    message: Success Updated Fields
   *                data:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id: int
   *                      name: string
   *                      type: string
   *                      venue_id: int
   */

  /**
   * @swagger
   * /api/v1/fields:
   *    delete:
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Fields
   *      responses:
   *        200:
   *          description: Deleted Fields by ID
   *          content:
   *            application/json:
   *              schemas:
   *                message:
   *                  type: string
   *                  example:
   *                    message: Success Deleted By Id
   *                data:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id: int
   *                      name: string
   *                      type: string
   *                      venue_id: int
   */
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
