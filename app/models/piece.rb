class Piece < ApplicationRecord
    belongs_to :user
    belongs_to :brand
    belongs_to :style
    validates :name, presence: true
    has_one_attached :featured_image

end
