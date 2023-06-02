class SwipesController < ApplicationController
    before_action :authorize, only: [:create]

    def create
        user = User.find(session[:user_id])
        swipe = user.swipes.create(swipe_params)
        matching_swipe = find_matching_swipe(swipe)
        new_match_data = matching_swipe.present? ? handle_matching_swipe(matching_swipe) : nil
      
        render json: { user: user_with_profile(new_match_data), match: new_match_data.present? }
    end

    private 
  
    def swipe_params
      params.permit(:swiper_id, :swipee_id, :direction)
    end 
  
    def find_matching_swipe(swipe)
        matching_swipe = Swipe.find_by(
          swiper_id: swipe.swipee_id,
          swipee_id: swipe.swiper_id,
          direction: 'right' 
        )
        matching_swipe if matching_swipe&.direction == 'right'
    end
  
    def handle_matching_swipe(matching_swipe)
        match = Match.create(user1_id: matching_swipe.swiper_id, user2_id: matching_swipe.swipee_id)
        match
    end


    def user_with_profile(new_match_data)
        matching_user = User.find_by(id: new_match_data&.user1_id)
        return nil unless matching_user
          
        profile = matching_user.profile.slice(:id, :first_name, :last_name, :bio, :dob, :gender)
          
        if matching_user.profile.featured_image.attached?
            profile[:featured_image] = { url: rails_blob_url(matching_user.profile.featured_image) }
        end
          
        if new_match_data.present?
            matches = matching_user.matches_as_user1.map { |match| match.slice(:id, :user1_id, :user2_id, :created_at) }
            new_matches = matches << new_match_data.slice(:id, :user1_id, :user2_id, :created_at)
        end
          
        { id: matching_user.id, username: matching_user.username, email: matching_user.email, profile: profile, matches: new_matches}
    end
             
  end
  