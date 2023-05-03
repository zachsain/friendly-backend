class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.belongs_to :user, index: true
      t.belongs_to :match, index: true
      t.text :content
      t.timestamps
    end
  end
end
