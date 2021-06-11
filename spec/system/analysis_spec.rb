require 'rails_helper'

RSpec.describe 'Analysis', type: :system do
  let(:criterion_number) { 3 }
  let(:alternative_number) { 3 }
  describe 'STEP1' do
    before { visit '/analysis/step1' }
    it '入力された就職先が2つ以上のとき次ページに遷移する' do
      find('#alternative0').set('company0')
      find('#alternative1').set('company1')
      click_on '決定'
      expect(page).to have_current_path('/analysis/step2'), '次ページに遷移していません'
    end

    it '入力された就職先が2つ未満のときエラーメッセージが表示される' do
      find('#alternative0').set('company0')
      click_on '決定'
      expect(page).to have_selector('.error-message'), 'エラーメッセージが表示されていません'
    end
  end

  describe 'STEP2' do
    before do
      visit '/analysis/step1'
      alternative_input(alternative_number)
    end
    it '条件が2つ以上選択されているとき次ページに遷移する' do
      check('criterion0', allow_label_click: true)
      check('criterion1', allow_label_click: true)
      click_on '決定'
      expect(page).to have_current_path('/analysis/step3'), '次ページに遷移していません'
    end

    it '条件が2つ以上選択されていないときエラーメッセージが表示される' do
      check('criterion0', allow_label_click: true)
      click_on '決定'
      expect(page).to have_selector('.error-message'), 'エラーメッセージが表示されていません'
    end
  end

  describe 'STEP3' do
    before do
      visit '/analysis/step1'
      alternative_input(alternative_number)
      criterion_select(criterion_number)
    end
    it 'ラジオボタンがすべて押されているとき次ページに遷移する' do
      criterion_importance(criterion_number)
      expect(page).to have_current_path('/analysis/step4'), '次ページに遷移していません'
    end

    it 'ラジオボタンがすべて押されていないときエラーメッセージが表示される' do
      criterion_importance(criterion_number-1)
      expect(page).to have_selector('.error-message'), 'エラーメッセージが表示されていません'
    end
  end

  describe 'STEP4' do
    before do
      visit '/analysis/step1'
      alternative_input(alternative_number)
      criterion_select(criterion_number)
      criterion_importance(criterion_number)
    end
    it "ラジオボタンがすべて押されているとき次ページに遷移する" do
      alternative_evaluation(criterion_number, alternative_number)
      expect(page).to have_current_path('/analysis/result'), '次ページに遷移していません'
    end

    it "ラジオボタンがすべて押されていないときエラーメッセージが出る" do
      alternative_evaluation(criterion_number, alternative_number-1)
      expect(page).to have_selector('.error-message'), 'エラーメッセージが表示されていません'
    end
  end

  describe 'Result' do
    before do
      visit '/analysis/step1'
      alternative_input(alternative_number)
      criterion_select(criterion_number)
      criterion_importance(criterion_number)
      alternative_evaluation(criterion_number, alternative_number)
    end
    it '決定ボタンを押すと結果が表示される' do
      click_on '決定'
      expect(page).to have_selector('#bar-chart'), '結果が表示されていません'
    end
  end
end
