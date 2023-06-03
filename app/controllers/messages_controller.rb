class MessagesController < ApplicationController
    before_action :authorize, only: [:create, :update]

    def create 
        match = Match.find(params[:match_id])
        message = match.messages.create(message_params)
        render json: match
    end 


    # def update 
    #     message = Message.find(params[:id])
    #     if message.receiver_id === session[:user_id]     
    #         message.update(receiver_read: true)
    #     end 
    #     render json: message
    # end


    # def update 
    #     match = Match.find(params[:match_id])
    #     match.map{|m| m.messages.where(receiver_id: session[:user_id]).update(reciever_read: true)} 
    # end

    def update
        match = Match.find(params[:match_id])
        most_recent_message = match.messages.order(created_at: :desc).first
        if most_recent_message
          match.messages.where(receiver_id: session[:user_id]).update_all(receiver_read: true)
        end
      end
    private 

    def message_params 
        params.permit(:sender_id, :receiver_id, :match_id, :content)
    end 

end
