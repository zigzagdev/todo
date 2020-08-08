# frozen_string_literal: true

FactoryBot.define do
  factory :list do
   sequence(:task_name) { |i|  "佐藤#{i}"}
   sequence( :content) { |i|  "試しのテスト#{i}"}

  end
 end
