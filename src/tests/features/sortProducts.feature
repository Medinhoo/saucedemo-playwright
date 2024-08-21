Feature: Sort the products on the products page with different valid users

  Background:
    Given User is logged in with username "<username>" and password "<password>"

  Scenario Outline: "<username>" sorts products by price (high to low)
    When User sorts products by "Price (high to low)"
    Then Products should be sorted by price from high to low


  Scenario Outline: "<username>" sorts products by price (low to high)
    When "<username>" sorts products by "Price (low to high)"
    Then Products should be sorted by price from low to high


  Scenario Outline: "<username>" sorts products by name (Z to A)
    When "<username>" sorts products by "Name (Z to A)"
    Then Products should be sorted by name from Z to A


  Scenario Outline: "<username>" sorts products by name (A to Z)
    When "<username>" sorts products by "Name (A to Z)"
    Then Products should be sorted by name from A to Z


    Examples:
      | username                | password        |
      | standard_user           | secret_sauce    |
      | problem_user            | secret_sauce    |
      | performance_glitch_user | secret_sauce    |
      | visual_user             | secret_sauce    |
      | error_user              | secret_sauce    |
