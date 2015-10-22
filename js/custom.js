
$(document).ready(function () {
	
	/********************************
	** Pre-cache loading image
	********************************/
	
	loadImg = new Image();
	loadImg.src="images/loading.gif";
	
	
	/********************************
	** Header functions
	********************************/
	
	/*
	$(window).resize(function() {
		$("header").css('width', $("body").width());
	});
	*/
	
	$(document).click(function(){
		if ($('.userbox').hasClass('active')) {
			$('.userinfo-dropdown').slideUp();
			$('.user-navigation').removeClass('userinfo-display');
			setTimeout(function(){ $('.userbox').removeClass('active').css('background','none'); }, 400);
		}
	});
	
	$('.userbox').click(function(){
		if ($(this).hasClass('active')) {
			$('.userinfo-dropdown').slideUp();
			$('.user-navigation').removeClass('userinfo-display');
			setTimeout(function(){ $('.userbox').removeClass('active').css('background','none'); }, 400);
		} else {
			$(this).addClass('active').css('background','#212121');
			$('.user-navigation').addClass('userinfo-display');
			$('.userinfo-dropdown').slideDown();
		}
		return false;
	});
	
	$('#listnav').click(function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next().slideUp();
		} else {
			$(this).addClass('active');
			$(this).next().slideDown();
		}
	});
	
	
	/********************************
	** Search functions
	********************************/
	
	$('.search-text').click(function(){
		$(this).hide();
		$(this).next().show('slide', {direction: 'right'},500);
	});
	
	$('.header-search-delete').click(function(){
		$(this).parent().parent().hide('slide', {direction: 'right'});
		prevsearch = $(this).parent().parent().parent().prev();
		setTimeout(function(){ prevsearch.show(); }, 500);
	});
	
	$('.searchbox').keyup(function() {
		var cs = $(this).val().length;
		if (cs > 0) {
			$('#search-icon').removeClass('ss-search').addClass('ss-ban');
		} else {
			$('#search-icon').removeClass('ss-ban').addClass('ss-search');
		}
	});
	
	$("#search-icon").click(function() {
		$('#search-icon').removeClass('ss-ban').addClass('ss-search');
		$('.searchbox').val('').focus();
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
	
	$('.icon-pin').click(function(){
		$('.icon-pin').removeClass('icon-pin-active');
		if ($(this).hasClass('icon-pin-active')) {
			$(this).parents('.pinned').insertAfter($(this).parents('.pinned').next()).hide().slideDown();
		} else {
			$(this).addClass('icon-pin-active');
			$(this).parents('.pinned').insertBefore($(this).parents('.pinned').prev()).hide().slideDown();
		}
		
	});
	
	
	/********************************
	** Dropdown functions
	********************************/
	
	$('.ss-filter').appendHoverDropdownBox({
		title: 'Filter',
		items: {
			"All": {
			},
			"None": {
			},
			"Type": {
			},
			"User": {
			},
			"Time Period": {
			},
		},
		onchange: function(key, item, value){
			window.alert("onChange: " + key + " - " + value );
		},
		onLabelClick: function(key, item){
			item.checked( !item.checked() );
		}
	});
	
	$('#icon-options').appendHoverDropdownBox({
		title: 'Options',
		items: {
			"All": {
			},
			"None": {
			},
			"Share": {
			},
			"Delete": {
			},
		},
		onchange: function(key, item, value){
			window.alert("onChange: " + key + " - " + value );
		},
		onLabelClick: function(key, item){
			item.checked( !item.checked() );
		}
	});
	
	
	/********************************
	** Datepicker functions
	********************************/
	
	$( "#startdatemodal, #enddatemodal" ).datepicker();
	
	
	/********************************
	** Tags functions
	********************************/
	
	$('.tags-container').tagsInput({width:'auto'});
	
	
	/********************************
	** Tabs functions
	********************************/
	
	$( "#tabs" ).tabs();
	
	
	/********************************
	** User/Team functions
	********************************/
	
	$(".removeX").click(function() {
		$(this).parent().hide();
	});
	
	$(".addPlus, .newlink-modal, .icon-share").click(function() {
		$.pageslide.close();
	});
	
	$('#modal-teams ul.teamNav li').click(function(){
		currenttab = $(this).attr('rel');
		if (!($(this).hasClass('active'))) {
			$('#modal-teams ul.teamNav li').removeClass('active');
			$(this).addClass('active');
			$('.DKTab-container').hide();
			$(currenttab).show();
		}
	});
	
	
	/********************************
	** Project Manager functions
	********************************/
	
	current_link	= '';
	current_level	= '';
	current_view	= 50;
	
	$(".pancake-nav").pageslide({
		direction: "right",
		modal: true
	});
	
	$('.projmanager-tooltip').tooltipster({
		position: 'right',
		autoClose: true,
		onlyOne: true,
		maxWidth: 250
	});
	
	$('.level-link').click(function(){
		var collapse_content_selector		= $(this).attr('rel');
		var collapse_content_selector_text	= $(this).attr('data');
		var toggle_switch					= $(this);
		
		$('.level3').removeClass('selected');
		if (toggle_switch.parent().hasClass('level3')) {
			toggle_switch.parent().addClass('selected');
			$('#ajax-content').html('<div class="loader"><img src="images/loading.gif" /></div>').load('ajax-pages/'+collapse_content_selector);
			kinection10();
			current_link = $(this).attr('rel');
			$('.breadcrumbs span').removeClass('current');
			$('.breadcrumbs .level3').addClass('current');
			current_level = $(this).attr('level');
		} else {
			if (toggle_switch.parent().children('span:last').hasClass('active')) {
				toggle_switch.parent().children('span:last').removeClass('active');
				toggle_switch.parent().children('span:first').html('&#9655;');
				toggle_switch.parent().next().slideUp();
			} else {
				toggle_switch.parent().children('span:last').addClass('active');
				toggle_switch.parent().children('span:first').html('&#9661;');
				toggle_switch.parent().next().slideDown();
			}
		}
		
		if (toggle_switch.hasClass('level-link-text') && (current_link != collapse_content_selector)) {
			$('#ajax-content').html('<div class="loader"><img src="images/loading.gif" /></div>').load('ajax-pages/'+collapse_content_selector);
			current_link = $(this).attr('rel');
			kinection50();
			
			switch(true) {
				case ($(this).attr('level') == 'level1'):
					$('#secondary .level1').removeClass('selected');
					$(this).parent('.level1').addClass('selected');
					if ($(this).attr('level') != current_level) {
						$('.breadcrumbs span').removeClass('current');
						$('.breadcrumbs .level1').addClass('current');
						current_level = $(this).attr('level');
						current_view = 50;
					}
					break;
				case ($(this).attr('level') == 'level2'):
					$('#secondary .level2').removeClass('selected');
					$(this).parent('.level2').addClass('selected');
					if ($(this).attr('level') != current_level) {
						$('.breadcrumbs span').removeClass('current');
						$('.breadcrumbs .level2').addClass('current');
						current_level = $(this).attr('level');
						current_view = 50;
					}
					break;
				case ($(this).attr('level') == 'level3'):
					$('#secondary .level3').removeClass('selected');
					$(this).parent('.level3').addClass('selected');
					if ($(this).attr('level') != current_level) {
						$('.breadcrumbs span').removeClass('current');
						$('.breadcrumbs .level3').addClass('current');
						current_level = $(this).attr('level');
						current_view = 10;
					}
					break;
			}
		}
		
	});
	
	$('.newfile').click(function(){
		var collapse_content_selector	= $(this).attr('rel');
		this_level						= $(this).attr('level');
		$('#ajax-content').html('<div class="loader"><img src="images/loading.gif" /></div>').load('ajax-pages/'+collapse_content_selector);
		kinection10();
	});
	
	
	/********************************
	** Change Width Dropdown
	********************************/
	
	$("#kinection .changewidth").mouseenter(function(){
		$(this).next().slideDown();
	});
	
	$("#kinection .dropdown-menu").mouseleave(function(){
		$(this).slideUp();
	});
	
	
	/********************************
	** Favorite Icon functions
	********************************/
	
	$('.favorite-container').click(function(){
		if ($(this).hasClass('icon-favorite')) {
			$(this).removeClass('icon-favorite').addClass('icon-unfavorite');
		} else {
			$(this).removeClass('icon-unfavorite').addClass('icon-favorite');
		}
	});
	
	
	/********************************
	** Platform/Project tabs
	********************************/
	
	$('.pstab').hide();
	$('.tabs-container .activetab').show();
	
	$('ul.PSNav li').click(function(){
		currenttab = $(this).attr('rel');
		if ($(this).hasClass('active')) {
			
		} else {
			$('ul.PSNav li').removeClass('active');
			$(this).addClass('active');
			$('.pstab').hide();
			$(currenttab).show();
		}
	});
	
	
	/********************************
	** Share Modal functions
	********************************/
	
	$('#share-form input[type="radio"]').click(function(){
		current_sharetab = $(this).val();
		$('.share-div').hide();
		$(current_sharetab).show();
	});
	
	
	/********************************
	** Kinection functions
	********************************/
	
	/*
	current_kinregular_pos	= $("#kinection .kinection-regular").offset();
	current_kinfull_pos		= $("#kinection .kinection-full").offset();
	$("#kinection .kinection-regular .module-header").css('width', $("#kinection .kinection-regular").width() - 20);
	
	$(window).resize(function() {
		$("#kinection .kinection-regular .module-header").css('width', $("#kinection .kinection-regular").width() - 20);
	});
	$(window).scroll(function() {
		$("#kinection .kinection-regular .module-header").offset({ top: current_kinregular_pos.top});
		$("#kinection .kinection-full .module-header").offset({ top: current_kinfull_pos.top});
	});
	
	// Pin current date on Kinection view --- under construction
	var lastScrollTop = 0;
	$('#kinection').scroll(function() {
		// $("#kinection .kinection-regular .module-header").offset({ top: current_kinection_pos.top, left: current_kinection_pos.left})
		var st = $(this).scrollTop();
		if (st > lastScrollTop){
			// downscroll code
		} else {
			// upscroll code
		}
		lastScrollTop = st;
		
	});
	*/
	
	/********************************
	** Lightbox functions
	********************************/
	
	$('.fancybox').fancybox();
	$('.icon-eye').click(function(){
		$.fancybox.open($(this).attr('data'));
	});
	
	
	/********************************
	** Model Flow Tabs functions
	********************************/
	
	$( "#ajax-content #modelflowtabs, #expanddataflow #modelflowtabs" ).droptabs();
	
})


