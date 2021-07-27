class AnalysisObject < ApplicationController
  include ActiveModel::Model
  include ActiveModel::Attributes
  # include ActiveModel::Validations

  attribute :criterionImportance
  attribute :alternativeResult

  def save
    analysis = @@current_user.analyses.build
    analysis.save

    criterionImportance.each do |cri|
      analysis.criterion_importances.create(name: cri[:name], weight: cri[:weight])
    end

    alternativeResult.each do |alt|
      alternative = analysis.alternative_results.create(name: alt[:name], total: alt[:total])
      alt[:multipledWeight].each do |arr|
        alternative.multipled_weights.create(criterion: arr[:criterion], value: arr[:value])
      end
    end
  end
end
