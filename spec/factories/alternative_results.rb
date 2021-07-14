FactoryBot.define do
  factory :alternative_result do
    sequence(:alternative_name) {|n| "alternative#{n}" }
    total { 1.5 }
    association :analysis
  end
end
