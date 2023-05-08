class UsersController < ApplicationController
    before_action :authorize, only: [:show]
    rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found

    # def create
    #     user = User.create(user_params)
    #     if user.valid?
    #       session[:user_id] = user.id
    #       render json: user, status: :created
    #     else
    #       render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    #     end
    # end
    


    def create
        user = User.create(user_params)
        if user.valid?
          session[:user_id] = user.id
          
          profile = Profile.new(profile_params)
          profile.user_id = user.id
          profile.save
          
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
      def show
        current_user = User.find(session[:user_id])
        render json: current_user
      end 
      
    # def show
    #     current_user = User.find(session[:user_id])
    #     render json: current_user
    # end 
  
    private

    def user_params
        params.permit(:username, :password, :email)
    end
    def profile_params
        params.permit(:first_name, :last_name, :bio, :dob, :gender, :featured_image)
    end 
end
