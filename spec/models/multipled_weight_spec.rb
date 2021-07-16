require 'rails_helper'

RSpec.describe MultipledWeight, type: :model do
  it '有効' do
    cri = build(:multipled_weight)
    expect(cri).to be_valid
  end

  it '選択肢名がないとき無効' do
    cri = build(:multipled_weight, criterion_name: '')
    expect(cri).to_not be_valid
  end

  it '選択肢名が51文字以上であるとき無効' do
    cri = build(:multipled_weight, criterion_name: 'a' * 51)
    expect(cri).to_not be_valid
  end

  it '選択肢名が空白文字であるとき無効' do
    cri = build(:multipled_weight, criterion_name: ' ')
    expect(cri).to_not be_valid
  end

  it '値がないとき無効' do
    cri = build(:multipled_weight, value: nil)
    expect(cri).to_not be_valid
  end
end
