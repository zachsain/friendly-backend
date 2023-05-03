class CreateBrands < ActiveRecord::Migration[6.1]
  def change
    create_table :brands do |t|
      t.string :name
      t.string :address
      t.string :head_quarters 
      t.string :logo_url
      t.text :description

      t.timestamps
    end
  end
end
