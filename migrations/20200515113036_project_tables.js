
exports.up = function (knex) {
    return knex.schema
        .createTable("projects", tbl => {
            tbl.increments();

            tbl.string("name", 255).notNullable();

            tbl.text("description");

            tbl.boolean("completed").defaultTo(false);
        })
        .createTable("resources", tbl => {
            tbl.increments();

            tbl
                .string("name", 255)
                .notNullable()
                .unique();

            tbl.text("description")
        })
        .createTable("project_resources", tbl => {
            tbl.primary(["project_id", "resource_id"]);

            tbl
                .integer("project_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("projects")
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');

            tbl
            tbl
                .integer("resource_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("resources")
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');
        })
        .createTable("tasks", tbl => {
            tbl.increments();
            tbl.text("description").notNullable();

            tbl.text("notes");

            tbl.boolean("completed").defaultTo(false);

            tbl
                .integer("project_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("projects");

        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("tasks")
        .dropTableIfExists("project_resources")
        .dropTableIfExists("resources")
        .dropTableIfExists("projects");
};
