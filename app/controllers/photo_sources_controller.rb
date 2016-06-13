class PhotoSourcesController < ApplicationController

  def create
    photo_params = params.require(:photo_source).permit([:account_id,:platform,:styleType])
    photo_source = PhotoSource.new photo_params
    if photo_source.save
      redirect_to admin_photo_sources_path
    else
      render admin_photo_sources_path
    end
  end

  def destroy
    @photo_source = PhotoSource.find params[:id]
    @photo_source.destroy
    redirect_to admin_photo_sources_path
  end

end
