class CreateMatches < ActiveRecord::Migration[6.1]
  def change
    create_table :matches do |t|
      t.integer :user1_id
      t.integer :matched_id
      t.timestamps
    end
  end
end
