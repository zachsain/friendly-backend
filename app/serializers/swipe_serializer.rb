class SwipeSerializer < ActiveModel::Serializer
  attributes :id, :swiper_id, :swipee_id, :direction
end
