FactoryBot.define do
  factory :multipled_weight do
    sequence(:criterion) {|n| "criterion#{n}" }
    value { 1.5 }
    association :alternative_result
  end
end
