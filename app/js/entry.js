const angular = require("angular");
const ngRoute = require("angular-route");
const studioApp = angular.module("studioApp", [ngRoute]);

require("./settings")(studioApp);
