class Match < ApplicationRecord
    belongs_to :user1, class_name: 'User'
    belongs_to :user2, class_name: 'User'
  
    has_many :messages, dependent: :destroy
  
    validates :user1_id, uniqueness: { scope: :user2_id }
    validates :user2_id, uniqueness: { scope: :user1_id }
end
