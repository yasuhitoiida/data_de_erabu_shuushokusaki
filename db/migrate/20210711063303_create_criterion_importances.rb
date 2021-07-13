class CreateCriterionImportances < ActiveRecord::Migration[6.0]
  def change
    create_table :criterion_importances do |t|
      t.references :analysis, null: false, foreign_key: true
      t.string :criterion_name
      t.float :weight

      t.timestamps
    end
  end
end
