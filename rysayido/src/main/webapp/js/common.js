	function goMelaka(){
		var location="Melaka";
	}

	function goJb(){
		var location="Johor Bahru";
		
	}

	var map;
	var map2;
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 2.260882, lng: 102.222104},
			zoom: 17
		});
		
		var marker = new google.maps.Marker({
            position: new google.maps.LatLng(2.260882, 102.222104),
            map: map
        });
		
		map2 = new google.maps.Map(document.getElementById('map2'), {
			center: {lat: 1.661325, lng: 103.5841725},
			zoom: 17
		});
		
		var marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(1.661325, 103.5841725),
            map: map2
        });
	}
	
	var partnerName = [];
	// domReady
    $(function() {
        //$('html').sakura();
		$("body").sakura();
		
		var appendStr = "";
		
		$( "#partnersNo" ).change(function() {
			appendStr = "";
			currentPartnerNo = $("#partnersNo").val();
			for(i = 0; i<currentPartnerNo ; i++){
				var curPartName = "";
				
				if(partnerName.length > 0){
					if(partnerName[i] != ""){
						curPartName = partnerName[i];
					}
				}
				if(currentPartnerNo >= partnerName.length){
					for(z=0; z<=currentPartnerNo-partnerName.length ; z++){
						partnerName.push("");	
					}
				}
				appendStr += "<label class='label col-sm-6' for='pFullName"+i+"'>PARTNERS Name: </label>";
				appendStr += "<input type='text' id='pFullName"+i+"' name='pFullName"+i+"' placeholder='中文全名' value='"+curPartName+"' onchange='setPartnerName("+i+",this.value);'  class='partName input form-control col-sm-6'>";
			}
			console.log(partnerName);
			$('#partnerNameDiv').html(appendStr);
		});
		
		generateGalleryView();
    });
	
	function submitRsvp(){
		var myform = $('#rsvpForm');
		
		if(check()){
			$.post('/index', myform.serialize(), function(data) {
				alert("Thanks! ");
			});
		}
		
		/*$.getJSON('/index', function(data) {
			$('#result2').html("Hello 2, " + data.name);
		});
		
		$.post('/index', myform.serialize(), function(data) {
			alert("Thanks");
		});*/
	}
	var currentPartnerNo = 0;
	function check(){
		var isPartnerEmpty = false;
		$( ".partName" ).each(function() {
			if($(this).val() == ""){
				isPartnerEmpty = true;
			}
		});
		if(isPartnerEmpty){
			alert("One of the Partner name is empty!");
			return false;
		}
		
		if($("#fullName").val() == ""){
			alert("Please fill in Your Name!");
			return false;
		}
		
		if($("#contactNo").val() == ""){
			alert("Please fill in Contact No!");
			return false;
		}
		
		return true;
	}
	
	function setPartnerName(no, value){
		partnerName[no] = value;
	}
	
	function generateGalleryView(){
		var imgSrc = [
			"img/wedding/1.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/2.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/3.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/4.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/5.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/6.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/7.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/8.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/9.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/10.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/11.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/12.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/13.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/14.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/15.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/16.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/17.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/18.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/19.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"img/wedding/20.JPG?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
		];
		
		$('#galleryDiv').html("");
		var content = "";
		for (i=0;i<imgSrc.length;i++){
				content+='<div class="col-lg-2 col-md-3 col-xs-4">';
				content+='		<a class="thumbnail" href="#" data-image-id="" data-toggle="modal" data-title="" data-image="'+imgSrc[i]+'" data-target="#image-gallery">';
				content+='			<img class="img-thumbnail" src="'+imgSrc[i]+'" alt="Another alt text" onContextMenu="return false;">';
				content+='		</a>';
				content+='	</div>';
		}
		$('#galleryDiv').html(content);
	}