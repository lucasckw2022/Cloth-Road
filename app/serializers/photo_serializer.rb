class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :provider, :link, :created_at, :published, :source, :styleType

  def source
    object.photo_source.account_id
  end

  def styleType
    object.photo_source.styleType
  end
end
