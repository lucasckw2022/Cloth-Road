class Photo < ActiveRecord::Base
  belongs_to :photo_source
  validates :link, uniqueness: true
end
