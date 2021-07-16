class MultipledWeight < ApplicationRecord
  belongs_to :alternative_result

  validates :criterion,    presence: true, length: { maximum: 50 }
  validates :value,        presence: true
end
