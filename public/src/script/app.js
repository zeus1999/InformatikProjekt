var app = angular.module("projekt", ["ngMaterial", "ngRoute"]);

app.run(function($rootScope, $window) {
    $rootScope.open = function(url){
        $window.location.href = url;
    }
});

app.config(function($mdThemingProvider, $routeProvider, $locationProvider){

    $routeProvider
        .when("/", {
            templateUrl: "/public/views/main.html",
            controller: "navigationCtrl"
        })
        .when("/professoren", {
            templateUrl: "/public/views/professoren.html"
        })
        .when("/links", {
            templateUrl: "/public/views/links.html"
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
        "500": "2196f3",
        "600": "1d8ef1",
        "700": "1883ef",
        "800": "1479ed",
        "900": "00BCD4",
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


app.controller("navigationCtrl", function($scope){

    $scope.topics = [
        { display: "Professoren", link: "/professoren" },
        { display: "Link Sammlung", link: "/links" }
    ];

});


app.controller("linksCtrl", function($scope){

    $scope.links = [
        { display: "Professoren", link: "/professoren" },
        { display: "Link Sammlung", link: "/links" }
    ];


});