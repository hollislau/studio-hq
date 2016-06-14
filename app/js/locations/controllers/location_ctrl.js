const angular = require("angular");

module.exports = function (app) {
  app.controller("LocationCtrl", function () {
    this.locations = [
      {
        display: "Seattle, 4th & Pike",
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
        display: "Seattle, 5th & Pine",
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
    // this.locationsRef = angular.copy(this.locations);
    // console.log(this.locationsRef);
    // console.log(this.locations);
    // console.log(this.locationsRef == this.locations);
    this.disabled = true;
    //
    // this.$watchCollection(this.locations, function () {
    //   this.disabled = false;
    // });

    this.enable = function () {
      this.disabled = false;
    }.bind(this);

    this.cancel = function () {
      angular.copy(this.focus.backup, this.focus);
      this.focus = null;
      this.disabled = true;
    };

    this.edit = function (location) {
      if (location.editing) return this.cancel();
      if (this.focus) this.focus.editing = false;

      location.backup = angular.copy(location);
      location.editing = true;
      this.focus = location;
    };

    this.save = function (location) {
      location.editing = false;
      location.display = location.name;
      location.backup = null;
      this.focus = null;
      this.disabled = true;
    }.bind(this);
  });
};
