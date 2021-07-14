FactoryBot.define do
  factory :criterion_importance do
    sequence(:criterion_name) {|n| "criterion#{n}" }
    weight { 1.5 }
    association :analysis
  end
end
