class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email

  has_one :profile 
  has_many :matches
  has_many :swipes
  has_many :messages, through: :matches 

  def messages
    object.matches.flat_map(&:messages)
  end

 

end
