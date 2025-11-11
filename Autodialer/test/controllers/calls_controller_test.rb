require "test_helper"

class CallsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get calls_create_url
    assert_response :success
  end

  test "should get index" do
    get calls_index_url
    assert_response :success
  end
end
