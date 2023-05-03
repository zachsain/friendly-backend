class StyleSerializer < ActiveModel::Serializer
  attributes :id, :name, :url_photo, :description, :category

  # has_many :pieces

end
