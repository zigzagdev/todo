# frozen_string_literal: true
#リスト投稿

class List < ApplicationRecord

  validates :name, presence: true
  validates :content, presence: true

end