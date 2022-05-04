/**
 * 
 */



var drag = angular.module('drag',[]);



drag.controller("surveyCtrl", function($scope){
	
	$scope.attempts = '';
	$scope.see = '';
	$scope.tokens = '';
	$scope.rank = '';
	$scope.badge='';
	$scope.games='';
	
	$scope.addSurvey = function() {
		 if($scope.attempts=="25"&& $scope.see=="4" && $scope.tokens=="2" &&$scope.games=="2" && $scope.badge=="3"&& $scope.rank=="1"
				) {
			 alert('Thank you! You will be now redirected to the game');
			 window.setTimeout(function(){window.location.href = '#/'}, 2000);
		 } else {
		 alert('You got something wrong. You will be redirected to the instructions again. Read them one more time and if you are still stuck, ask your instructor for help');
		 window.setTimeout(function(){window.location.href = '#/instructions'}, 2000);
		 }
		 };
	
	
});

drag.controller("mySolutionCtrl", function ($scope, startFact) {
    
    $scope.bandit.bet=0;
    
    $scope.i1=0;
    $scope.i2=0;
    $scope.i3=0;
    $scope.i4=0;
    
    var show = false;
    var show2= false;
    var show3 = false;
    var show4 = false;
     
    bet = JSON.parse(localStorage.getItem("bet"));
    
    if (bet==1)
    $scope.myStyle={'border-style': 'dashed', 'border-color' :'red' };
   	if (bet==2)
   	$scope.myStyle2={'border-style': 'dashed', 'border-color' :'red' };
   	if (bet==3)
   	$scope.myStyle3={'border-style': 'dashed', 'border-color' :'red' };
   	if (bet==4)
   	$scope.myStyle4={'border-style': 'dashed', 'border-color' :'red' };
   	
    $scope.addNum = addNum;
         $scope.originalinitz = function () {

            if (startFact.isStarted()==='true') {
                
                  $scope.isDisabled_bet=true;
                  $scope.isDisabled2_bet=true;
      			  $scope.isDisabled3_bet=true;
      			  $scope.isDisabled4_bet=true;
      			  
      			  var bet = JSON.parse(localStorage.getItem("bet"));
      			  $scope.count5 = 'No more bets allowed. You have already made a bet on arm '+ bet;
      			  if (bet==1)
      			  $scope.myStylez1={'border_style' :'dashed',
				                 'border': '#ff7f7f'};
				  if (bet==2)
				  $scope.myStylez2={'border_style' :'dashed',
				                 'border': '#ff7f7f'};
				  if (bet==3)
				  $scope.myStylez3={'border_style' :'dashed',
				                 'border': '#ff7f7f'};
				  if (bet==4)
				  $scope.myStylez4={'border_style' :'dashed',
				                 'border': '#ff7f7f'};
				  
				  
      			  
      			  
            }
                
        };
    
    
     $scope.initz = function () {

            if (startFact.isStarted()==='false') {
            	console.log(startFact.isStarted());
            	localStorage.setItem("bet", JSON.stringify(1));
            	$scope.addNum(0);
            	bet = JSON.parse(localStorage.getItem("bet"));
                $scope.myStylez1={'border_style' :'dashed',
				                 'border': '#ff7f7f'};
                
                $scope.myStyle={'border_style' :'dashed'};
                $scope.myStyle={'border': '#ff7f7f'};
                console.log($scope.myStyle);
                startFact.startApp();
            }
             else 
            {$scope.addNum(1);}
        };


             
       $scope.initz2 = function () {

            if (startFact.isStarted()==='false') {
            	console.log(startFact.isStarted());
            	localStorage.setItem("bet", JSON.stringify(2));
                $scope.addNum2(0);
                $scope.myStylez={'border_style' :'dashed',
				                 'border': '#ff7f7f'};
                startFact.startApp();
            }
            else 
            {$scope.addNum2(1);}
        };
        
        $scope.initz3 = function () {
            if (startFact.isStarted()==='false') {
            	console.log(startFact.isStarted());
            	localStorage.setItem("bet", JSON.stringify(3));
                $scope.addNum3(0);
                $scope.myStylez={'border_style' :'dashed',
				                 'border': '#ff7f7f'};
                startFact.startApp();
            }
                        else 
            {$scope.addNum3(1);}
        };
        

         $scope.initz4 = function () {

            if (startFact.isStarted()==='false') {
            	console.log(startFact.isStarted());
            	localStorage.setItem("bet", JSON.stringify(4));
                $scope.addNum4(0);
                $scope.myStylez={'border_style' :'dashed',
				                 'border': '#ff7f7f'};
                startFact.startApp();
            }
            else 
            {$scope.addNum4(1);}
        };
   
    
    
     $scope.bandit.solution = $scope.i1;
     $scope.bandit.solution = $scope.bandit.solution+"2";
     
     $scope.bandit.solution = $scope.bandit.solution.concat($scope.i2);
     $scope.bandit.solution = $scope.bandit.solution.concat("3");
     
     $scope.bandit.solution = $scope.bandit.solution.concat($scope.i3);
     $scope.bandit.solution = $scope.bandit.solution.concat("4");
     
     $scope.bandit.solution = $scope.bandit.solution.concat($scope.i4);
     $scope.bandit.solution = $scope.bandit.solution.concat("5");
     
     

      
     $scope.on = function(solutionForm, $index){
     $scope.i1=1;
     show = true;
     
     
     
     if ($scope.bandit.solution.indexOf("2")>-1)
    	 $scope.bandit.solution =     			
    	 		$scope.bandit.solution.substr(0, $scope.bandit.solution.indexOf("2")-1)+$scope.i1+$scope.bandit.solution.substr($scope.bandit.solution.indexOf("2"));
    	 			 
     else{	 
     $scope.bandit.solution = $scope.i1;
     $scope.bandit.solution = $scope.bandit.solution+"2";
     }
     $scope.isDisabled2 = true;
      $scope.isDisabled3 = true;
       $scope.isDisabled4 = true;
      $scope.bandit.solution = $scope.bandit.solution.concat($scope.bandit.bet);
      
  	  
      $scope.createSolution(solutionForm);
   }
   
      function addNum(bets)  {
       						
      console.log('ffz');
      console.log(bets);
      console.log('ffz');
      if (bets>0)
      {
      console.log('ffs');
      $scope.isDisabled2_bet=true;
      $scope.isDisabled_bet=true;
      $scope.isDisabled3_bet=true;
       $scope.isDisabled4_bet=true;
      $scope.count5 = 'you can only place a bet once';
      alert('sorry, you have already placed a bet');
      }
      else
      {
      
      $scope.count = 'Bet on Arm 1';
      alert('Fingers crossed! You made a bet on Arm 1');

      $scope.bandit.bet =1;
      $scope.isDisabled2_bet=true;
      $scope.isDisabled3_bet=true;
      $scope.isDisabled_bet=true;
      }
	};
     
   
      
   
   $scope.off = function(){
     show = false;$scope.i1=0;

     if ($scope.bandit.solution.indexOf("2")>-1)
    	 $scope.bandit.solution =     			
    	 		$scope.bandit.solution.substr(0, $scope.bandit.solution.indexOf("2")-1)+$scope.i1+$scope.bandit.solution.substr($scope.bandit.solution.indexOf("2"));
    	 			 
     else{	 
     $scope.bandit.solution = $scope.i1;
     $scope.bandit.solution = $scope.bandit.solution+"2";
     }
 	 $scope.isDisabled2 = false;
     $scope.isDisabled3 = false;
     $scope.isDisabled4 = false;
     
   } 

     $scope.on2 = function(solutionForm){
     $scope.i2=1;
     show2 = true;
     if ($scope.bandit.solution.indexOf("3")>-1)
    	 $scope.bandit.solution =     			
    	 		$scope.bandit.solution.substr(0, $scope.bandit.solution.indexOf("3")-1)+$scope.i2+
    	 		$scope.bandit.solution.substr($scope.bandit.solution.indexOf("3"));
    	 			 
     else{	 
     $scope.bandit.solution = $scope.i2;
     $scope.bandit.solution = $scope.bandit.solution+"3";
     }
     
      $scope.isDisabled = true;
      $scope.isDisabled3 = true;
      $scope.isDisabled4 = true;
      $scope.bandit.solution = $scope.bandit.solution.concat($scope.bandit.bet);
     
      $scope.createSolution(solutionForm);
      
      }
	$scope.addNum2 = (bets) => {
	 
	if (bets>0)
      {
      $scope.isDisabled3_bet=true;
      $scope.isDisabled_bet=true;
      $scope.isDisabled2_bet=true;
      $scope.isDisabled4_bet=true;
      $scope.count5 = 'sorry, you have already placed a bet';
      }
      else{
      $scope.count2 = 'Bet placed on arm 2';
      $scope.bandit.bet =2;
      alert('Fingers crossed! You made a bet on Arm 2');
      $scope.isDisabled_bet=true;
      $scope.isDisabled3_bet=true;
      $scope.isDisabled2_bet=true;
      $scope.isDisabled4_bet=true;
}      }

   $scope.off2 = function(){
     show2 = false;$scope.i2=0;
     if ($scope.bandit.solution.indexOf("3")>-1)
    	 $scope.bandit.solution =     			
    	 		$scope.bandit.solution.substr(0, $scope.bandit.solution.indexOf("3")-1)+$scope.i2+
    	 		$scope.bandit.solution.substr($scope.bandit.solution.indexOf("3"));
    	 			 
     else{	 
     $scope.bandit.solution = $scope.i2;
     $scope.bandit.solution = $scope.bandit.solution+"3";
     }
     $scope.isDisabled = false;
     $scope.isDisabled3 = false;
     $scope.isDisabled4 = false;
     
     }
   

   $scope.on3 = function(solutionForm){
     $scope.i3=1;
     show3 = true;
     if ($scope.bandit.solution.indexOf("4")>-1)
    	 $scope.bandit.solution =     			
    	 		$scope.bandit.solution.substr(0, $scope.bandit.solution.indexOf("4")-1)+$scope.i3+
    	 		$scope.bandit.solution.substr($scope.bandit.solution.indexOf("4"));
    	 			 
     else{	 
     $scope.bandit.solution = $scope.i3;
     $scope.bandit.solution = $scope.bandit.solution+"4";
     }
     
      $scope.isDisabled = true;
      $scope.isDisabled2 = true;
      $scope.isDisabled4 = true;
      $scope.bandit.solution = $scope.bandit.solution.concat($scope.bandit.bet);
      $scope.createSolution(solutionForm);
      
      }
      
      $scope.addNum3 = (bets) => {
  
      if (bets>0)
      {
      $scope.isDisabled_bet=true;
      $scope.isDisabled2_bet=true;
      $scope.isDisabled3_bet=true;
      $scope.isDisabled4_bet=true;
      $scope.count5 = 'sorry, you have already placed a bet';
      }
      else
      {
      $scope.count3 = 'Bet placed on arm 3';
      $scope.bandit.bet =3;
      alert('Fingers crossed! You made a bet on Arm 3');
      $scope.isDisabled2_bet=true;
      $scope.isDisabled_bet=true;
      $scope.isDisabled3_bet=true;
      $scope.isDisabled4_bet=true;
      }
      }

   $scope.off3 = function(){
     show3 = false;$scope.i3=0;
     if ($scope.bandit.solution.indexOf("4")>-1)
    	 $scope.bandit.solution =     			
    	 		$scope.bandit.solution.substr(0, $scope.bandit.solution.indexOf("4")-1)+$scope.i3+
    	 		$scope.bandit.solution.substr($scope.bandit.solution.indexOf("4"));
    	 			 
     else{	 
     $scope.bandit.solution = $scope.i3;
     $scope.bandit.solution = $scope.bandit.solution+"4";
     }
     $scope.isDisabled2 = false;
     $scope.isDisabled = false;
     $scope.isDisabled4 = false;
     
     }
   
     
     $scope.on4 = function(solutionForm){
     $scope.i4=1;
     show4 = true;
     if ($scope.bandit.solution.indexOf("5")>-1)
    	 $scope.bandit.solution =     			
    	 		$scope.bandit.solution.substr(0, $scope.bandit.solution.indexOf("5")-1)+$scope.i4+
    	 		$scope.bandit.solution.substr($scope.bandit.solution.indexOf("5"));
    	 			 
     else{	 
     $scope.bandit.solution = $scope.i4;
     $scope.bandit.solution = $scope.bandit.solution+"5";
     }
      $scope.isDisabled = true;
      $scope.isDisabled2 = true;
      $scope.isDisabled3 = true;
      $scope.bandit.solution = $scope.bandit.solution.concat($scope.bandit.bet);
      $scope.createSolution(solutionForm);
      
      }
      
      $scope.addNum4 = (bets) => {
  
      if (bets>0)
      {
      $scope.isDisabled2_bet=true;
      $scope.isDisabled_bet=true;
      $scope.isDisabled3_bet=true;
      $scope.isDisabled4_bet=true;
      $scope.count5 = 'sorry, you have already placed a bet';
      }
      else
      {
      $scope.count4 = 'Bet placed on arm 4';
      $scope.bandit.bet =4;
      alert('Fingers crossed! You made a bet on Arm 4');
      $scope.isDisabled_bet=true;
      $scope.isDisabled2_bet=true;
      $scope.isDisabled3_bet=true;
      $scope.isDisabled4_bet=true;
      }
      }

   $scope.off4 = function(){
     show4 = false;$scope.i4=0;
     if ($scope.bandit.solution.indexOf("5")>-1)
    	 $scope.bandit.solution =     			
    	 		$scope.bandit.solution.substr(0, $scope.bandit.solution.indexOf("5")-1)+$scope.i4+
    	 		$scope.bandit.solution.substr($scope.bandit.solution.indexOf("5"));
    	 			 
     else{	 
     $scope.bandit.solution = $scope.i4;
     $scope.bandit.solution = $scope.bandit.solution+"5";
     }
     $scope.isDisabled2 = false;
     $scope.isDisabled = false;
     $scope.isDisabled3 = false;
     
     }
     
     
   
     
   $scope.showButton = function(){
     return show;
       }
  
   $scope.showButton2 = function(){
     return show2;
       
    }
   
   $scope.showButton3 = function(){
	     return show3;
	       
	    }
      $scope.showButton4 = function(){
	     return show4;
	       
	    }
 
   
 
});



