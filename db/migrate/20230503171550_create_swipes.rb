class CreateSwipes < ActiveRecord::Migration[6.1]
  def change
    create_table :swipes do |t|
      t.references :swiper, null: false, foreign_key: { to_table: :users }
      t.references :swipee, null: false, foreign_key: { to_table: :users }
      t.string :direction

      t.timestamps
    end
  end
end
