# frozen_string_literal: true
#モデル根本クラス

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
