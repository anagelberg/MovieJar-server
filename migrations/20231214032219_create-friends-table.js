/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("friends", (table) => {
        table.increments("id").primary();
        table
            .integer("user_id_1")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("user")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table
            .integer("user_id_2")
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
    return knex.schema.dropTable("friends");
};