/********************************
** Dialog/Modal function
********************************/

function openModal(level) {
	$.pageslide.close();
	$( "#modal-"+level ).dialog({
		modal:true,
		autoopen: true,
		width: 600,
		title: 'New',
		show: {
			effect: "slideDown",
			duration: 250
		},
		hide: {
			effect: "slideUp",
			duration: 250
		},
		buttons: {
			close: function() {
				$( this ).dialog( "close" );
			}
		}
	});
}


/********************************
** Load external page function
********************************/

function loadPage (pageurl,level) {
	$('#ajax-content').html('<div class="loader"><img src="images/loading.gif" /></div>').load('ajax-pages/'+pageurl);
	
	/*
	if (current_level != 'level3') {
		$('#ajax-content').addClass('width85');
		$('#kinection').addClass('width10');
		$('.kin-container').hide();
		$('.kin-container10').show();
	}
	*/
	
	current_link = pageurl;
	if (level != current_level) {
		$('.breadcrumbs span').removeClass('current');
		switch(true) {
			case (level == 'level1'):
				$('.breadcrumbs .level1').addClass('current');
				break;
			case (level == 'level2'):
				$('.breadcrumbs .level2').addClass('current');
				break;
			case (level == 'level3'):
				$('.breadcrumbs .level3').addClass('current');
				break;
		}
		current_level = level;
	}
}


