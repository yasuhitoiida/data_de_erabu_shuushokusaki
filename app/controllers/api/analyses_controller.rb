class Api::AnalysesController < ApplicationController
  before_action :authenticate!

  def create
    analysis = AnalysisObject.new(analysis_params)

    if analysis.save
      render json: analysis
    else
      render json: analysis.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def analysis_params
    params.require(:analysis).permit(criterion_importance: [:name, :weight])
  end
end
