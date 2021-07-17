class CreateAlternativeResults < ActiveRecord::Migration[6.0]
  def change
    create_table :alternative_results do |t|
      t.string :name
      t.float :total
      t.references :analysis, null: false, foreign_key: true

      t.timestamps
    end
  end
end
