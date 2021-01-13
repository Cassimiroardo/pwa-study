import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("subscription", (table) => {
    table.increments("id").primary();
    table.string("endpoint", 255).notNullable();
    table.string("p256dhKey", 255).notNullable();
    table.string("authKey", 255).notNullable();
    table.integer("userId").notNullable();


    table.foreign("userId").references("id").inTable("users")
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("subscription");
}