class SessionsController < ApplicationController
  before_action :redirect_if_loggedin, only: [:new, :create]
  respond_to :json

  def new
  end

  def create
    user = User.find_by_email params[:email]
    if user && user.authenticate(params[:password])
      session[:id] = user.id
      render json: user, except: :password_digest
    else
      render json: { errors: ['The email address or password entered is not valid'] }
    end
  end

  def delete
    sessions[:id] = nil
  end

  private

 def redirect_if_loggedin
   redirect_to root_path, notice: "Already logged in" if user_signed_in?
 end

end
