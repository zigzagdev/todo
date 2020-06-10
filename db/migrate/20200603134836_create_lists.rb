class CreateLists < ActiveRecord::Migration[6.0]
  def change
    create_table :lists do |t|
      t.string :name,null :false,comment: "投稿リスト"
      t.text :content,null :false,comment: "投稿内容"
      t.timestamps
    end
  end
end