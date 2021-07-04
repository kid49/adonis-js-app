import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserHasBookings extends BaseSchema {
  protected tableName = 'user_has_bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id')
      table.integer('booking_id').unsigned().references('bookings.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
