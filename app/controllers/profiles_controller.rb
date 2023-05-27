class ProfilesController < ApplicationController
    before_action :authorize, only: [:update]
    rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_data
  
    def index 
        profiles = Profile.all
        render json: profiles
    end

    def update
      user = User.find(session[:user_id])
      profile = user.profile
  
      if profile_params[:featured_image].present?
        profile.featured_image.attach(profile_params[:featured_image])
      end
  
      profile.update!(profile_params.except(:featured_image))
      render json: user
    end

     
  
    private
  
    def profile_params
      params.permit(:first_name, :last_name, :bio, :featured_image, :user_id)
    end
  end
  
