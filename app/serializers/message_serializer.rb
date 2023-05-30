class MessageSerializer < ActiveModel::Serializer
  attributes :id, :receiver_id, :sender_id, :content
end
 