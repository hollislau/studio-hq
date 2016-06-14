const angular = require("angular");

module.exports = function (app) {
  app.controller("SettingsCtrl", ["$timeout", function ($timeout) {
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
        _id: 0
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
        _id: 1
      }
    ];
    this.states = ["AK", "CA", "OR", "NY", "WA"];
    this.view = "locations";
    this.btnsDisabled = true;

    this.enableBtns = function () {
      this.btnsDisabled = false;
    }.bind(this);

    this.cancel = function () {
      angular.copy(this.focus.backup, this.focus);
      this.focus = null;
      this.btnsDisabled = true;
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
      location.dropdown = false;
      this.focus = null;
      this.btnsDisabled = true;
    }.bind(this);

    this.showDropdown = function (location) {
      location.dropdown = true;
    };

    this.hideDropdown = function (location) {
      $timeout(() => {
        location.dropdown = false;
      }, 10);
    };

    this.setState = function (location, state) {
      if (location.state !== state) {
        location.state = state;
        this.btnsDisabled = false;
      }
      location.dropdown = false;
    }.bind(this);
  }]);
};
