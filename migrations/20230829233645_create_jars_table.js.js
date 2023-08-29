/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("jars", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table
      .integer("creator_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("jars");
};
