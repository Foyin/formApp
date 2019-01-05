$(function() { 
  
  // Initialize variables
  var $window = $(window);
  var $button = $('button');
  var $main = $('.main-wrapper');
  var $form = $('.form');
  var $formTitle = $('.title');
  var $formDescription = $('.description');
  var $addQuestion = $('.addQuestionBtn');
  var $deleteQuestion = $('.deleteQuestionBtn');
  var $addOption = $('.addOptionBtn');
  var $optionField = $('#optionField');
  var $formsTab = $(".forms-tab");
  var $resultsTab = $(".results-tab");
  var enterKey = jQuery.Event("keydown");
  //enterKey.which = 13; //Enter key
  
  var numQuestions = 0;
  var numOptions = 1;
  var numTracker;
  var optionIdentifier = 0;

  $('input,textarea').keyup(function(){
	$('.results-tab h1').html($formTitle.val()); 
	$('.results-tab #description').html($formDescription.val()); 
	$('.results-tab pre').each(function() {
  		$(this).html($(this).text().replace(/[-]/g, '<li>')+'</li>');
  	});
  });

  

  $addQuestion.click(function(){
	if($formTitle.val() === "" && $formDescription.val() === ""){
		alert("Enter title or description of form first");
	}
	else{
		numQuestions++; 
	   	
		$('.forms-tab #questions').append("<div class=questionForm id=form"+ numQuestions +">" + 
						"<input class=questionTitle type=text placeholder=Title><br>" +
						"<input class=questionDescription type=text  placeholder=Description><br>" +
						"<div></div>"+
						"<input id="+ numQuestions +" type=text  placeholder=AddOptions></input>" + 
						"<br>" +
						"<button class=addOptionBtn >ADD OPTION</button>" +
						"<button class=deleteQuestionBtn >DELETE QUESTION</button>" +
					"</div>");

		$('.results-tab #questionFormResults').append('<div class=questionRes id=res'+ numQuestions +' >' +
						  '<h4></h4>' +
						  '<p></p>' +
						  '<form></form></div>');
	}

	$('.questionTitle,.questionDescription').keyup(function(){
		$('#res'+ $(this).parent().attr('id').substr(-1) +' h4').html($('#form'+ $(this).parent().attr('id').substr(-1) +' .questionTitle').val()); 
		$('#res'+ $(this).parent().attr('id').substr(-1) +' p').html($('#form'+ $(this).parent().attr('id').substr(-1) +' .questionDescription').val()); 
  	});

	$(".addOptionBtn").unbind().click(function(){
		optionIdentifier++;
		var $formID = $(this).parent().attr('id').substr(-1);
		if($(this).prevAll('input:first').val() === ""){
			alert("Enter Option");
		}
		else{
			$(this).prevAll('div:first').append("<p id=oID"+ optionIdentifier +" >"+ $('#form'+ $formID +' #' +$formID).val() +" <img class=removeOption src=delete.png ></p>");
			
			$('.results-tab #res'+ $formID +' form').append("<input class=radioOptions id=oID"+ optionIdentifier +" name=options type=radio><a id=oID"+ optionIdentifier +">"+ $('#form'+ $formID + ' #' +$formID).val() +"<br></a>");
			$(this).prevAll('input:first').val("");
		}

		$(".removeOption").click(function(){
			$('.results-tab #' + $(this).parent().attr('id')).remove();
			$(this).parent().remove();
		})
  	});

	$(".deleteQuestionBtn").click(function(){
			$(this).parent().remove();
			var formIDnum = $(this).parent().attr('id');
			$('.results-tab #res' + formIDnum.substr(-1) + '').remove();


	});	

  });

});
