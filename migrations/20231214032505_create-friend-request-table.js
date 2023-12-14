/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("friend_request", (table) => {
        table.increments("id").primary();
        table
            .integer("from_user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("user")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table
            .integer("to_user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("user")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("friend_request");
};
