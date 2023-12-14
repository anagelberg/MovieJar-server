/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("user_suggestions", (table) => {
        table.increments("id").primary();
        table
            .integer("to_user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("user")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table
            .integer("from_user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("user")
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
        table.enu("suggested_mental_vibe", ["Neutral", "Thought-provoking", "Brainless"]);
        table.enu("suggested_emotional_vibe", ["Neutral", "Light-hearted", "Heavy-hearted"]);
        table.text("note");
        table.decimal("rating", 3, 1);
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("user_suggestions");
};
