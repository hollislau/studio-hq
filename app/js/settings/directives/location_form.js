module.exports = function (app) {
  app.directive("locationForm", () => {
    return {
      restrict: "EAC",
      templateUrl: "templates/locations/directives/location_form.html",
      require: "^ngController",
      replace: true,
      scope: {
        location: "=",
        states: "="
      },
      link: function (scope, element, attrs, controller) {
        scope.enableBtns = controller.enableBtns;
        scope.save = controller.save;
        scope.showDropdown = controller.showDropdown;
        scope.hideDropdown = controller.hideDropdown;
        scope.setState = controller.setState;
      }
    };
  });
};
