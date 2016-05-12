function unWrapPlaceholder(){
  $(this).contents().unwrap();
  $("#proposition-name").html("Digital Inclusion Plotter");
}

function eval(e,l){
	var level = l;

	e.preventDefault();
	var form = JSON.parse(localStorage.getItem('after-form'));
  var total = 0;
  var skill = 0;
  var correct = 0;
  var result = false;
  var message = {msg:" ", instruction:"Please choose a persona"};

  for (var question in form) {
    if (form.hasOwnProperty(question)) {
      if (parseInt(form[question]) == 1){//yes
        correct++;
        total++;
      } else if (parseInt(form[question]) == 0){//no
        total++;
      } else if (parseInt(form[question]) == -1){//skill yes
        skill++;
      } else{ //if (parseInt(form[question]) == -2){//skill no
        //do nothing
      }
      
    }
  }

  switch(parseInt(level.charAt(0)))
  {
    case 6: //subset of skills
      if (((skill < 4) && (skill >0)) && (correct == total)){
        result = true;
      }
      break;
    case 7: 
    case 8://all skills
      if ((skill == 4) && (correct == total)){
        result = true;
      }
      break;
    default: 
      if ((correct == total)){
        result = true;
      }
  }
  

  if (result){
    message.msg = "We confirm your choise of "+ level + "</br></br>";
    message.instruction = "Please choose a persona for your next participant";
  }else{
    message.msg = "We suggest the participant dosen't fit the profile of "+ level + "</br></br>";
    message.instruction = "Please choose a new persona";
  }
	localStorage.setItem('message', JSON.stringify(message));
  localStorage.removeItem('after-form');
	window.location.replace('after-index.html');    
}

$( document ).ready(function() {
  $('[data-includefile]').each(function(){
    var file = $(this).attr("data-includefile");
    $(this).load("includes/"+$(this).attr("data-includefile")+".html", unWrapPlaceholder)
  });

  //write to local storage
  $('form').storeForm();
  //play back from local storage
  $('.playback-container').getForm();
  
  //toggle stuff by Ed Horsford @ GDS
  $('body').on('change', 'input', function(){
    var $this = $(this);
    // toggle optional sections
    if ($this.is(':checkbox')){
      var $toggleTarget = $('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '"]');
      console.log('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '"]');
      if ($toggleTarget.length){
        $toggleTarget.toggle($this.is(':checked') && $this.val() == $toggleTarget.attr('data-toggle-value'));
      }
    } else if ($this.is(':radio')){
      var $toggleTarget = $('.optional-section-'+$this.attr('name'));
      console.log('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '"]');
      $toggleTarget.each(function(){
        $(this).toggle($this.val() == $(this).attr('data-toggle-value'));
      });
    }
  });

  $('[data-button-page]').change(function(){
    var buttonid = $(this).attr("data-button-id");
    var url = $(this).attr("data-button-page");
    if ($(this).is(':checked')) {
      $(buttonid).attr("href", url);
    }
  });

  $('.clearStorage').click(function(){
    localStorage.clear();
    $(this).html('&#10003; Data cleared');
  });



});
