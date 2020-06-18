# frozen_string_literal: true
 module Api
  module V1
class ListController < ApplicationController
  def index
   @lists =List.all
  end

  def create
    @list= List.new(id: params[:id])
    if @list.save
      render json: @list, status: :created
    else
      render json: @list.errors, stasus: :errors
    end
  end

  def edit
    @list= List.find_by(url: params[:id])
  end

  def update
    @list= List.find_by(params[:id])
    if @list.save
      render json: @list, status: :success
    else
      render json: @list.errors, status: :bad_request
    end
   end
  def destroy
    @list= List.find_by(params[:id])
    if @list.destroy
      render json: :@list, status: :destroy
    else
      render json: @list.errors, status: :errors
    end
  end
   end
  end
 end