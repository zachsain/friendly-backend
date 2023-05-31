class MatchSerializer < ActiveModel::Serializer
  attributes :id, :user1_id, :user2_id, :created_at, :updated_at

  has_many :messages

  
end
