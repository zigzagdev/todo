class CreateLists < ActiveRecord::Migration[6.0]
  def change
    create_table :lists do |t|
      t.string :name,null: false,comment: "やるべきこと"
      t.text :content,null: false,comment: "やるべき具体的内容"
      t.timestamps
    end
  end
end