class PiecesController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_data
    rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found

    def index
        user = User.find(session[:user_id])
        pieces = user.pieces
        render json: pieces
    end

    def create 
        user = User.find(session[:user_id])
        piece = user.pieces.create!(piece_params)
        render json: piece, status: :created
    end 

    def update
        piece = Piece.find(params[:id])
        piece.update!(piece_params)
        render json: piece
    end 

    def destroy 
        user = User.find(session[:user_id])
        piece = user.pieces.find(params[:id])
        piece.destroy
        head :no_content
    end

    private 

    def piece_params 
        params.permit(:brand_id, :style_id, :name, :price, :notes, :size, :featured_image, :image_url)
    end 
end
