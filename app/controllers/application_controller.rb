class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :addnote
  
  private 
  
  def addnote
    @toolbar_note = Note.new
  end
end
