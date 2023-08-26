class ProfilesController < ApplicationController
    # before_action :authorize, only: [:update, :index, :show]
    rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_data
  
    def index 
        swiped_profile_ids = Swipe.where(swiper_id: session[:user_id]).pluck(:swipee_id)
        profiles = Profile.where.not(user_id: session[:user_id]).where.not(id: swiped_profile_ids)
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

    def show 
        profile = Profile.find(params[:id])
        render json: profile
    end 
     
  
    private
  
    def profile_params
      params.permit(:first_name, :last_name, :bio, :featured_image, :user_id)
    end
  end
  
