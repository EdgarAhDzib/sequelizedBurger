# sequelizedBurger

This version of the "Burger" app uses the Sequelize package to prepare and format SQL tables.

The Sequelize query syntax is tighter and more powerful than conventional SQL statements.

Handlebars control the queried content and their presentation on the page, defined by the "/burgers" route.

As with the previous app, the user may choose to click on any "uneaten" burger to Devour it, updating its "devoured" status from false to true and thus moving it to the Devoured Delicacies column at right. Also, the user may insert their own burger variety, which will by default be added to the uneaten column at left.