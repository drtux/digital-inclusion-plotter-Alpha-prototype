
var helpState = -1;//Retain between questions

var modal = "";
var span = "";

var questions = [
/*0*/	{question:"Have they ever used the internet?",
		//  hint:"",
		 yDest:2, nDest:1},

/*1*/	{question:"Do they want to be online?",
		 hint:"There are barriers stopping them being online, for example it's too expensive, they lack of confidence or aren't physically able",
		 yDest:-3, nDest:-1},

/*2*/	{question:"Do they still use the internet?",
		//  hint:"",
		 yDest:4, nDest:3},

/*3*/	{question:"Do they want to be online?",
		 hint:"There are barriers stopping them being online, for example it's too expensive, they lack of confidence or aren't physically able",
		 yDest:-3, nDest:-2},

		 //If no to 0 and 2 = Never have, never will
		 //If yes to 0, then no to 1 and 2 = Was online, but no longer
		 //Yes = Willing but unable
/*4*/	{question:"Do they like using the internet?",
		//  hint:"They are positive about the benefits of being online and learning digital skills",
		//Yes, mostly
		//Not really, it's a chore
		 yDest:5, nDest:-4},

/*5*/	{question:"Do they need help completing tasks online?",
		//  hint:"",
		//Often = Learning the ropes
		//Only with new or unfamiliar tasks = 5
		//Rarely or never = 5
		 yDest:0, nDest:0},

/*6*/	{question:"Can they:<ul class='list list-bullet'><li>use email or instant messaging</li><li>use search engines</li><li>sign-up for and use an online service (for example, renewing your driving licence, joining a charity, online banking)</li><li>buy things online</li></ul>",
		 hint:"",
		 //Yes = if 5 = 'only with new tasks' then Basic digital
		 //No, they'd need help
		 yDest:0, nDest:0},

/*7*/	{question:"Do they have advanced digital skills?",
		 hint:"They work in tech, can code or have specialist digital knowledge", //Use keyboard shortcuts, for things like tabbing, copying and pasting, switching between apps, etc.
		 yDest:-9, nDest:-8}
		 //Y = Expert
		 //N = Confident
];

function eval(name, value){


	$(".question :input").each(function(index){//Delete any un-needed questions (to account for changing minds)
		if(parseInt($(this).attr('name').charAt(0)) > parseInt(name.charAt(0))){
			$(this).parent().parent().remove();
		}
	});
	$(".level").each(function(index){
		if(parseInt($(this).attr('name').charAt(0)) >= parseInt(name.charAt(0))){
			$(this).remove();//Delete any level decisions
		}
	});

	var n = 0;

	switch (parseInt(name.charAt(0)))
	{
		case 5://Getting others help question
			switch(value)
			{
				case 1: //Regularly
					n = -5;
					break;
				case 2: //New
					helpState = 1;
					n = 6;//skills question
					break;
				default: //Never
					helpState = 0;
					n = 6;//skills question
					break;

			}
			break;

		case 6://Skills question
			if (value == 1 && helpState == 1)
			{
				n = -7;
			}
			else if (value == 1 && helpState == 0)
			{
				n = 7;
			}
			else
			{//No (sub-set)
				n = -6;
			}
			break;

		default:
			if (value == 1)
			{//Yes
				n = questions[parseInt(name.charAt(0))].yDest;
			}
			else
			{//No
				n = questions[parseInt(name.charAt(0))].nDest;
			}
			break;
	}

	if (n>0)
	{//Its a new question
		q = questions[n].question;
		h = questions[n].hint;

		appendQuestion(n,q,h);
	}
	else if (n<0)
	{//Its a level decision
		appendLevel(n, name);
	}
}

function appendQuestion(n, question, hint){
	var html = " ";
	switch(n)
	{
		case 5://Help question
			html = "<fieldset class='form-group inline question' name='set"+n+"'><legend class='form-label-bold' for='"+n+"'>"+question+genHelp(hint)+"<label class='block-label'><input id='"+n+"R' name='"+n+"' type='radio' data-storage='1'/>Reguarly</label><label class='block-label'><input id='"+n+"T' name='"+n+"' type='radio' data-storage='2'/>Only new tasks</label><label class='block-label'><input id='"+n+"N' name='"+n+"' type='radio' data-storage='3'/>Rarely/Never</label></fieldset>"
			break;

		default://Normal questions
			html = "<fieldset class='form-group inline question' name='set"+n+"'><legend class='form-label-bold' for='"+n+"'>"+question+genHelp(hint)+"</p><label class='block-label'><input id='"+n+"Y' name='"+n+"' type='radio' data-storage='1'/>Yes</label><label class='block-label'><input id='"+n+"N' name='"+n+"' type='radio' value='0'/>No</label></fieldset>";
			break;
	}
	$('.form').append(html);
	var latestElement = document.getElementsByName('set'+n);
	latestElement[0].scrollIntoView();
}

