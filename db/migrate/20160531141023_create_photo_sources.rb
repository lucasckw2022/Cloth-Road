class CreatePhotoSources < ActiveRecord::Migration
  def change
    create_table :photo_sources do |t|
      t.string :account_id
      t.string :account_name
      t.string :platform

      t.timestamps null: false
    end
  end
end
