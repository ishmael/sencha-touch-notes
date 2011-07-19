class SessionsController < Devise::SessionsController
  
  def create
    resource = warden.authenticate!(:scope => resource_name, :failure_app =>  "#{controller_path}#new")
    set_flash_message(:notice, :signed_in) if is_navigational_format?
    sign_in(resource_name, resource)
    respond_with(resource,:location => redirect_location(resource_name, resource)) do |format|
      format.json {render :json => {:success => true}  }      
    end
  end
  

  def failure
    respond_to do |format|
      format.html  redirect_to "#{controller_path}#new"
      format.json   render :json => {:success => false, :errors => "Login failed."}
    end
  end
end