drag.controller('DragDropCtrl', function($scope) {
	$scope.handleDrop = function(item, bin) {
	  
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
    	
	    function readwhatever(name, varb) {
    		var nameEQ = name;
    		var ca = varb;
    		for(var i=0;i < ca.length;i++) {
    			var c = ca[i];
    			while (c.charAt(0)==' ') c = c.substring(1,c.length);
    			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    		}
    		return null;
    	}
	    
    	
    	
    	var a = item; 
    	var aa = a.substring(0, a.indexOf("="));
    	
    	var c = bin;
    	var cc = c.substring(c.indexOf("bin")+3, c.length);
    	
    	
    	if (cc.length===1) var y = aa.concat(cc);
    	
    	if ($scope.conference.solution) 
    		
    	{ 
    		if ($scope.bandit.solution.indexOf(cc)>-1) 
    			$scope.bandit.solution =     			
    		$scope.bandit.solution.substr(0, $scope.bandit.solution.indexOf(cc)-1)+aa+$scope.bandit.solution.substr($scope.bandit.solution.indexOf(cc));
    		else $scope.bandit.solution = $scope.bandit.solution.concat(y);
    		}
    		
    		else $scope.bandit.solution = y;
    	
    	  
    	//bin.droppable('option', 'disabled', true);
	}
});

