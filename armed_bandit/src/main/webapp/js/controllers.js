'use strict';

/**
 * The root conferenceApp module.
 *
 * @type {banditApp|*|{}}
 */
var banditApp = banditApp || {};

/**
 * @ngdoc module
 * @name banditControllers
 *
 * @description
 * Angular module for controllers.
 *
 */
banditApp.controllers = angular.module('banditControllers', ['ui.bootstrap']);

/**
 * @ngdoc controller
 * @name MyProfileCtrl
 *
 * @description
 * A controller used for the My Profile page.
 */



banditApp.controllers.controller('MyProfileCtrl',
    function ($scope, $log, HTTP_ERRORS) {
        $scope.submitted = false;
        $scope.loading = false;

        /**
         * The initial profile retrieved from the server to know the dirty state.
         * @type {{}}
         */
        $scope.initialProfile = {};

        /**
         * Candidates for the teeShirtSize select box.
         * @type {string[]}
         */
        
        /**
         * Initializes the My profile page.
         * Update the profile if the user's profile has been stored.
         */
        $scope.init = function () {
            var retrieveProfileCallback = function () {
                $scope.profile = {};
                $scope.loading = true;
                gapi.client.conference.getProfile().
                    execute(function (resp) {
                        $scope.$apply(function () {
                            $scope.loading = false;
                            if (resp.error) {
                                // Failed to get a user profile.
                            } else {
                                // Succeeded to get the user profile.
                                $scope.profile.displayName = resp.result.displayName;
          
                                $scope.initialProfile = resp.result;
                            }
                        });
                    }
                );
            };
            if (true) {
                var modalInstance = showLoginModal();
                modalInstance.result.then(retrieveProfileCallback);
            } else {
                retrieveProfileCallback();
            }
        };

        /**
         * Invokes the conference.saveProfile API.
         *
         */
        $scope.saveProfile = function () {
            $scope.submitted = true;
            $scope.loading = true;
            gapi.client.bandit.saveProfile($scope.profile).
                execute(function (resp) {
                    $scope.$apply(function () {
                        $scope.loading = false;
                        if (resp.error) {
                            // The request has failed.
                            var errorMessage = resp.error.message || '';
                            $scope.messages = 'Failed to update a profile : ' + errorMessage;
                            $scope.alertStatus = 'warning';
                            $log.error($scope.messages + 'Profile : ' + JSON.stringify($scope.profile));

                            if (resp.code && resp.code == HTTP_ERRORS.UNAUTHORIZED) {
                                showLoginModal();
                                return;
                            }
                        } else {
                            // The request has succeeded.
                        	 var sId =  $scope.profile.displayName;
                             writeCookie('sessionId', sId, 0);
                            $scope.messages = 'The profile has been updated';
                            $scope.alertStatus = 'success';
                            $scope.submitted = false;
                            $scope.initialProfile = {
                                displayName: $scope.profile.displayName,
                                
                            };

                            $log.info($scope.messages + JSON.stringify(resp.result));
                            window.location.href = '#/solution/create';
                        }
                    });
                });
        
        
        
            function writeCookie(displayName,value,days) {
                var date, expires;
                if (days) {
                    date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    expires = "; expires=" + date.toGMTString();
                        }else{
                    expires = "";
                }
                document.cookie = displayName + "=" + value + expires + "; path=/";
             
                      };
        
        
        };
    })
;



/**
 * @ngdoc controller
 * @name CreateSolution
 *
 * @description
 * A controller used for the Create conferences page.
 */

