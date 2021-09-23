class Api::AnalysesController < ApplicationController
  before_action :authenticate!
  before_action :set_analysis, only: %i[show destroy]

  def index
    render json: @current_user.analyses.order(created_at: :desc)
  end

  def show
    importances = @analysis.criterion_importances
    results = @analysis.alternative_results.eager_load(:multipled_weights).map.to_json(methods: :multipledWeight)

    render json: { analysis: @analysis, criterionImportances: importances, alternativeResults: JSON.parse(results) }
  end

  def create
    analysis = AnalysisCreator.new(analysis_params)

    if analysis.save
      render json: analysis
    else
      render json: analysis.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @analysis.destroy!
  end

  private

  def analysis_params
    params.require(:analysis).permit(criterionImportance: %i[name weight], alternativeResult: [:name, :total, { multipledWeight: %i[criterion value] }]).merge(user: @current_user)
  end

  def set_analysis
    @analysis = Analysis.find(params[:id])
  end
end