drag.directive('draggable', function() {
	
	    return function(scope, element) {
	        // this gives us the native JS object
	        var el = element[0];
	     
	        el.draggable = true;
	        
	        el.addEventListener(
	            'dragstart',
	            function(e) {
	                e.dataTransfer.effectAllowed = 'move';
	                e.dataTransfer.setData('Text', this.id);
	                this.classList.add('drag');
	                return false;
	            },
	            false
	        );

	        el.addEventListener(
	            'dragend',
	            function(e) {
	                this.classList.remove('drag');
	                return false;
	            },
	            false
	        );
	    }
	});

drag.directive('droppable', function() {
    return {
        scope: {
        	  drop: '&',
        	  bin: '='
        },
        link: function(scope, element) {
            // again we need the native object
            var el = element[0];
            
            el.addEventListener(
            	    'dragover',
            	    function(e) {
            	        e.dataTransfer.dropEffect = 'move';
            	        // allows us to drop
            	        if (e.preventDefault) e.preventDefault();
            	       
            	        this.classList.add('over');
            	        return false;
            	    },
            	    false
            	);
            el.addEventListener(
            	    'dragenter',
            	    function(e) {
            	    	if (e.preventDefault) e.preventDefault();
            	    	this.classList.add('over');
            	        
            	        
            	        return false;
            	    },
            	    false
            	);

            	el.addEventListener(
            	    'dragleave',
            	    function(e) {
            	        this.classList.remove('over');
            	        this.classList.remove('drop');
            	        return false;
            	    },
            	    false
            	);
            	el.addEventListener(
            		    'drop',
            		    function(e) {
            		        // Stops some browsers from redirecting.
            		    		
            		        if (e.stopPropagation) e.stopPropagation();
            		        if(e.preventDefault) { e.preventDefault(); } 
            		        this.classList.remove('over');
            		        var binId=this.id;
            		        var item = document.getElementById(e.dataTransfer.getData('Text'));
            		        if ( this.hasChildNodes() ) { 
            		        	  this.removeChild( this.childNodes[0] );
            		        	}
            		        this.classList.add('drop');
            		        this.appendChild(item);
            		        scope.$apply(function(scope) {
            		            var fn = scope.drop();
            		            if ('undefined' !== typeof fn) {
            		              fn(item.id, binId);
            		            }
            		            //binId.droppable('option', 'disabled', true);
            		        });
            		        return false;
            		    },
            		    false
            		);
            
        }
    }
});
