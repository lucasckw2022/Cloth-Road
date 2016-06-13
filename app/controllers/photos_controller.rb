class PhotosController < ApplicationController
  respond_to :json
  before_action :find_photos, only:[:update,:destroy]
  # require 'pinterest-api'

  def index
    respond_with Photo.all.order("id DESC")
  end

  def create
    #get facebook images
    PhotoSource.all.each do |source|
      if source.platform == "Facebook"
        access_token = ENV['FACEBOOK__access_token']
        facebook = Koala::Facebook::GraphAPI.new(access_token)
        fbphoto = facebook.get_connection(source.account_id,"photos?fields=images&type=uploaded")
        owner = facebook.get_object(source.account_id)
        fbphoto.each do |data|
          link = data["images"][0]["source"]
          provider = "http://facebook.com/" + source.account_id
          Photo.create({link: link, provider: provider, photo_source: source, published: true})
        end
      elsif source.platform == "Pinterest"
        # access_token = ENV['Pinterest_access_token']
        # client = Pinterest::Client.new(access_token)
        # client.get_boards()
      end
    end
    redirect_to admin_photos_path
  end

  def update
    @photos.published ? @photos.published = false : @photos.published = true
    @photos.save
    redirect_to admin_photos_path
  end

  def destroy
    @photos.destroy
    redirect_to admin_photos_path
  end

  private

  def find_photos
    @photos = Photo.find params[:id]
  end
end
