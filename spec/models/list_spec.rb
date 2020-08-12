# frozen_string_literal: true

require 'rails_helper'

RSpec.describe List, type: :model do
  it do
   list =List.new(
     name: "佐藤太郎",
     content: "テストです"
   )
   expect(list).to be_valid
  end

  it do
    list =List.new(
      name: " ",
      content: "テストです"
    )
    expect(user.errors[:name]).to include("can't be blank")
  end

  it do
    list =List.new(
      name: "佐藤太郎",
      content: " "
    )
    expect(user.errors[:content]).to include("can't be blank")


