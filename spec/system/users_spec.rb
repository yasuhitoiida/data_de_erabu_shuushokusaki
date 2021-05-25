require 'rails_helper'

RSpec.describe 'User', type: :system do
  describe '新規登録' do
    before do
      visit root_path
      click_link 'ユーザー登録'
    end
    it '新規登録ページで各フィールドに入力し「登録」を押すとユーザーが登録されている' do
      within "#register-form" do
        fill_in 'ユーザー名', with: 'test'
        fill_in 'メールアドレス', with: 'test@example.com'
        fill_in 'パスワード', with: 'password'
        fill_in 'パスワード（確認）', with: 'password'
        click_on '登録'
      end
      expect(page).to have_current_path('/login'), 'ログインページに遷移できていません'
    end

    it '入力内容に不備があった場合エラーメッセージが表示されている' do
      within "#register-form" do
        fill_in 'ユーザー名', with: ''
        fill_in 'メールアドレス', with: 'test@example.com'
        fill_in 'パスワード', with: 'password'
        fill_in 'パスワード（確認）', with: 'password'
        click_on '登録'
      end
      expect(page).to have_css('li.error-message'), 'エラーメッセージが表示されていません'
    end
  end
end
