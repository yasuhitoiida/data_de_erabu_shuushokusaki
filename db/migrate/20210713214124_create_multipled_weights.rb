class CreateMultipledWeights < ActiveRecord::Migration[6.0]
  def change
    create_table :multipled_weights do |t|
      t.string :criterion_name
      t.float :value
      t.references :alternative_result, null: false, foreign_key: true

      t.timestamps
    end
  end
end
