# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api
   resources :lists, except [:show, :new]
 end

