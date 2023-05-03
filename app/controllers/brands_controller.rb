class BrandsController < ApplicationController
    before_action :authorize, only: [:show, :create]
    rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_data
    rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found

    def index
        brands = Brand.all
        render json: brands
    end

    def create 
        brand = Brand.create!(brand_params)
        render json: brand
    end 
    
    # def destroy 
    #     brand = Brand.find(params[:id])
    #     brand.destroy  
    #     head :no_content
    # end

    private 

    def brand_params 
        params.permit(:name, :address, :head_quarters, :logo_url, :description)
    end
end
