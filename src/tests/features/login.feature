Feature: Login to Swag Labs

  Background:
    Given User navigate to the Saucedemo login page

  Scenario Outline: Login with different credentials
    When User enter the username "<username>"
    And User enter the password "<password>"
    And User click the login button
    Then User should <result> 

    Examples:
      | username                | password        | result                            |
      | standard_user           | secret_sauce    | be redirected to the products page|
      | locked_out_user         | secret_sauce    | see an error message "Epic sadface: Sorry, this user has been locked out."|
      | problem_user            | secret_sauce    | be redirected to the products page|
      | performance_glitch_user | secret_sauce    | be redirected to the products page|
      | error_user              | secret_sauce    | be redirected to the products page|
      | visual_user             | secret_sauce    | be redirected to the products page|
      | standard_user           | test123         | see an error message "Epic sadface: Username and password do not match any user in this service"|
      |                         | secret_sauce    | see an error message "Epic sadface: Username is required"|
      | standard_user           |                 | see an error message "Epic sadface: Password is required"|

