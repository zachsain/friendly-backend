class ProfilesController < ApplicationController
    before_action :authorize, only: [:show]
    rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found

    def update
        user = User.find(params[:user_id])
        profile = user.profile.update!(profile_params)
        render json: profile 
    end 

    private 
    
    def profile_params 
        params.permit(:first_name, :last_name, :bio, :featured_image, :user_id)
    end 
    
end

