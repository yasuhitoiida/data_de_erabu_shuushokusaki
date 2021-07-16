class MultipledWeight < ApplicationRecord
  belongs_to :alternative_result

  validates :criterion_name, presence: true, length: { maximum: 50 }
  validates :value,          presence: true
end
