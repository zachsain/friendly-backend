class StylesController < ApplicationController
    before_action :authorize, only: [:show, :create]
    rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_data
    rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found

    def index
        style = Style.all
        render json: style
    end

    def create 
        style = Style.create!(style_params)
        render json: style, status: :created 
    end 

    # def destroy 
    #     style = Style.find(params[:id])
    #     style.destroy  
    #     head :no_content
    # end

    private 

    def style_params 
        params.permit(:name, :url_photo, :description, :category)
    end 


end
