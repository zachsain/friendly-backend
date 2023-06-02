class MatchSerializer < ActiveModel::Serializer
  attributes :id, :user1_id, :user2_id, :created_at, :updated_at, :user1_opened, :user2_opened

  has_many :messages

  
end
