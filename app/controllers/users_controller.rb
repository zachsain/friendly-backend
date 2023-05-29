class UsersController < ApplicationController
    before_action :authorize, only: [:show]
    rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found

    def create
        user = User.create(user_params)
        if user.valid?
          session[:user_id] = user.id
          
          profile = Profile.new(profile_params)
          profile.user_id = user.id
          profile.featured_image.attach(params[:featured_image])
          profile.save
          
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
     def show
      current_user = User.find(session[:user_id])
      matched_users = fetch_matched_users(current_user)

      serialized_matched_users = matched_users.map do |user|
        UserSerializer.new(user, include: :profile)
      end

    render json: { user: UserSerializer.new(current_user), matched_with: serialized_matched_users }
    end


    private

    def user_params
        params.permit(:username, :password, :email)
    end

    # def fetch_matched_users(user)
    #   user_matches = user.matches
    #   matched_users = []
    #   user_matches.each do |match|
    #     matched_user_id = match.user1_id == user.id ? match.user2_id : match.user1_id
    #     matched_user = User.find(matched_user_id)
    #     matched_users << matched_user
    #   end
    #   matched_users
    # end
    
    def fetch_matched_users(user)
      user_matches = user.matches
      matched_user_ids = user_matches.pluck(:user1_id, :user2_id).flatten.uniq - [user.id]
      matched_users = User.where(id: matched_user_ids).includes(:profile)
      matched_users
    end
    

    def profile_params
        params.permit(:first_name, :last_name, :bio, :dob, :gender, :featured_image)
    end 
end
