class CreatePieces < ActiveRecord::Migration[6.1]
  def change
    create_table :pieces do |t|
      t.integer :user_id
      t.integer :brand_id
      t.integer :style_id
      t.string :name 
      t.string :price
      t.string :notes
      t.string :size
      t.string :image_url
      t.timestamps
    end
  end
end
