import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bookings extends BaseSchema {
  protected tableName = 'bookings'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.boolean('join').defaultTo('join')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.boolean('join')
    })
  }
}