/********************************
** Change Width functions
********************************/

function changeKinect(kinWidth) {
	switch(true) {
		case (kinWidth == 10):
			kinection10();
			break;
		case (kinWidth == 50):
			kinection50();
			break;
		case (kinWidth == 100):
			kinection100()
			break;
	}
}

function kinection10() {
	if (current_view == 100) {
		$('#kinection .kinection-full').hide();
		$('#kinection .kinection-regular').show();
		setTimeout(function(){ $('#ajax-content').show(); }, 600);
		setTimeout(function(){ $('#ajax-content').removeClass('width48').removeClass('width30').addClass('width85'); }, 1000);
	} else {
		$('#ajax-content').show();
		$('#ajax-content').removeClass('width48').removeClass('width30').addClass('width85');
	}
				
	$('#kinection').removeClass('width100').removeClass('width48').addClass('width10');
	$('.kin50').hide();
	$('.kin10').show();
	current_view = 10;
}

function kinection50() {
	if (current_view == 100) {
		$('#kinection .kinection-full').hide();
		$('#kinection .kinection-regular').show();
		setTimeout(function(){ $('#ajax-content').show(); }, 600);
		setTimeout(function(){ $('#ajax-content').removeClass('width85').removeClass('width30').addClass('width48'); }, 1000);
	} else {
		$('#ajax-content').show();
		$('#ajax-content').removeClass('width85').removeClass('width30').addClass('width48');
	}
				
	$('#kinection').removeClass('width100').removeClass('width10').addClass('width48');
	$('.kin10').hide();
	$('.kin50').show();
	current_view = 50;
}

function kinection100() {
	$('#kinection .kinection-full').removeClass('width48').removeClass('width85').addClass('width100');
	$('#ajax-content').removeClass('width85').removeClass('width100').removeClass('width48').addClass('width30').hide();
	$('#kinection').addClass('width100');
	$('#kinection .kinection-regular').hide();
	$('#kinection .kinection-full').show();
	current_view = 100;
	
	// boxheight = $('.kinection-full .box').height();
	// $(".vertical-line").css('height', boxheight);
}