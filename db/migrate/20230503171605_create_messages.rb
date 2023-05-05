class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.belongs_to :sender, foreign_key: { to_table: :users }
      t.belongs_to :receiver, foreign_key: { to_table: :users }
      t.integer :match_id
      t.text :content
      t.timestamps
    end
  end
end
