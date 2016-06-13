class UsersController < ApplicationController
  respond_to :json

  def new
    @user = User.new
  end

  def create
    user_params = params.permit([:first_name,:last_name,:email,:password,:password_confirmation])
    respond_with User.create(user_params)
  end

  def delete

  end
end
