class MessagesController < ApplicationController
    before_action :authorize, only: [:create, :update]

    def create 
        match = Match.find(params[:match_id])
        message = match.messages.create(message_params)
        render json: match
    end 


    def update 
        message = Message.find(params[:id])
        message.update(receiver_read: true)
    end

    private 

    def message_params 
        params.permit(:sender_id, :receiver_id, :match_id, :content)
    end 

end
