# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_13_214124) do

  create_table "alternative_results", force: :cascade do |t|
    t.string "alternative_name"
    t.float "total"
    t.integer "analysis_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["analysis_id"], name: "index_alternative_results_on_analysis_id"
  end

  create_table "analyses", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_analyses_on_user_id"
  end

  create_table "criterion_importances", force: :cascade do |t|
    t.integer "analysis_id", null: false
    t.string "criterion_name"
    t.float "weight"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["analysis_id"], name: "index_criterion_importances_on_analysis_id"
  end

  create_table "multipled_weights", force: :cascade do |t|
    t.string "criterion_name"
    t.float "value"
    t.integer "alternative_result_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["alternative_result_id"], name: "index_multipled_weights_on_alternative_result_id"
  end

  create_table "taxonomies", force: :cascade do |t|
    t.string "name"
    t.string "type"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_taxonomies_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "crypted_password"
    t.string "salt"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "alternative_results", "analyses"
  add_foreign_key "analyses", "users"
  add_foreign_key "criterion_importances", "analyses"
  add_foreign_key "multipled_weights", "alternative_results"
  add_foreign_key "taxonomies", "users"
end
