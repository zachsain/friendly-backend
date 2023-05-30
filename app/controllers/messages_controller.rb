class MessagesController < ApplicationController
    before_action :authorize, only: [:create]
    
    def create 
        user = User.find(session[:user_id])
        message = user.message.create(message_params)
    end 

    private 

    def message_params 
        params.permit(:sender_id, :receiver_id, :match_id, :content)
    end 

end
