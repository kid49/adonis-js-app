import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Venue from 'App/Models/Venue'
import Field from 'App/Models/Field'
import Booking from 'App/Models/Booking'

export default class User extends BaseModel {
  /**
   * @swagger
   * definitions:
   *  Register:
   *    type: object
   *    properties:
   *      name:
   *        type: string
   *      email:
   *        type: string
   *      password:
   *        type: string
   *      role:
   *        type: string
   *    required:
   *      - name
   *      - email
   *      - password
   *      - role
   */
  /**
   * @swagger
   * definitions:
   *  Login:
   *    type: object
   *    properties:
   *      email:
   *        type: string
   *      password:
   *        type: string
   *    required:
   *      - email
   *      - password
   */
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column()
  public role: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @hasMany(() => Venue)
  public venue: HasMany<typeof Venue>;

  @hasMany(() => Field)
  public field: HasMany<typeof Field>;

  @hasMany(() => Booking)
  public booking: HasMany<typeof Booking>;
}
