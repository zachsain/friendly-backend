class MessageSerializer < ActiveModel::Serializer
  attributes :id, :receiver_id, :sender_id, :content, :match_id, :created_at, :updated_at
end
 