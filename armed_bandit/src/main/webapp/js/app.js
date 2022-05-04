'use strict';

/**
 * @ngdoc object
 * @name banditApp
 * @requires $routeProvider
 * @requires conferenceControllers
 * @requires ui.bootstrap
 *
 * @description
 * Root app, which routes and specifies the partial html and controller depending on the url requested.
 *
 */
var app = angular.module('banditApp',
	    ['banditControllers', 'ngRoute', 'ui.bootstrap', 'drag', 'modalTest']).
	    config(['$routeProvider',
	        function ($routeProvider) {
	            $routeProvider.
	                when('/conference/create', {
	                    templateUrl: '/partials/create_solution.html',
	                    controller: 'CreateSolution'
	                }).
	                when('/solution/create', {
	                    templateUrl: '/partials/create_solution.html',
	                    controller: 'CreateSolution'
	                }).
	                when('/conference/detail/:websafeConferenceKey', {
	                    templateUrl: '/partials/conference_detail.html',
	                    controller: 'ConferenceDetailCtrl'
	                }).
	                when('/solution/detail/:websafeConferenceKey', {
	                    templateUrl: '/partials/solution_detail.html',
	                    controller: 'SolutionDetailCtrl'
	                }).
	                when('/profile', {
	                    templateUrl: '/partials/profile.html',
	                    controller: 'MyProfileCtrl'
	                }).
	                when('/', {
	                    templateUrl: '/partials/home.html'
	                }).
	                when('/transition', {
	                    templateUrl: '/partials/transition.html',
	                    controller: 'transitionCtrl'
	                }).
	                when('/thankyou', {
	                    templateUrl: '/partials/thankyou.html'
	                }).
	                
	                when('/survey', {
	                    templateUrl: '/partials/survey.html'
	                }).
	                when('/instructions', {
	                    templateUrl: '/partials/instructions.html'
	                }).
	                when('/surveyz', {
	                	templateUrl: 'partials/modal_instructions.html',
	                	controller: 'surveyCtrl'
	                	}).
	                otherwise({
	                    redirectTo: '/'
	                });
	        }]);

/**
 * @ngdoc filter
 * @name startFrom
 *
 * @description
 * A filter that extracts an array from the specific index.
 *
 */
app.filter('startFrom', function () {
    /**
     * Extracts an array from the specific index.
     *
     * @param {Array} data
     * @param {Integer} start
     * @returns {Array|*}
     */
    var filter = function (data, start) {
        return data.slice(start);
    }
    return filter;
});


/**
 * @ngdoc constant
 * @name HTTP_ERRORS
 *
 * @description
 * Holds the constants that represent HTTP error codes.
 *
 */
app.constant('HTTP_ERRORS', {
    'UNAUTHORIZED': 401
});


/**
 * @ngdoc service
 * @name oauth2Provider
 *
 * @description
 * Service that holds the OAuth2 information shared across all the pages.
 *
 */
app.factory('oauth2Provider', function ($modal) {
    var oauth2Provider = {
        CLIENT_ID: 'replace with your client id',
        SCOPES: 'https://www.googleapis.com/auth/userinfo.email profile',
        signedIn: false
    };

    /**
     * Calls the OAuth2 authentication method.
     */
    oauth2Provider.signIn = function (callback) {
        gapi.auth.signIn({
            'clientid': oauth2Provider.CLIENT_ID,
            'cookiepolicy': 'single_host_origin',
            'accesstype': 'online',
            'approveprompt': 'auto',
            'scope': oauth2Provider.SCOPES,
            'callback': callback
        });
    };

    /**
     * Logs out the user.
     */
    oauth2Provider.signOut = function () {
        gapi.auth.signOut();
        // Explicitly set the invalid access token in order to make the API calls fail.
        gapi.auth.setToken({access_token: ''})
        oauth2Provider.signedIn = false;
    };

    /**
     * Shows the modal with Google+ sign in button.
     *
     * @returns {*|Window}
     */
    oauth2Provider.showLoginModal = function() {
        var modalInstance = $modal.open({
            templateUrl: '/partials/login.modal.html',
            controller: 'OAuth2LoginModalCtrl'
        });
        return modalInstance;
    };

    return oauth2Provider;
});

app.factory('startFact',function(){

        if (localStorage.getItem("token"))
        {
        isStarted=true;} 
        else 
        {var isStarted=false;
        localStorage.setItem("token", isStarted);
}
        return{
            isStarted: function(){
            	isStarted= localStorage.getItem("token");
            	console.log(isStarted);
            	console.log(localStorage.token);
            	return isStarted;
            },

            startApp: function(){
            	isStarted = true;
                console.log(isStarted);
                localStorage.setItem("token", "true");
                console.log(localStorage.token);
            },
        };
    });

