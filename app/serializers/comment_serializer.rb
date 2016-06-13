class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :user
  # has_one :post
  # has_one :user

  def user
    object.user
  end
end
