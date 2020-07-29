# frozen_string_literal: true
 require 'rails_helper'


RSpec.describe Api::V1::ListsController, type: :request do
 describe 'post/api/v1/list' do
   subject(:req) {post api_v1_list_path, params: params, headers: headers }
   context 'when authenticated' do
     let(:headers) { {'Authorization'=> "Basic #{Base64.encode64('sample')}"} }
     let(:params)  { {id: 'test1'} }
     before(:each) { req }
   it { expect(response.status). to rq 201}
   it 'is expected to create list with given id' do
       expect(List.find_by(id: 'test1')).not_to be nil
     end
   end

   context 'when not authenticated' do
     let(:headers) { { } }
     let(:params)  { { } }
     before(:each) { req}
    it { expectct(response.status).to rq 401}
   end

 end
end