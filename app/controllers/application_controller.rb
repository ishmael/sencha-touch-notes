class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :addnote,:adjust_format_for_iphone
  
  private 
  
  def addnote
    if not current_user.nil?
      @toolbar_note = current_user.notes.new
    end
  end
  
  def adjust_format_for_iphone
    if request.format == :html
      request.format = :mobile if mobile_device?
    end
  end  

  def mobile_device?
    user_agent = request.user_agent
    user_agent =~ /Mobile|webOS/
  end
  helper_method :mobile_device?  
end
