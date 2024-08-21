Feature: Check products details on the products page and product item page

  Background:
    Given User is logged in with username "<username>" and password "<password>"

  Scenario Outline: Verify products title, description, and price on the products page
    When "<username>" navigates to the products page
    Then The product details on the products page should be correct

    Examples:
      | username                | password        |
      | standard_user           | secret_sauce    |
      | problem_user            | secret_sauce    |
      | performance_glitch_user | secret_sauce    |
      | visual_user             | secret_sauce    |
      | error_user              | secret_sauce    |


  Scenario Outline: Verify product title, description, and price on the product item page via product title
    When "<username>" navigates to the products page
    And "<username>" clicks on the product title to view the product item page
    Then The product details should be correct on the product item page
    When "<username>" clicks on the "back to products"
    Then the products page should be displayed

    Examples:
      | username                | password        |
      | standard_user           | secret_sauce    |
      | problem_user            | secret_sauce    |
      | performance_glitch_user | secret_sauce    |
      | visual_user             | secret_sauce    |
      | error_user              | secret_sauce    |


  Scenario Outline: Verify product title, description, and price on the product item page via product image
    When "<username>" navigates to the products page
    And "<username>" clicks on the product image to view the product item page
    Then The product details should be correct on the product item page
    When "<username>" clicks on the "back to products"
    Then the products page should be displayed
  
    Examples:
      | username                | password        |
      | standard_user           | secret_sauce    |
      | problem_user            | secret_sauce    |
      | performance_glitch_user | secret_sauce    |
      | visual_user             | secret_sauce    |
      | error_user              | secret_sauce    |

