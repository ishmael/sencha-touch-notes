class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :addnote
  
  private 
  
  def addnote
    if not current_user.nil?
      @toolbar_note = current_user.notes.new
    end
  end
end
