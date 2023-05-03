class User < ApplicationRecord
    has_many :pieces
    has_many :styles, -> { distinct }, through: :pieces
    has_many :brands, -> { distinct }, through: :pieces

    validates :username, presence: true, uniqueness: true
    has_secure_password
    has_one_attached :featured_image
end
