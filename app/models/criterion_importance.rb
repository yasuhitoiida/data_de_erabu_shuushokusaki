class CriterionImportance < ApplicationRecord
  belongs_to :analysis

  validates :criterion_name, presence: true, length: { maximum: 50 }
  validates :weight,         presence: true
end
