class Api::AnalysesController < ApplicationController
  before_action :authenticate!

  def index
    render json: @@current_user.analyses
  end

  def show
    analysis = @@current_user.analyses.find(params[:id])
    importances = analysis.criterion_importances
    alt = analysis.alternative_results
    results = JSON.parse(alt.map.to_json(methods: :multipledWeight))

    render json: { analysis: analysis, criterion_importances: importances, alternative_results: results }
  end

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
    params.require(:analysis).permit(criterion_importance: %i[name weight], alternative_result: [:name, :total, { multipledWeight: %i[criterion value] }])
  end
end
