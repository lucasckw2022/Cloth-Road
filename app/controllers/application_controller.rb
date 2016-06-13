class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def  user_signed_in?
    session[:user_id].present?
  end
  helper_method :user_signed_in?

  def index
    @location_path = "/#{params[:path]}"
  end

  def publish(data)
    data.published ? "Unpublish" : "Publish" 
  end
  helper_method :publish

end
