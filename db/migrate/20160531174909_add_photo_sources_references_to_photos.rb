class AddPhotoSourcesReferencesToPhotos < ActiveRecord::Migration
  def change
    add_reference :photos, :photo_source, index: true, foreign_key: true
  end
end
