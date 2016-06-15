class PhotoSource < ActiveRecord::Base
  has_many :photos, dependent: :destroy

  validates :account_id, uniqueness: true
end
