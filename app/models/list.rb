# frozen_string_literal: true
#リスト投稿

class List< ApplicationRecord

  validates :name, presence: true, length: { in:2..10}
  validates :content, presence: true, length: { in:3..30}

end