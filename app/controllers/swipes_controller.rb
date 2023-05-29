class SwipesController < ApplicationController
    before_action :authorize, only: [:create]

    def create
        user = User.find(session[:user_id])
        swipe = user.swipes.create(swipe_params)
        matching_swipe = find_matching_swipe(swipe)
        handle_matching_swipe(matching_swipe) if matching_swipe.present?
      
        response_data = {
          swipe: swipe,
          match: matching_swipe.present?
        }
      
        render json: response_data
      end
      
    private 
  
    def swipe_params
      params.permit(:swiper_id, :swipee_id, :direction)
    end 
  
    def find_matching_swipe(swipe)
        Swipe.find_by(
          swiper_id: swipe.swipee_id,
          swipee_id: swipe.swiper_id,
          direction: 'right' 
        )
      end
  
    def handle_matching_swipe(matching_swipe)
        Match.create(user1_id: matching_swipe.swiper_id, user2_id: matching_swipe.swipee_id)

      end
      
  end
  