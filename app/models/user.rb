class User < ApplicationRecord
    has_one :profile, dependent: :destroy
    has_many :swipes, foreign_key: :swiper_id
    has_many :reverse_swipes, foreign_key: :swipee_id, class_name: 'Swipe'
    has_many :messages, dependent: :destroy
    has_many :sent_messages, class_name: 'Message', foreign_key: :sender_id, dependent: :destroy
    has_many :received_messages, class_name: 'Message', foreign_key: :receiver_id, dependent: :destroy
    has_many :matches, foreign_key: :user1_id
    has_many :reverse_matches, foreign_key: :user2_id, class_name: 'Match'
    has_secure_password
  
    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
end
