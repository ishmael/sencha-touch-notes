  $(document).ready(function(){
	if ($('.devise').length)
	{
      $.tools.validator.fn("#email", function(input, value) {
          return value!='Email' ? true : {     
              en: "Please complete this mandatory field"
          };
      });
    	
      $.tools.validator.fn("#password", function(input, value) {
          return value!='Password' ? true : {     
              en: "Please complete this mandatory field"
          };
      });

      $.tools.validator.fn("#password_confirmation", function(input, value) {
          return value!='Password' ? true : {     
              en: "Please complete this mandatory field"
          };
      });

      $(".devise").validator({ 
      	position: 'top', 
      	offset: [25, 10],
      	messageClass:'form-error',
      	message: '<div><em/></div>' // em element is the arrow
      });
	}
  });
