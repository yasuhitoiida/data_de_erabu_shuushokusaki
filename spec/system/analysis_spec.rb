require 'rails_helper'

RSpec.describe 'Analysis', type: :system do
  let(:criterion_number) { 3 }
  let(:alternative_number) { 3 }
  describe 'STEP1' do
    it '入力された就職先が2つ未満のときエラーメッセージが表示される' do
      visit '/analysis/step1'
      find("#alternative0").set("company0")
      click_on '決定'
      expect(page).to have_selector('.error-message')
    end
  end

  describe 'STEP2' do
    it '条件が一つも選択されていないときエラーメッセージが表示される' do
      visit '/analysis/step1'
      alternative_input(alternative_number)
      click_on '決定'
      expect(page).to have_selector('.error-message')
    end
  end

  describe 'STEP3' do
    it 'ラジオボタンがすべて押されていないときエラーメッセージが表示される' do
      visit '/analysis/step1'
      alternative_input(alternative_number)
      criterion_select(criterion_number)
      criterion_importance(criterion_number-1)
      expect(page).to have_selector('.error-message')
    end
  end

  describe 'STEP4' do
    it "ラジオボタンがすべて押されていないときエラーメッセージが出る" do
      visit '/analysis/step1'
      alternative_input(alternative_number)
      criterion_select(criterion_number)
      criterion_importance(criterion_number)
      alternative_evaluation(criterion_number, alternative_number-1)
      expect(page).to have_selector('.error-message')
    end
  end
end
