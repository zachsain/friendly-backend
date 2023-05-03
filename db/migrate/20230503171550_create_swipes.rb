class CreateSwipes < ActiveRecord::Migration[6.1]
  def change
    create_table :swipes do |t|
      t.integer :swiper_id
      t.integer :swipee_id
      t.string :direction
      t.timestamps
    end
  end
end
