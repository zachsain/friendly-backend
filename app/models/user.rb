class User < ApplicationRecord
    has_one :profile, dependent: :destroy
    has_many :swipes, foreign_key: :swiper_id
    has_many :reverse_swipes, foreign_key: :swipee_id, class_name: 'Swipe'
    has_many :messages, dependent: :destroy
    # has_many :sent_messages, class_name: 'Message', foreign_key: :sender_id, dependent: :destroy
    # has_many :received_messages, class_name: 'Message', foreign_key: :receiver_id, dependent: :destroy
    # has_many :messages, dependent: :destroy
    has_many :matches_as_user1, class_name: 'Match', foreign_key: :user1_id
    has_many :matches_as_user2, class_name: 'Match', foreign_key: :user2_id
    has_many :messages, through: :matches
    has_many :messages_through_matches, through: :matches, source: :messages
    has_secure_password

    def matches
        matches_as_user1.or(matches_as_user2)
    end

    def messages_for_match(match_id)
        messages.where(match_id: match_id)
    end
  
    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
end
