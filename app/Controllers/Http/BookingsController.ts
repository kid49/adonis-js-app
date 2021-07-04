import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Field from 'App/Models/Field'
import Booking from 'App/Models/Booking'
import BookingValidator from 'App/Validators/BookingValidator'

interface FieldInterface {
  name: string;
}

export default class BookingsController {
  /**
   * @swagger
   * /api/v1/bookings:
   *    get:
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Booking
   *      responses:
   *        200:
   *          description: success get all data booking
   *          content:
   *            application/json:
   *              schemas:
   *                message:
   *                  type: string
   *                  example:
   *                    message: success fetch booking
   *                data:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id: int
   *                      play_date_start: string
   *                      play_date_end: string
   *                      fieldId: int
   */

  /**
   * @swagger
   * /api/v1/bookings:
   *    post:
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Booking
   *      responses:
   *        200:
   *          description: success get all data booking
   *          content:
   *            application/json:
   *              schemas:
   *                message:
   *                  type: string
   *                  example:
   *                    message: success fetch booking
   *                data:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id: int
   *                      play_date_start: string
   *                      play_date_end: string
   *                      fieldId: int
   */

  /**
   * @swagger
   * /api/v1/bookings:
   *    get:
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Booking
   *      responses:
   *        200:
   *          description: success get all data booking
   *          content:
   *            application/json:
   *              schemas:
   *                message:
   *                  type: string
   *                  example:
   *                    message: success fetch booking
   *                data:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id: int
   *                      play_date_start: string
   *                      play_date_end: string
   *                      fieldId: int
   */

  /**
   * @swagger
   * /api/v1/bookings:
   *    put:
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Booking
   *      responses:
   *        200:
   *          description: success get all data booking
   *          content:
   *            application/json:
   *              schemas:
   *                message:
   *                  type: string
   *                  example:
   *                    message: success fetch booking
   *                data:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id: int
   *                      play_date_start: string
   *                      play_date_end: string
   *                      fieldId: int
   */

  /**
   * @swagger
   * /api/v1/bookings:
   *    delete:
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Booking
   *      responses:
   *        200:
   *          description: success get all data booking
   *          content:
   *            application/json:
   *              schemas:
   *                message:
   *                  type: string
   *                  example:
   *                    message: success fetch booking
   *                data:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id: int
   *                      play_date_start: string
   *                      play_date_end: string
   *                      fieldId: int
   */

  /**
   * @swagger
   * /api/v1/bookings/:id/join:
   *    put:
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Booking
   *      responses:
   *        200:
   *          description: success get all data booking
   *          content:
   *            application/json:
   *              schemas:
   *                message:
   *                  type: string
   *                  example:
   *                    message: success fetch booking
   *                data:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id: int
   *                      play_date_start: string
   *                      play_date_end: string
   *                      fieldId: int
   *                      join: int
   */
  public async index({ response }: HttpContextContract) {
    const bk = await Booking.all();
    return response.ok({ message: "You have Venues Data", data: bk });
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, auth, response, params }: HttpContextContract) {
    await request.validate(BookingValidator);
    const play_date_start = request.input("play_date_start");
    const play_date_end = request.input("play_date_end");
    const fieldId = request.input("field");

    const user = auth.user;
    const booking = await Booking.create({
      play_date_start,
      play_date_end,
      fieldId,
    });
    await booking.related("author");

    return response.ok({ message: "Success" });
  }

  public async show({ params, response }: HttpContextContract) {
    let bookings = await Booking.find(params.id);

    return response.ok({ message: "Show Data Id", data: bookings });
  }

  public async edit({ params, response }: HttpContextContract) {
    let bookings = await Booking.find(params.id);

    return response.ok({ message: "Edit Data Id", data: bookings });
  }

  public async update({ params, request, response }: HttpContextContract) {
    let bookings = await Booking.findOrFail(params.id);
    const play_date_start = request.input("play_date_start");
    const play_date_end = request.input("play_date_end");
    const fieldId = request.input("field");
    await bookings.save();
    return response.ok({ message: "Updated" });
  }

  public async destroy({ params, response }: HttpContextContract) {
    let bookings = await Booking.findOrFail(params.id);
    await bookings.delete();
    return response.ok({ message: "Deleted", data: bookings });
  }

  public async join({ params, response, request }: HttpContextContract) {
    let booking = await Booking.firstOrFail(params.id);
    const play_date_start = request.input("play_date_start");
    const play_date_end = request.input("play_date_end");
    const fieldId = request.input("field");
    const join = request.input("join");
    await booking.save();
    return response.ok({ message: "Update Join" });
  }
}
