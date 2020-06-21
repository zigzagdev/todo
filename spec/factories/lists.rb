# frozen_string_literal: true

  FactoryBot.define do
    factory :list do
      sequence(:name) { |i|  "Test project #{i}"}
      end
    end