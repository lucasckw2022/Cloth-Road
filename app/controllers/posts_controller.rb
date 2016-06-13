class PostsController < ApplicationController
  respond_to :json

  def index
    respond_with Post.all.order("created_at DESC")
  end

  def create
    post_params = params.permit([:title, :body, :user_id])
    respond_with Post.create(post_params)
  end
end
