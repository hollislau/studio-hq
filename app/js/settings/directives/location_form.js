module.exports = function (app) {
  app.directive("locationForm", () => {
    return {
      restrict: "EAC",
      templateUrl: "templates/locations/directives/location_form.html",
      require: "^ngController",
      replace: true,
      scope: {
        location: "="
      },
      link: function (scope, element, attrs, controller) {
        scope.enable = controller.enable;
        scope.save = controller.save;
      }
    };
  });
};
