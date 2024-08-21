Feature: Login and Logout from Swag Labs

  Background:
    Given User navigates to the Saucedemo login page

  Scenario Outline: Login with different credentials and then logout
    When User enters the username "<username>"
    And User enters the password "<password>"
    And User clicks the login button
    Then User should <loginResult>
    And User clicks the menu button
    And User clicks the logout button
    Then User should be redirected to the login page

    Examples:
      | username                | password        | loginResult                                                                                      |
      | standard_user           | secret_sauce    | be redirected to the products page                                                               |
      | locked_out_user         | secret_sauce    | see an error message "Epic sadface: Sorry, this user has been locked out."                       |
      | problem_user            | secret_sauce    | be redirected to the products page                                                               |
      | performance_glitch_user | secret_sauce    | be redirected to the products page                                                               |
      | error_user              | secret_sauce    | be redirected to the products page                                                               |
      | visual_user             | secret_sauce    | be redirected to the products page                                                               |
      | standard_user           | test123         | see an error message "Epic sadface: Username and password do not match any user in this service" |
      |                         | secret_sauce    | see an error message "Epic sadface: Username is required"                                        |
      | standard_user           |                 | see an error message "Epic sadface: Password is required"                                        |