banditApp.controllers.controller('CreateSolution',
    function ($scope, $log, HTTP_ERRORS, $timeout, $rootScope) {

        /**
         * The conference object being edited in the page.
         * @type {{}|*}
         */
        $scope.bandit = $scope.bandit || {};
        $scope.bet2 = $rootScope.bets; 

	 	$scope.messag = 'Choose an arm!';
        /**
         * Invokes the conference.createConference API.
         *
         * @param conferenceForm the form object.
         */
        $scope.createSolution = function (solutionForm) {
            	function readCookie(name) {
        		var nameEQ = name + "=";
        		var ca = document.cookie.split(';');
        		for(var i=0;i < ca.length;i++) {
        			var c = ca[i];
        			while (c.charAt(0)==' ') c = c.substring(1,c.length);
        			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        		}
        		return null;
        	}
        	
        	$scope.bandit.organizerUserId=readCookie('sessionId');
                	
            
            gapi.client.bandit.createsolutions($scope.bandit, $timeout).
                execute(function (resp) {
                	console.log(solutionForm);
                    $scope.$apply(function () {
                        $scope.loading = false;
                        if (resp.error) {
                            // The request has failed.
                            var errorMessage = resp.error.message || '';
                            $scope.messages = 'Failed to get a score : ' + errorMessage;
                            $scope.alertStatus = 'warning';
                            $log.error($scope.messages + 'solution : ' + JSON.stringify($scope.conference));

                            if (resp.code && resp.code == HTTP_ERRORS.UNAUTHORIZED) {
                           showLoginModal();
                                return;
                            }
                        } else {
                            // The request has succeeded.
                            
                            if (resp.result.bet>0)
                            {$scope.messages = 'Your earnings this round: ' + resp.result.fitness[0] + 'the bank took: ' + resp.result.fitness[1]+ ' and you made a bet on arm ' + resp.result.bet;
                            }
                            else
                            {
                            $scope.messages = 'Your earnings this round: ' + resp.result.fitness[0] + 'the bank took: ' + resp.result.fitness[1];
                            }
                            if (resp.result.order==23)   
                        	{
                        		$scope.messages = 'Your earnings this round: ' + resp.result.fitness[0] + 'the bank took: ' + resp.result.fitness[1]+ ' you have one more attempt left';
                        		
                        	}
                            
                            if (resp.result.order>23)   
                            	{
                            		$scope.messages = 'Your earnings this round: ' + resp.result.fitness[0] + 'the bank took: ' + resp.result.fitness[1]+' this game is over. sorry. thank you so much for playing!';
                                    window.setTimeout(function(){window.location.href = '#/thankyou'}, 2000);

                            	}
                            if (resp.result.fitness==32)
                            	
                            	{
                            	$scope.messages = 'Solution has been evaluated. Your score is: ' + resp.result.fitness+' you win! you are truly and unmistakably awesome!!';
                        		
                            	 $scope.alertStatus = 'success';
                                 $scope.submitted = false;
                                 $scope.bandit = {};
                                 $log.info($scope.messages + ' : ' + JSON.stringify(resp.result));
                            	window.setTimeout(function(){window.location.href = '#/thankyou'}, 4000);
                        		
                            	
                            	}
                            else{
                            $scope.alertStatus = 'success';
                            $scope.submitted = false;
                            $scope.bandit = {};
                            $log.info($scope.messages + ' : ' + JSON.stringify(resp.result)); 
                            window.setTimeout(function(){location.reload()},4000)
                            }}
                    });
                });
        };
    });


/**
 * @ngdoc controller
 * @name ShowSolutionCtrl
 *
 * @description
 * A controller used for the Show conferences page.
 */
 
 


