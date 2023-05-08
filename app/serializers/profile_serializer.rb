class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :gender, :bio, :dob, :featured_image, :user_id

  def featured_image
    if object.featured_image.attached?
      {
        url: rails_blob_url(object.featured_image)
      }
    end
  end
end
