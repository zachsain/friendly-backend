class CreateStyles < ActiveRecord::Migration[6.1]
  def change
    create_table :styles do |t|
      t.string :name
      t.string :url_photo
      t.string :description 
      t.string :category
      t.timestamps
    end
  end
end
