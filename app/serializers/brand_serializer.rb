class BrandSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :logo_url, :description, :head_quarters 

  # has_many :pieces
  # has_many :users, through: :pieces 
  # has_many :styles, through: :pieces

end
