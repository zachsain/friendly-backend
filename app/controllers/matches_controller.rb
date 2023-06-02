class MatchesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
    before_action :authorize, only: [:update]

    def update 
      match = Match.find(params[:id])
      
      if match.user1_id == params[:id]
        match.update(user1_opened: true)
      else
        match.update(user2_opened: true)
      end
    end
  end
