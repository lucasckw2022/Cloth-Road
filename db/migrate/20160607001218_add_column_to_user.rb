class AddColumnToUser < ActiveRecord::Migration
  def change
    add_column :photos, :styleType, :string
  end
end