genHelp(h){
	if (h===null)
	{
		return "";
	}else{
		var help = "</legend><p class='form-hint'>For example, "+h+"</p>";
		return help;
	}
}

function appendLevel(level, name){

	var plot = '';
	var colour = '';

	switch(level){
		case -1: plot += '1:</br>Never have, never will</p><p>They may feel they have ‘missed the boat’ and that learning how to use the internet doesn\'t fit into their lives.'; colour = '#DA7357'; break;
		case -2: plot += '2:</br>Was online but no longer</p><p>They might have lost trust in the internet. They might be afraid of fraud or seeing inappropriate things online. They might have lost internet access because of cost or physical or mental capability.'; colour = '#EA8C5C'; break;
		case -3: plot += '3:</br>Willing and unable</p><p>People in this category predominantly have a positive perception of being online but have problems with low skills and they struggle to learn.'; colour = '#EC9E5A'; break;
		case -4: plot += '4:</br>Reluctantly online</p><p>They understand the general benefits of being online, they have yet to experience them personally.'; colour = '#F4C15B'; break;
		case -5: plot += '5:</br>Learning the ropes</p><p>These users are predominantly very positive about the benefits of the internet and have willingly started to engage with digital technologies.'; colour = '#F9D45E'; break;
		case -6: plot += '6:</br>Task specific</p><p>Their tasks may include online banking or updating social media. These tasks are often limited and specific.'; colour = '#EAE05F'; break;
		case -7: plot += '7:</br>Basic digital skills</p><p>These people have enough skills to be able to navigate online independently and perform all tasks at a basic level.'; colour = '#D6DA5D'; break;
		case -8: plot += '8:</br>Confident</p><p>Confident users make use of digital tools at work and in their everyday lives.'; colour = '#B0CC5B'; break;
		case -9: plot += '9:</br>Expert</p><p>Expert internet users have advanced digital skills.'; colour = '#9CC55A'; break;
	}
	var html = "<div class='level' name='"+name+"'><p class='heading-large panel-indent' style='background-color: "+colour+";'>They are a category " + plot + "</p> <p><a id='myBtn' href='routing.jpg'>How did I get here?</a></p> <a class='button' href='routing.html'>Map another participant</a><a href='index.html'>Finish</a></div>";
	$('.form').append(html);
	var latestElement = document.getElementsByName(name);
	latestElement[0].scrollIntoView();
	btn = document.getElementById("myBtn");
	// When the user clicks on the button, open the modal 
	btn.onclick = function(e) {
		e.preventDefault();
    	modal.style.display = "block";
	}
}


function unWrapPlaceholder(){
  $(this).contents().unwrap();
  $("#proposition-name").html("Map your participants");
}




$( document ).ready(function() {
  $('[data-includefile]').each(function(){
    var file = $(this).attr("data-includefile");
    $(this).load("includes/"+$(this).attr("data-includefile")+".html", unWrapPlaceholder)
  });
  var form = $(".form").attr("name");
  if(form ==="category-form"){
  	appendQuestion(0, questions[0].question, questions[0].hint);//Add first question

  	// Get the modal
modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
  }




  //write to local storage
  //$('form').storeForm();
  //play back from local storage
  //$('.playback-container').getForm();

  //toggle stuff by Ed Horsford @ GDS
  $('body').on('change', 'input', function(){
    var $this = $(this);
    /* toggle optional sections
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
    }*/
    if(form ==="category-form"){
    	eval($this.attr('name'),parseInt($this.attr('data-storage')));
    }
    else
    {
    	if($this.attr('id')==="accessNeedY"){
    		$('#accessNeed-reveal').removeClass('visuallyhidden');
    		var latestElement = document.getElementsByName('accessNeed-reveal');
			latestElement[0].scrollIntoView();
    	}
    	else if($this.attr('id')==="accessNeedN"){
    		$('#accessNeed-reveal').addClass('visuallyhidden');
    	}
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
