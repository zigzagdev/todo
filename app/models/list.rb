# frozen_string_literal: true
#リスト投稿

class List < ApplicationRecord

  validates :name, presence: true, uniqueness: true
  validates :content, presence: true, uniqueness: true

end