banditApp.controllers.controller('ShowSolutionCtrl', function ($scope, $log, HTTP_ERRORS) {

    /**
     * Holds the status if the query is being executed.
     * @type {boolean}
     */
    $scope.submitted = false;

    $scope.selectedTab = 'ALL';

    /**
     * Holds the filters that will be applied when queryConferencesAll is invoked.
     * @type {Array}
     */
    $scope.filters = [
    ];

    $scope.filtereableFields = [
/*        {enumValue: 'CREATED', displayName: 'Created by'},
        {enumValue: 'LIKES', displayName: 'Likes'},*/
        {enumValue: 'RANK', displayName: 'Rank'},
        {enumValue: 'SCORE', displayName: 'Score'}
    ]

    /**
     * Possible operators.
     *
     * @type {{displayName: string, enumValue: string}[]}
     */
    $scope.operators = [
        {displayName: '=', enumValue: 'EQ'},
        {displayName: '>', enumValue: 'GT'},
        {displayName: '>=', enumValue: 'GTEQ'},
        {displayName: '<', enumValue: 'LT'},
        {displayName: '<=', enumValue: 'LTEQ'},
        {displayName: '!=', enumValue: 'NE'}
    ];

    /**
     * Holds the conferences currently displayed in the page.
     * @type {Array}
     */
    $scope.bandits = [];

    /**
     * Holds the state if offcanvas is enabled.
     *
     * @type {boolean}
     */
    $scope.isOffcanvasEnabled = false;

    /**
     * Sets the selected tab to 'ALL'
     */
    $scope.tabAllSelected = function () {
        $scope.selectedTab = 'ALL';
        $scope.querySolutions();
    };

    /**
     * Sets the selected tab to 'YOU_HAVE_CREATED'
     */
    $scope.tabYouHaveCreatedSelected = function () {
        $scope.selectedTab = 'YOU_HAVE_CREATED';
        if (!cookie.document) {
         showLoginModal();
            return;
        }
        $scope.querySolutions();
    };

    /**
     * Sets the selected tab to 'YOU_WILL_ATTEND'
     */
    $scope.tabYouWillAttendSelected = function () {
        $scope.selectedTab = 'YOU_WILL_ATTEND';
        if (!oauth2Provider.signedIn) {
            oauth2Provider.showLoginModal();
            return;
        }
        $scope.querySolutions();
    };

    /**
     * Toggles the status of the offcanvas.
     */
    $scope.toggleOffcanvas = function () {
        $scope.isOffcanvasEnabled = !$scope.isOffcanvasEnabled;
    };

    /**
     * Namespace for the pagination.
     * @type {{}|*}
     */
    $scope.pagination = $scope.pagination || {};
    $scope.pagination.currentPage = 0;
    $scope.pagination.pageSize = 20;
    /**
     * Returns the number of the pages in the pagination.
     *
     * @returns {number}
     */
    $scope.pagination.numberOfPages = function () {
        return Math.ceil($scope.bandits.length / $scope.pagination.pageSize);
    };

    /**
     * Returns an array including the numbers from 1 to the number of the pages.
     *
     * @returns {Array}
     */
    $scope.pagination.pageArray = function () {
        var pages = [];
        var numberOfPages = $scope.pagination.numberOfPages();
        for (var i = 0; i < numberOfPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    /**
     * Checks if the target element that invokes the click event has the "disabled" class.
     *
     * @param event the click event
     * @returns {boolean} if the target element that has been clicked has the "disabled" class.
     */
    $scope.pagination.isDisabled = function (event) {
        return angular.element(event.target).hasClass('disabled');
    }

    /**
     * Adds a filter and set the default value.
     */
    $scope.addFilter = function () {
        $scope.filters.push({
            field: $scope.filtereableFields[0],
            operator: $scope.operators[0],
            value: ''
        })
    };

    /**
     * Clears all filters.
     */
    $scope.clearFilters = function () {
        $scope.filters = [];
    };

    /**
     * Removes the filter specified by the index from $scope.filters.
     *
     * @param index
     */
    $scope.removeFilter = function (index) {
        if ($scope.filters[index]) {
            $scope.filters.splice(index, 1);
        }
    };

    /**
     * Query the conferences depending on the tab currently selected.
     *
     */
    $scope.querySolutions = function () {
      
        $scope.$apply(function(){
        	
        	  $scope.submitted = false;
       
        	$scope.getSolutionsCreated();
        })
    };

    $scope.init = function()
    {	$scope.submitted = false;
    	 $scope.getConferencesCreated();
    }
    
    /**
     * Invokes the conference.queryConferences API.
     */
    

    /**
     * Invokes the conference.getConferencesCreated method.
     */


    /**
     * Retrieves the conferences to attend by calling the conference.getProfile method and
     * invokes the conference.getConference method n times where n == the number of the conferences to attend.
     */
    $scope.getSolutionsCreated = function () {
      
        
        function readCookie(name) {
    		var nameEQ = name + "=";
    		var ca = document.cookie.split(';');
    		for(var i=0;i < ca.length;i++) {
    			var c = ca[i];
    			while (c.charAt(0)==' ') c = c.substring(1,c.length);
    			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    		}
    		return null;
    	}
    	
    	var rganizerUserId=readCookie('sessionId');
    	
        gapi.client.bandit.getSolutionsCreated({user:rganizerUserId}).
            execute(function (resp) {
                $scope.$apply(function () {
                    if (resp.error) {
                        // The request has failed.
                        var errorMessage = resp.error.message || '';
                        $scope.messages = 'Failed to query : ' + errorMessage;
                        $scope.alertStatus = 'warning';
                        $log.error($scope.messages);

                        if (resp.code && resp.code == HTTP_ERRORS.UNAUTHORIZED) {
                            oauth2Provider.showLoginModal();
                            return;
                        }
                    } else {
                        // The request has succeeded.
                        $scope.bandits = resp.result.items;
                        $scope.loading = false;
                        $scope.messages = 'Query succeeded : Solutions you have liked and added';
                        $scope.alertStatus = 'success';
                        $log.info($scope.messages);
                    }
                    $scope.submitted = true;
                });
            });
    };
});



/**
 * @ngdoc controller
 * @name RootCtrl
 *
 * @description
 * The root controller having a scope of the body element and methods used in the application wide
 * such as user authentications.
 *
 */
banditApp.controllers.controller('RootCtrl', function ($scope, $location, oauth2Provider) {

    /**
     * Returns if the viewLocation is the currently viewed page.
     *
     * @param viewLocation
     * @returns {boolean} true if viewLocation is the currently viewed page. Returns false otherwise.
     */
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    /**
     * Returns the OAuth2 signedIn state.
     *
     * @returns {oauth2Provider.signedIn|*} true if siendIn, false otherwise.
     */
    $scope.getSignedInState = function () {
        return oauth2Provider.signedIn;
    };

    /**
     * Calls the OAuth2 authentication method.
     */
    $scope.signIn = function () {
        oauth2Provider.signIn(function () {
            gapi.client.oauth2.userinfo.get().execute(function (resp) {
                $scope.$apply(function () {
                    if (resp.email) {
                        oauth2Provider.signedIn = true;
                        $scope.alertStatus = 'success';
                        $scope.rootMessages = 'Logged in with ' + resp.email;
                    }
                });
            });
        });
    };

    /**
     * Render the signInButton and restore the credential if it's stored in the cookie.
     * (Just calling this to restore the credential from the stored cookie. So hiding the signInButton immediately
     *  after the rendering)
     */
    $scope.initSignInButton = function () {
        gapi.signin.render('signInButton', {
            'callback': function () {
                jQuery('#signInButton button').attr('disabled', 'true').css('cursor', 'default');
                if (gapi.auth.getToken() && gapi.auth.getToken().access_token) {
                    $scope.$apply(function () {
                        oauth2Provider.signedIn = true;
                    });
                }
            },
            'clientid': oauth2Provider.CLIENT_ID,
            'cookiepolicy': 'single_host_origin',
            'scope': oauth2Provider.SCOPES
        });
    };

    /**
     * Logs out the user.
     */
    $scope.signOut = function () {
        oauth2Provider.signOut();
        $scope.alertStatus = 'success';
        $scope.rootMessages = 'Logged out';
    };

    /**
     * Collapses the navbar on mobile devices.
     */
    $scope.collapseNavbar = function () {
        angular.element(document.querySelector('.navbar-collapse')).removeClass('in');
    };

});


/**
 * @ngdoc controller
 * @name OAuth2LoginModalCtrl
 *
 * @description
 * The controller for the modal dialog that is shown when an user needs to login to achive some functions.
 *
 */
banditApp.controllers.controller('OAuth2LoginModalCtrl',
    function ($scope, $modalInstance, $rootScope, oauth2Provider) {
        $scope.singInViaModal = function () {
            oauth2Provider.signIn(function () {
                gapi.client.oauth2.userinfo.get().execute(function (resp) {
                    $scope.$root.$apply(function () {
                        oauth2Provider.signedIn = true;
                        $scope.$root.alertStatus = 'success';
                        $scope.$root.rootMessages = 'Logged in with ' + resp.email;
                    });

                    $modalInstance.close();
                });
            });
        };
    });

