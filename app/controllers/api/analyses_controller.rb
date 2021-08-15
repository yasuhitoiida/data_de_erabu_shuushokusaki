class Api::AnalysesController < ApplicationController
  before_action :authenticate!
  before_action :set_analysis, only: %i[show destroy]

  def index
    render json: @@current_user.analyses.order(created_at: :desc)
  end

  def show
    importances = @analysis.criterion_importances
    alt = @analysis.alternative_results
    results = JSON.parse(alt.map.to_json(methods: :multipledWeight))

    render json: { analysis: @analysis, criterionImportances: importances, alternativeResults: results }
  end

  def create
    analysis = AnalysisObject.new(analysis_params)

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
    params.require(:analysis).permit(criterionImportance: %i[name weight], alternativeResult: [:name, :total, multipledWeight: %i[criterion value]])
  end

  def set_analysis
    @analysis = Analysis.find(params[:id])
  end
end
