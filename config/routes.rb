# frozen_string_literal: true

Rails.application.routes.draw do
  get 'list/index'
  get 'list/create'
  get 'list/edit'
  get 'list/destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
