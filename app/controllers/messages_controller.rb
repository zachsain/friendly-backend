class MessagesController < ApplicationController
    before_action :authorize, only: [:create]

    def create 
        match = Match.find(params[:match_id])
        message = match.messages.create(message_params)
        render json: match
    end 

    private 

    def message_params 
        params.permit(:sender_id, :receiver_id, :match_id, :content)
    end 

end
