class RemoveColumn < ActiveRecord::Migration
  def change
    remove_column :photo_sources, :account_name
  end
end
