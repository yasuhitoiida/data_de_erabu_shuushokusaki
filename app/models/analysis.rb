class Analysis < ApplicationRecord
  belongs_to :user
  has_many :criterion_importances
  has_many :alternative_results
end
