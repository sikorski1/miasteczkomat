import { pgTable, serial, text, integer, timestamp, primaryKey, pgEnum, foreignKey } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const dormitoryEnum = pgEnum("dormitory_enum", [
    "DS18 Odyseja", "DS19 Apollo", "DS15 Maraton", "DS16 Itaka", "DS17 Arkadia",
    "DS4 Filutek", "DS5 Strumyk", "DS6 Bratek", "DS7 Zaścianek", "DS8 Stokrotka",
    "DS9 Omega", "DS10 Hajduczek", "DS11 Bonus", "DS12 Promyk", "DS13 Straszny Dwór",
    "DS1 Olimp", "DS2 Babilon", "DS3 Akropol", "DS14 Kapitol", "DS Alfa"
]);

export const dormitories = pgTable("dormitories", {
    name: dormitoryEnum("name").primaryKey(),
    address: text("address").notNull()
});

export const rooms = pgTable(
    "rooms",
    {
        number: integer("number").notNull(),
        dormitory: dormitoryEnum("dormitory").notNull().references(() => dormitories.name, { onDelete: "cascade" }),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.number, table.dormitory] }),
    })
);


export const persons = pgTable("persons", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    surname: text("surname"),
    phoneNumber: text("phone_number").notNull(),
    instaUrl: text("insta_url"),
    fbUrl: text("fb_url"),
    dormitory: dormitoryEnum("dormitory").notNull(),
    number: integer("number").notNull(),
}, (table) => ({
    fk: foreignKey({
        columns: [table.dormitory, table.number], 
        foreignColumns: [rooms.dormitory, rooms.number],
    })
}));

export const currencyEnum = pgEnum("currency_enum", ["PLN", "EUR", "Waluta Studencka"]);


export const actionTypeEnum = pgEnum("action_type_enum", ["sprzedaż", "wymiana", "pożyczę"]);

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    photoUrl: text("photo_url"),
    price: integer("price").notNull(),
    currency: currencyEnum("currency").notNull(),
    description: text("description"),
    category: text("category"),
    person_id: integer("person_id").notNull().references(() => persons.id, { onDelete: "cascade" }),
    actionType: actionTypeEnum("action_type").notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`)
});



// Relations
export const dormitoriesRelations = relations(dormitories, ({ many }) => ({
    rooms: many(rooms)
}));

export const roomsRelations = relations(rooms, ({ one, many }) => ({
    dormitory: one(dormitories, { fields: [rooms.dormitory], references: [dormitories.name] }),
    persons: many(persons)
}));

export const personsRelations = relations(persons, ({ one, many }) => ({
    room: one(rooms, { fields: [persons.number, persons.dormitory], references: [rooms.number, rooms.dormitory] }),
    products: many(products)
}));

export const productsRelations = relations(products, ({ one }) => ({
    owner: one(persons, { fields: [products.person_id], references: [persons.id] })
}));