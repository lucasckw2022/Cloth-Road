class CommentsController < ApplicationController
  respond_to :json

  def index
    # post = Post.find params[:post_id]
    # respond_with post.comments.all.order("created_at DESC")
    respond_with Comment.all
  end

  def create
    comment_params = params.permit([:body,:post_id, :user_id])
    respond_with(Comment.create(comment_params),location:nil)
  end

end
