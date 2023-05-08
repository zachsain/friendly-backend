class ProfilesController < ApplicationController
    before_action :authorize, only: [:show]
    rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
end
