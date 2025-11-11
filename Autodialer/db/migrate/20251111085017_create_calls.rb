class CreateCalls < ActiveRecord::Migration[8.1]
  def change
    create_table :calls do |t|
      t.string :phone_number, null: false
      t.string :log, default: "", null: false
      t.boolean :status, default: false, null: false

      t.timestamps
    end
  end
end
