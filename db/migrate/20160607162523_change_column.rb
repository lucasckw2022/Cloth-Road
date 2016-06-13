class ChangeColumn < ActiveRecord::Migration
  def change
    remove_column :photos, :styleType
    add_column :photo_sources, :styleType, :string
  end
end
