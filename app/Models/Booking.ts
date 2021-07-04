import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Field from 'App/Models/Field'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public play_date_start: DateTime;

  @column()
  public play_date_end: DateTime;

  @column()
  public fieldId: number;

  @column()
  public join: number;

  @column()
  public userId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>;

  @hasMany(() => Field)
  public field: HasMany<typeof Field>;
}
