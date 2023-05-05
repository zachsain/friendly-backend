class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.belongs_to :sender, foreign_key: { to_table: :users }
      t.belongs_to :receiver, foreign_key: { to_table: :users }
      t.belongs_to :match, foreign_key: true
      t.text :content
      t.timestamps
    end
  end
end
