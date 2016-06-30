var skillStack = [];

var skills = [
/*0*/	{question:"Can they use a search engine?",
		 hint:"finding something new, help with a problem, somewhere to shop, somewhere to visit, contact details off something"},

/*1*/	{question:"Can they send a email or instant message?",
		 hint:"to keep in contact with family, or friends, using Outlook, Gmail, WhatsApp, Facebook messenger"},

/*2*/	{question:"Can they buy something online?",
		 hint:"weekly shopping, general purchases, bargains/offers, specialist goods"},

/*3*/	{question:"Can they fill out a form with personal details?",
		 hint:"online banking, set up online accounts i.e social media, applications for government services"},
]

var questions = [
/*0*/	{question:"Can they access and use the internet?",
		 hint:"has a device that can get online at either at home, library, school, mobile, or cafe",
		 yDest:1, nDest:9},

/*1*/	{question:"Do they enjoy to using the internet?",
		 hint:"uses the internet recreationally - social media, videos/streaming, news, shopping",
		 yDest:2, nDest:6},

/*2*/	{question:"Skill questions",
		 hint:" ",
		 yDest:3, nDest:5},

/*3*/	{question:"Are they happy to try something new online without help?",
		 hint:"self-supported use of the internet, will search online for help if they get stuck, unlikely to get friends or family involved",
		 yDest:4, nDest:-7},

/*4*/	{question:"Do they understand the processes that run online services?",
		 hint:"has some web development skills, or technical knowledge",
		 yDest:-9, nDest:-8},

/*5*/	{question:"Do they access the internet without help?",
		 hint:"when they do use the internet for their 'regular' things they rarely need help",
		 yDest:-6, nDest:-5},

/*6*/	{question:"Have they ever used the internet?",
		 hint:"for any reasonable period, not just once, at any point in their lives",
		 yDest:7, nDest:-1},

/*7*/	{question:"Do they still use the internet?",
		 hint:"is actively using the internet currently, and will continue to do so in future",
		 yDest:8, nDest:-2},

/*8*/	{question:"Do they see how the internet has benefited them?",
		 hint:"\"yes, and if I had more skill the sky would be the limit\"",
		 yDest:-6, nDest:-4},

/*9*/	{question:"Do they enjoy to using the internet?",
		 hint:"uses the internet recreationally - social media, videos/streaming, news, shopping",
		 yDest:-3, nDest:6}
];


function eval(name, value){

	$(".question :input").each(function(index){//Delete any un-needed questions (to account for changing minds)
		if(parseInt($(this).attr('name').charAt(0)) > parseInt(name.charAt(0))){
			$(this).parent().parent().remove();
			for (var i=0;i<skillStack.length; i++)
			{
				if (skillStack[i].name === name){
					skillStack.splice(i,1);//Remove the exsisting answer
					break;//as it will only appear once
				}
			}
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
		case 2://Skills question
			skillStack.push({name:name, value:value});
			if (skillStack.length == skills.length)
			{//If all the skills Q's have been answered evaluate them
				var yes = 0;
				for (var i = 0; i < skillStack.length; i++)
				{
					if (skillStack[i].value == -1)
					{
						yes++;
					}
				}
				if (yes == skillStack.length)
				{//Yes (all)
					n = questions[parseInt(name.charAt(0))].yDest;
				}
				else
				{//No (sub-set)
					n = questions[parseInt(name.charAt(0))].nDest;
				}
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
	if (n == 2)
	{//Skill question
		for (var i = 0; i < skills.length; i++){
			html += "<fieldset class='form-group inline question'><legend class='form-label-bold' for='2:"+i+"'>"+skills[i].question+"</legend><p class='form-hint'>E.g. "+skills[i].hint+"</p><label class='block-label'><input id='2:"+i+"Y' name='2:"+i+"' type='radio' data-storage='-1'/>Yes</label><label class='block-label'><input id='2:"+i+"N' name='2:"+i+"' type='radio' data-storage='-2'/>No</label></fieldset>";
		}
	}
	else
	{//Normal questions
		html = "<fieldset class='form-group inline question' name='set"+n+"'><legend class='form-label-bold' for='"+n+"'>"+question+"</legend><p class='form-hint'> E.g. "+hint+"</p><label class='block-label'><input id='"+n+"Y' name='"+n+"' type='radio' data-storage='1'/>Yes</label><label class='block-label'><input id='"+n+"N' name='"+n+"' type='radio' value='0'/>No</label></fieldset>";
	}
	$('.form').append(html)
	var latestElement = document.getElementsByName('set'+n);
	latestElement[0].scrollIntoView();
}

function appendLevel(level, name){
	var html = "<div class='level' name='"+name+"'><p class='heading-large panel-indent'>They are a level ";
	switch(level){
		case -1: html += '1:</br>Never have, never will'; break;
		case -2: html += '2:</br>Was online but no longer'; break;
		case -3: html += '3:</br>Willing and unable'; break;
		case -4: html += '4:</br>Reluctantly online'; break;
		case -5: html += '5:</br>Learning the ropes'; break;
		case -6: html += '6:</br>Task specific'; break;
		case -7: html += '7:</br>Basic digital skills'; break;
		case -8: html += '8:</br>Confident'; break;
		case -9: html += '9:</br>Expert'; break;
	}
	html += "</p> <a class='button' href='routing.html'>Continue</a></div>";
	$('.form').append(html);
}


				


function unWrapPlaceholder(){
  $(this).contents().unwrap();
  $("#proposition-name").html("Digital Inclusion Plotter");
}




$( document ).ready(function() {
  $('[data-includefile]').each(function(){
    var file = $(this).attr("data-includefile");
    $(this).load("includes/"+$(this).attr("data-includefile")+".html", unWrapPlaceholder)
  });

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
    eval($this.attr('name'),parseInt($this.attr('data-storage')));
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
