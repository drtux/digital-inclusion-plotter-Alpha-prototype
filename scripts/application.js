function unWrapPlaceholder(){
  $(this).contents().unwrap();
  $("#proposition-name").html("Digital Inclusion Plotter");
}

function submission(form, result, messageing, destination){
  var message = {msg: " ", instruction:" "};
  
  if (result){
    message.msg = messageing.msgT + messageing.level + "</br></br>";
    message.instruction = messageing.instructionT;
  }else{
    message.msg = messageing.msgF + messageing.level + "</br></br>";
    message.instruction = messageing.instructionF;
  }

  localStorage.setItem('message-' + form, JSON.stringify(message));
  localStorage.removeItem(form);
  window.location.replace(destination);
}

function formEval(form){
  var eval = {yes:0, yesTotal:0, skill:0, skillTotal:0}

  for (var question in form) {
    if (form.hasOwnProperty(question)) {
      if (parseInt(form[question]) == 1){//yes
        eval.yes++;
        eval.yesTotal++;
      } else if (parseInt(form[question]) == 0){//no
        eval.yesTotal++;
      } else if (parseInt(form[question]) == -1){//skill yes
        eval.skill++;
        eval.skillTotal++;
      } else{ //if (parseInt(form[question]) == -2){//skill no
        eval.skillTotal++;
      }
    }
  }
  return eval;
}

function duringEval(e){
  e.preventDefault();

  var form = JSON.parse(localStorage.getItem('during-form'));
  var result = false;

  var eval = formEval(form);
    if (eval.skill == eval.skillTotal){result=true}
      localStorage.removeItem(form);
    if (result) {window.location.replace('during-lrnnewnohlp.html');}
        else {window.location.replace('during-everown.html');}
  

  // ---> Put evaluation method here <---

  
}

function afterEval(e,l){
	e.preventDefault();
	var form = JSON.parse(localStorage.getItem('after-form'));
  var result = false;

  var eval = formEval(form);

  switch(parseInt(l.charAt(0)))
  {//Get the # in first char of the level descrription string
    case 1://Not used and don't want to
      if (eval.yes== 0){
        result = true;
      }
      break;
    case 2://Yes used but no longer
      if ((parseInt(form['2:q1']) == 1) && (parseInt(form['2:q2']) == 0)){
        result = true;
      }
      break;
    case 3://Can't access but is willing
      if ((parseInt(form['3:q1']) == 0) && (parseInt(form['3:q2']) == 1)){
        result = true;
      }
      break;
    //case 4: Default route
    //case 5: Default route
    case 6: //subset of skills
      if (((eval.skill < eval.skillTotal) && (eval.skill > 0)) && (eval.yes == eval.yesTotal)){
        result = true;
      }
      break;
    case 7: 
    case 8://all skills
      if ((eval.skill == eval.skillTotal) && (eval.yes == eval.yesTotal)){
        result = true;
      }
      break;
    default: 
      if ((eval.yes == eval.yesTotal)){
        result = true;
      }
  }

  submission('after-form', result,
    {
      level:l,
      msgT:"We confirm your choise of ", 
      instructionT:"Please choose a persona for your next participant", 
      msgF:"We suggest the participant dosen't fit the profile of ", 
      instructionF:"Please choose a new persona"
    }, 'after-index.html');
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
