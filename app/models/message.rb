class Message < ApplicationRecord
    belongs_to :sender, class_name: 'User'
    belongs_to :receiver, class_name: 'User'
    # belongs_to :user
    belongs_to :match
    
  validates :content, presence: true
end
