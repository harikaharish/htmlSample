// When the document is ready
var date1,date2,days,startdate,enddate;
$(document).ready(function () {
    $("#carwash").hide();
    $(".order-summary").hide();
    $('#carwashforluxarycars').hide();

    $('#startdate').datepicker({
        format: "mm/dd/yyyy"            
    });  

	$('#enddate').datepicker({
		format: "mm/dd/yyyy"
	});

	$('#cartype').change(function(){
		var carwash;
		var cartype = $('#cartype').val();
	 	var text = $( "#cartype option:selected").text();
	 	//console.log("cartype:" + cartype);
	 	$('#insurancetext').html("$ "+carinsurancecosts(cartype)+" / day for Collision Insurance");
	 	if(cartype === 'luxury'){
	 		$("#carwash").show();
	 	}else{
	 		$("#carwash").hide();
	 	}
	 	
	}); 

	function carinsurancecosts(cartype){
		if(cartype === 'compact'){
			return 17;	
		} else if (cartype === 'mid') {
			return 22;
		} else {
			return 28;
		}
	}

	$('#submitbutton').click(function(){

		var cartype = $('#cartype').val();
		var cartext = $( "#cartype option:selected").text();
		var city = $('#city').val();
		var cityname = $( "#city option:selected").text();
		
		
		$('#selectedCar').append (cartext);
		$('#selectedCity').append (cityname);
		//giftcard();

		var giftcard;
            if($('#giftcard').is(':checked')) { 
                giftcard = 100;
                console.log("giftcard:" + giftcard);
            } else {
                giftcard = 0;
                console.log("giftcard:" + giftcard);

            }
            $('#giftcardforgas').append ("$ "+giftcard);

            var carwash = 0;
            var carwashforluxarycars;
            	if($('#checkboxid').is(':checked')){
            		$("#carwashforluxarycars").show();
            		carwash=50;
            	}else {
            		$("#carwashforluxarycars").hide();
            	}

            	var insurance = 0;

            	if ($('#insurancecheckbox') . is(':checked')){
            		insurance  = carinsurancecosts(cartype);
            		console.log("insurance:" + insurance);
            	}
            	$('#carinsurance').append ("$ "+insurance);

            	var discount;
		 		startdate = $('#startdate').val();
				console.log("StartDate:" + startdate);
		    	enddate = $('#enddate').val();
				console.log("EndDate:" + enddate);
				if (!(Date.parse(startdate) || Date.parse(enddate))) {
				  //Not a valid date
				  alert("Start and End dates have to be provided");
				} else {
					if(null ==startdate && null == enddate){
						alert("Start and End dates have to be provided");
						return;
					}
					days = days_between(startdate , enddate);
					
					var todayAsDate = new Date();
					var today = (todayAsDate.getMonth() + 1) + '/' + todayAsDate.getDate() + '/' + todayAsDate.getFullYear()
					var startDateDiff = days_between(today, startdate);
					var endDateDiff = days_between(today, enddate);

					if(days < 1){ 
						alert("Car has to be rented for at least a day");
						return ;
					} else if(startDateDiff < 0){
						alert("Car cannot be rented for a past date");
						return ;
					} else if(endDateDiff < 0){
						alert("Car cannot be rented for a past date");
						return ;
					} else {
						console.log("days"+days);

		            	var carrent;
						if(cartype === 'compact'){
							carrent = days * 29.99;	
							console.log("carrentdays"+ days);
							console.log("carrent:" + carrent);
						} else if (cartype === 'mid') {
							carrent = days * 39.99;
							console.log("carrent:" + carrent);
						} else {
							carrent = days * 49.99;
							console.log("carrent:" + carrent);
						}
						//var totalrent = (Math.round( carrent * 100 )/100 ).toString()
						//carrent.toFixed(2);
						$('#carrentperday').append ("$ "+carrent.toFixed(2));

		            	var surcharge = surchargeCalculation(cartype,city,carrent);
		            	//var totalsurcharge = (Math.round( surcharge * 100 )/100 ).toString()
						//surcharge.toFixed(2);
		            	$('#totalsurcharge').append ("$ "+surcharge.toFixed(2));

		            	if (days>= 15 && days<30){
		            		discount = (carrent + surcharge )* 10/100;
		            		console.log("discount: "+discount);
		            	}else if(days >= 30){
		            		discount = (carrent+surcharge ) * 20/100;
		            		console.log("discount"+discount);
		            	}else{
		            		discount = 0;
		            		console.log("discount"+discount);
		            	}

		            	$('#totaldiscount').append ("$ "+discount.toFixed(2));
		            	$('#noofdays').append (days);

		            	var totalcost = (carrent + surcharge + insurance + giftcard + carwash) - discount;
		            	console.log("insurancetotalcost" + carrent + " "+surcharge + " " +  insurance + " " +giftcard + " " + discount + " " + carwash);
		            	console.log("totalcost" + totalcost);
		            	//var totalcarrent = (Math.round( totalcost * 100 )/100 ).toString()
						//totalcost.toFixed(2);
		            	$('#totalamounttobepaid').append ("$ "+totalcost.toFixed(2));
		            	$(".order-summary").show();
		            	$('#submitbutton').attr("disabled","true");
	            	}

				}
			});

	$('#cartype').change(function(){
		
		var cartype = $('#cartype').val();
		console.log("cartype:" + cartype);
		
	});

	$('#city').change(function(){
		var city = $('#city').val();
		console.log("city:" + city);
	});

	function surchargeCalculation(cartype,city,carrent){
		console.log("entering surcharge calculation ");
		console.log("cartype:" + cartype);
		console.log("cartype:" + cartype);
		console.log("carrentinsurcharge:" + carrent);
		//$('#selectedCar').text(car)
		var surcharge;
		//var carrent;
		if(cartype === 'compact' && city === 'sf' || city === 'la'){
			surcharge = carrent * 15/100;
			console.log("surcharge:" + surcharge);
		}else if(cartype === 'compact' && city === 'luxury'){
			surcharge =  carrent * 10/100;
			console.log("surcharge:" + surcharge);
		}else if(cartype === 'mid' && city === 'sf' || city === 'la'){
			surcharge = carrent* 15/100;	
			console.log("surcharge:" + surcharge);
		}else if(cartype === 'mid' && city === 'luxury'){
			surcharge = carrent * 10/100;
			console.log("surcharge:" + surcharge);
		}else if(cartype === 'luxury' && city === 'sf' || city === 'la'){
			surcharge = carrent* 15/100;	
			console.log("surcharge:" + surcharge);
		}else {
			surcharge = carrent* 10/100;
			console.log("surcharge:" + surcharge);
			(Math.round( surcharge * 100 )/100 ).toString();
			surcharge.toFixed(2);
		}
		return surcharge;
	}

	function days_between(startdate,enddate) {

            var date1 = new Date(startdate);
            console.log(startdate+"date1"+ date1);
            var date2 = new Date(enddate);
            console.log(enddate+"date2"+ date2);

            return days_diff(date1, date2);

        }

	function days_diff(date1, date2) {
            // The number of milliseconds in one day
            var ONE_DAY = 1000 * 60 * 60 * 24;
            console.log("date1"+ date1);
            console.log("date2"+ date2);

            // Convert both dates to milliseconds
            var date1_ms = date1.getTime();
            var date2_ms = date2.getTime();

            // Calculate the difference in milliseconds
            var difference_ms = date2_ms - date1_ms;
            console.log("difference"+ Math.round(difference_ms / ONE_DAY))
            // Convert back to days and return
            return Math.round(difference_ms / ONE_DAY);
	}

});