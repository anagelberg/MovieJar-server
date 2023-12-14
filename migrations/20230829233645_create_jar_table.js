/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("jar", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table
      .integer("creator_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user");
    table.enu("viewing_permission", ["Public", "Private"]);
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("jar");
};
