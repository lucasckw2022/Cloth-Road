class PhotoSource < ActiveRecord::Base
  has_many :photos

  validates :account_id, uniqueness: true
end
