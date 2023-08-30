/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("movie", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("poster_url");
    table.text("description").notNullable();
    table.decimal("rating", 3, 1).notNullable();
    table.integer("year").notNullable();
    table.integer("run_time").notNullable();
    table.string("genres").notNullable();
    table.string("imdb_id").notNullable();
    table.integer("tmdb_id").notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("movie");
};
