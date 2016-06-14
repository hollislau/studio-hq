const angular = require("angular");

module.exports = function (app) {
  app.controller("LocationCtrl", function () {
    this.locations = [
      {
        name: "Seattle, 4th & Pike",
        address: "1234 Pike St.",
        addressTwo: "Suite 1337",
        city: "Seattle",
        state: "WA",
        zip: "",
        contactEmail: "",
        replyEmail: "",
        phone: "",
        _id: 0,
        editing: false
      },
      {
        name: "Seattle, 5th & Pine",
        address: "",
        addressTwo: "",
        city: "Seattle",
        state: "WA",
        zip: "",
        contactEmail: "",
        replyEmail: "",
        phone: "",
        _id: 1,
        editing: false
      }
    ];

    this.edit = function (location) {
      if (this.focus) this.focus.editing = false;

      location.editing = true;
      this.focus = location;
    };

    this.save = function (location) {
      location.editing = false;
    };
  });
};
