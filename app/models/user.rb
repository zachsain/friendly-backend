class User < ApplicationRecord
    has_one :profile, dependent: :destroy
    has_many :swipes_as_swiper, foreign_key: :swiper_id, class_name: 'Swipe', dependent: :destroy
    has_many :swipes_as_swipee, foreign_key: :swipee_id, class_name: 'Swipe', dependent: :destroy
    has_many :swipers, through: :swipes_as_swipee
    has_many :swipees, through: :swipes_as_swiper
    has_many :messages, dependent: :destroy
    has_many :sent_messages, class_name: 'Message', foreign_key: :sender_id, dependent: :destroy
    has_many :received_messages, class_name: 'Message', foreign_key: :receiver_id, dependent: :destroy
  
    has_secure_password
  
    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
end
