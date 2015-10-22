$(document).ready(function() {
	
	/********************************
	** Loading animation
	********************************/
	
	$('.loader').hide();
	
	
	/********************************
	** Editable fields functions
	********************************/
	
	$('.editable-fields, .editable-fields-new').mouseenter(function(){
    	$(this).next().toggle();
	}).mouseleave(function(){
    	$(this).next().toggle();
	});
	
	$('.editable-fields').click(function(){
		if ($(this).children(':first').hasClass('changeable')) {
			$(this).children(':first').hide();
			$(this).children(':last').show();
			$(this).parent().next().show();
		} else {
			$(this).children().attr('contenteditable','true').focus().css('background', '#fff');
		}
	});
	
	$('.editable-fields-new').click(function(){
		if ($(this).children(':first').hasClass('changeable')) {
			$(this).children(':first').hide();
			$(this).children(':last').show();
			$(this).parent().next().show();
		} else {
			editable_data = $(this).children().attr('data');
			$(this).children().attr('contenteditable','true').focus().css('background', '#fff').html(' ');
		}
	});
	
	$('.editable-fields *').blur(function(){
		if ($(this).hasClass('title')) {
			// $(this).attr('contenteditable','false').css('background', "transparent url('images/KinectionIconColor.png') no-repeat center right");
			$(this).attr('contenteditable','false').css('background', "transparent");
		} else {
			$('.editable-fields p').attr('contenteditable','false').css('background', 'transparent');
		}
	});
	
	$('.editable-fields-new *').blur(function(){
		if ($(this).hasClass('title')) {
			$(this).attr('contenteditable','false').css('background', "transparent").html(editable_data);
		} else {
			$('.editable-fields-new p').attr('contenteditable','false').css('background', 'transparent').html(editable_data);
		}
	});
	
	$('.save-edits').click(function(){
		$(this).parent().hide();
		$(this).parent().next().css('display','block');
		ajaxload	= $(this).parent().next();
		content		= $(this).parent().prev().children().children(':first');
		forminput	= $(this).parent().prev().children().find('.form-edits');
		setTimeout(function(){
			ajaxload.css('display','none');
			forminput.hide();
			content.show();
		}, 700);
	});
	
	
	/********************************
	** Expand/Collapse functions
	********************************/
	
	$('.expand').click(function(){
		$(this).hide();
		$('.collapsed').show();
		$('.edited').show();
		$('#hypothesis-details .hypo-edit-container').slideDown();
	});
	
	$('.collapsed').click(function(){
		$(this).hide();
		$('.edited').hide();
		$('.expand').show();
		$('#hypothesis-details .hypo-edit-container').slideUp();
	});
	
	
	/********************************
	** Datepicker functions
	********************************/
	
	$( "#startdate, #enddate" ).datepicker({
		showOn: "button",
		buttonImage: "images/icon-calendar.png",
		buttonImageOnly: true,
		onSelect: function(){
			var day1		= $(this).datepicker('getDate').getDate();
			var month1		= $(this).datepicker('getDate').getMonth() + 1;
			var year1		= $(this).datepicker('getDate').getFullYear();
			var fullDate	= month1 + "/" + day1 + "/" + year1;
		}
	});
	
	
	/********************************
	** Toggle functions
	********************************/
	
	$(".toggle").next(".hypothesis-content").hide();
	
	$(".toggle").click(function() {
		$('.active').not(this).toggleClass('active').next('.hypothesis-content').slideToggle(500);
		$('.toggle .bt-plus').html('+');
		$(this).toggleClass('active').next().slideToggle("fast");
		if ($(this).hasClass('active')) {
			$('.active .bt-plus').html('-');
		} else {
			$('.active .bt-plus').html('+');
		}
	});
	
	$(".toggle-reverse").click(function() {
		$('.toggle-reverse .bt-plus').html('-');
		$(this).toggleClass('active').next().slideToggle("fast");
		if ($(this).hasClass('active')) {
			$('.active .bt-plus').html('+');
		} else {
			$('.active .bt-plus').html('-');
		}
	});
	
	
	/********************************
	** Tags functions
	********************************/
	
	$('#tags-container').tagsInput({width:'auto'});
	$('.editable-fields .tagsinput, .editable-fields-new .tagsinput').hide();
	
	
	/********************************
	** Model Flow Tabs functions
	********************************/
	
	$( "#ajax-content .modelflowtabs" ).droptabs();
	
	/********************************
	** User/Team functions
	********************************/
	
	$(".removeX").click(function() {
		$(this).parent().hide();
	});
	
	$(".addPlus, .newlink-modal").click(function() {
		$.pageslide.close();
	});
	
	
	/********************************
	** Lightbox functions
	********************************/
	
	$(".fancyclick").click(function() {
		$('#expanddataflow').css('width',$(window).width()-100);
		$('#expanddataflow').css('height',$(window).height()-80);
		$.pageslide.close();
		
		if ($('#model-flow-content').html()) {
			modalflowcontent = $('#model-flow-content').html();
		}
		$('#model-flow-content').html('');
		$('.dataflow-modal-content').html(modalflowcontent);
		$('#expanddataflow .expandtool').hide();
		$('#expanddataflow iframe.modify-content').css('height',$(window).height()-200);
		$('#expanddataflow .modelflowtabs-content').css('margin-top','-16px');
		
		var kinectioncontent = $('#kinection .kinection-regular').html();
		$('.kinect-modal-content').html(kinectioncontent);
		kinection10();
		setTimeout(function(){ $("#kinection-modal .kinection-regular .module-header").css('width', $("#kinection-modal .kinection-regular").width() - 20); }, 800);
		
		$( "#expanddataflow .modelflowtabs" ).droptabs();
	});
	
});
