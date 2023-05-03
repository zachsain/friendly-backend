class PieceSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id,  :featured_image, :user_id, :brand_id, :style_id, :name, :price, :notes, :size, :image_url

  # belongs_to :user
  # belongs_to :brand 
  # belongs_to :style

  def featured_image
    if object.featured_image.attached?
      {
        url: rails_blob_url(object.featured_image)
      }
    end
  end
end
