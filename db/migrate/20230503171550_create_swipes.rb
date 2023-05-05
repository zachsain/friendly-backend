class CreateSwipes < ActiveRecord::Migration[6.1]
  def change
    create_table :swipes do |t|
      t.references :swiper, null: false, foreign_key: { to_table: :users }
      t.references :swipee, null: false, foreign_key: { to_table: :users }
      t.boolean :direction

      t.timestamps
    end
  end
end
