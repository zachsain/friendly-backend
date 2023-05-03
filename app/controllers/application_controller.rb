class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  private 

  def authorize
    @current_user = User.find_by(id: session[:user_id])
    render json: { errors: ['Not authorized'] }, status: :unauthorized unless @current_user
  end

  def handle_invalid_data(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def handle_not_found(error)
    render json: { errors: ["#{error.model} not found"] }, status: :not_found
  end
  
end
