class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
  has_one :profile, key: :profile_attributes
end
