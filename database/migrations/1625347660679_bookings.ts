import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bookings extends BaseSchema {
  protected tableName = 'bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('play_date_start')
      table.string('play_date_end')
      table.integer('field_id').unsigned().references('fields.id')
      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
