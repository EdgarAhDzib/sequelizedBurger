'use strict';

var models = require("../models");

module.exports = {
  up: function (queryInterface, Sequelize) {
    return models.burgers.bulkCreate(
          [
            {burger_name: "Captain\'s Catch", devoured:false},
            {burger_name: "Ghost Pepper Cheese", devoured:false},
            {burger_name: "Barbecue", devoured:false},
            {burger_name: "Pibil Seasoning", devoured:false},
            {burger_name: "Mushroom and Swiss", devoured:false}
          ]
        );
  },

  down: function (queryInterface, Sequelize) {
    return models.burgers.destroy({where:{burger_name: [
            "Captain\'s Catch",
            "Ghost Pepper Cheese",
            "Barbecue",
            "Pibil Seasoning",
            "Mushroom and Swiss"
        ]
      }
    });
  }
};
