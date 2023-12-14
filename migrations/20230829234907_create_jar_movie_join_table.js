/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("jar_movie_join", (table) => {
    table.increments("id").primary();
    table
      .integer("jar_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("jar")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("movie_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("movie")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("added_by")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("jar_movie_join");
};
