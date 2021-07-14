class Api::AlternativesController < ApplicationController
  before_action :authenticate!

  def create
    alternatives = @current_user.alternatives.build(alternative_params)
    
    if alternatives.save
      render json: alternatives
    else
      render json: alternatives.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def alternative_params
    params.require(:alternative).permit(name: [])
  end
end
