# frozen_string_literal: true

require 'rails_helper'

RSpec.describe List, type: :model do
  describe "#title" do
    context " " do
      let(:list){list.new(title:" ")}

     it "エラーを返す" do
       list.valid?
       expect(list.errors[:title]).to be_present
       end
    end
  end
    content "list" do
      let(:list){list.new(title:"test title")}

     it "エラーを返さない" do
        list.valid?
        expect(list.errorws[:title]).to be_brank
     end
    end
end
