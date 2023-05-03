class User < ApplicationRecord
    has_one :profile
    has_many :swipes
    has_many :sent_messages, class_name: "Message", foreign_key: :user_id
    has_many :matches, foreign_key: :user1_id
    has_many :matched_users, through: :matches, source: :user2
end
