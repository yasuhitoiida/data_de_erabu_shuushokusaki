require 'rails_helper'

RSpec.describe CriterionImportance, type: :model do
  it '有効' do
    cri = build(:criterion_importance)
    expect(cri).to be_valid
  end

  it '評価基準名がないとき無効' do
    cri = build(:criterion_importance, name: '')
    expect(cri).to_not be_valid
  end

  it '評価基準名が51文字以上であるとき無効' do
    cri = build(:criterion_importance, name: 'a' * 51)
    expect(cri).to_not be_valid
  end

  it '評価基準名が空白文字であるとき無効' do
    cri = build(:criterion_importance, name: ' ')
    expect(cri).to_not be_valid
  end

  it '値がないとき無効' do
    cri = build(:criterion_importance, weight: nil)
    expect(cri).to_not be_valid
  end
end
