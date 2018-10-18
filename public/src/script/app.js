var app = angular.module("projekt", ["ngMaterial", "ngRoute", "pascalprecht.translate"]);

app.run(function($rootScope, $window, $location) {
    $rootScope.open = function(url){
        $window.location.href = url;
    }

    $rootScope.route = function(url){
        $location.path(url);
    }
});

app.config(function($mdThemingProvider, $routeProvider, $locationProvider, $translateProvider){

    $translateProvider.translations('en_US', {
        SPRACHE: 'pick your language',
        SPRACHE_DEUTSCH: "german",
        SPRACHE_AMERICAN_ENGLISCH: "english"
      });

      $translateProvider.translations('de_DE', {
        SPRACHE: 'Waehle deine Sprache',
        SPRACHE_DEUTSCH: "deutsch",
        SPRACHE_AMERICAN_ENGLISCH: "englisch"
      });

    $routeProvider
        .when("/", {
            templateUrl: "/public/views/main.html",
            controller: "navigationCtrl"
        })
        .when("/professoren", {
            templateUrl: "/public/views/professoren.html",
            controller: "profCtrl"
        })
        .when("/software", {
            templateUrl: "/public/views/professoren.html"
        })
        .when("/buch", {
            templateUrl: "/public/views/professoren.html"
        })
        .when("/dhbw", {
            templateUrl: "/public/views/dhbw.html"
        })
        .when("/freizeit", {
            templateUrl: "/public/views/professoren.html"
        })
        .when("/links", {
            templateUrl: "/public/views/links.html",
            controller: "linksCtrl"
        })
        .otherwise({
            redirectTo: "/"
        })

        $locationProvider.html5Mode(true);
      


    $mdThemingProvider.definePalette("myPalette", {
        "50": "e4f2fe",
        "100": "bce0fb",
        "200": "90cbf9",
        "300": "64b6f7",
        "400": "42a6f5",
        "500": "0072BC",/*prim*/
        "600": "1d8ef1",
        "700": "1883ef",
        "800": "1479ed",
        "900": "00a9e0",/*a*/
        "A100": "ffffff",
        "A200": "e1ecff",
        "A400": "aeccff",
        "A700": "95bcff",
        "contrastDefaultColor": "light",
        "contrastDarkColors": [
            "50",
            "100",
            "200",
            "300",
            "400",
            "A100",
            "A200",
            "A400",
            "A700"
        ],
        "contrastLightColors": [
            "500",
            "600",
            "700",
            "800",
            "900"
        ]
    });

    $mdThemingProvider.theme("default").primaryPalette("myPalette");

});


app.controller("navigationCtrl", function($scope, $translate){

    $scope.topics = [
        { display: "Professoren", link: "/professoren" },
        { display: "Software", link: "/software" },
        { display: "Buchempfehlungen", link: "/buch" },
        { display: "Freizeit / Essen", link: "/freizeit" },
        { display: "DHBW", link: "/dhbw" },
        { display: "Link Sammlung", link: "/links" }
    ];

    $scope.$watch('language', function() {
        $translate.use($scope.language);
      });
});


app.controller("linksCtrl", function($scope){

    $scope.links = [
        { display: "Professoren", link: "/professoren" },
        { display: "Link Sammlung", link: "/links" }
    ];


});


app.controller("profCtrl", function($scope, $http){

    $http.get("/rest/profs").then(function(response){
        console.log(response);
        
        $scope.profs = response.data;
    });



});


app.controller("linksCtrl", function($scope, $http){

    $http.get("/rest/links").then(function(response){
        
        $scope.links = response.data;
    });



});