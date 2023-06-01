class SwipesController < ApplicationController
    before_action :authorize, only: [:create]

    def create
        user = User.find(session[:user_id])
        swipe = user.swipes.create(swipe_params)
        matching_swipe = find_matching_swipe(swipe)
        handle_matching_swipe(matching_swipe) if matching_swipe.present?
        
        # render json: { user: user_with_profile(user), match: matching_swipe.present? }   
        render json: { user: user_with_profile(user), match: matching_swipe.present? }
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
        Match.create(user1_id: matching_swipe.swiper_id, user2_id: matching_swipe.swipee_id)

      end

      def user_with_profile(user)
        profile = user.profile.slice(:id, :first_name, :last_name, :bio, :dob, :gender)
      
        if user.profile.featured_image.attached?
          profile[:featured_image] = { url: rails_blob_url(user.profile.featured_image) }
        end
      
        { id: user.id, username: user.username, email: user.email, profile: profile }
      end
      

  end
  