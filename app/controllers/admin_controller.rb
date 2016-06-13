class AdminController < ApplicationController

  def photos
    @photos = Photo.order("created_at DESC").all
  end

  def photo_sources
    @photo_source = PhotoSource.new
    @photo_sources = PhotoSource.order("created_at DESC").all
  end
end
