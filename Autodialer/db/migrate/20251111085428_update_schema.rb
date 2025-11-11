class UpdateSchema < ActiveRecord::Migration[8.1]
  def up
    rename_column :calls, :log, :call_status

    # Step 1: remove default
    change_column_default :calls, :status, nil

    change_column :calls, :status, :integer, using: "CASE WHEN status THEN 1 ELSE 0 END", null: false

    change_column_default :calls, :status, 0
  end

  def down
    rename_column :calls, :call_status, :log
    change_column_default :calls, :status, nil
    change_column :calls, :status, :boolean, using: "status::boolean", default: false, null: false
  end
end
