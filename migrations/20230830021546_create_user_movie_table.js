/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_movie", (table) => {
    table.increments("id").primary();
    table.enu("mental_vibe", ["Neutral", "Thought-provoking", "Brainless"]);
    table.enu("emotional_vibe", ["Neutral", "Light-hearted", "Heavy-hearted"]);
    table.decimal("rating", 3, 2).defaultTo(null);
    table
      .integer("movie_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("movie")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.text("note").defaultTo(null);
    table.boolean("watched").defaultTo(false);
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_movie");
};
