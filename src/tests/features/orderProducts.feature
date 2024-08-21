Feature: Order products

  Background:
    Given User is logged in with username "<username>" and password "<password>"

  Scenario Outline: Verify error message on informations checkout page for missing firstname
    When "<username>" navigates to the products page
    And "<username>" adds 2 products to the cart
    And "<username>" navigates to the cart
    And "<username>" navigates to checkout
    And "<username>" enters his lastname as "<lastname>"
    And "<username>" enters his zipcode as "<zipcode>"
    And "<username>" does not enter his firstname
    And clicks on the continue button
    Then The form should display an error message for missing firstname

    Examples:
      | username                | password        | lastname | zipcode |
      | standard_user           | secret_sauce    | Doe      | 12345   |
      | problem_user            | secret_sauce    | Smith    | 67890   |
      | performance_glitch_user | secret_sauce    | Johnson  | 54321   |
      | visual_user             | secret_sauce    | Brown    | 98765   |
      | error_user              | secret_sauce    | White    | 11223   |


  Scenario Outline: Verify error message on informations checkout page for missing lastname
    When "<username>" navigates to the products page
    And "<username>" adds 2 products to the cart
    And "<username>" navigates to the cart
    And "<username>" navigates to checkout
    And "<username>" enters his firstname as "<firstname>"
    And "<username>" enters his zipcode as "<zipcode>"
    And "<username>" does not enter his lastname
    And clicks on the continue button
    Then The form should display an error message for missing lastname
   

    Examples:
      | username                | password        | firstname | zipcode |
      | standard_user           | secret_sauce    | John      | 12345   |
      | problem_user            | secret_sauce    | Jane      | 67890   |
      | performance_glitch_user | secret_sauce    | Alice     | 54321   |
      | visual_user             | secret_sauce    | Bob       | 98765   |
      | error_user              | secret_sauce    | Charlie   | 11223   |


  Scenario Outline: Verify error message on informations checkout page for missing zipcode
    When "<username>" navigates to the products page
    And "<username>" adds 2 products to the cart
    And "<username>" navigates to the cart
    And "<username>" navigates to checkout
    And "<username>" enters his firstname as "<firstname>"
    And "<username>" enters his lastname as "<lastname>"
    And "<username>" does not enter his zipcode
    And clicks on the continue button
    Then The form should display an error message for missing zipcode
    And The form should not display an error message for missing firstname
    And The form should not display an error message for missing lastname


    Examples:
      | username                | password        | firstname | lastname |
      | standard_user           | secret_sauce    | John      | Doe      |
      | problem_user            | secret_sauce    | Jane      | Smith    |
      | performance_glitch_user | secret_sauce    | Alice     | Johnson  |
      | visual_user             | secret_sauce    | Bob       | Brown    |
      | error_user              | secret_sauce    | Charlie   | White    |


  Scenario Outline: Verify if total price is correct 
    When "<username>" navigates to the products page
    And "<username>" adds 2 products to the cart
    And "<username>" navigates to the cart
    And "<username>" navigates to checkout
    And "<username>" enters his firstname as "<firstname>"
    And "<username>" enters his lastname as "<lastname>"
    And "<username>" enters his zipcode as "<zipcode>"
    And clicks on the continue button
    Then The products and the total price should be correct


    Examples:
      | username                | password        | firstname | lastname |
      | standard_user           | secret_sauce    | John      | Doe      |
      | problem_user            | secret_sauce    | Jane      | Smith    |
      | performance_glitch_user | secret_sauce    | Alice     | Johnson  |
      | visual_user             | secret_sauce    | Bob       | Brown    |
      | error_user              | secret_sauce    | Charlie   | White    |


  Scenario Outline: Verify if the order is complete
    When "<username>" navigates to the products page
    And "<username>" adds 2 products to the cart
    And "<username>" navigates to the cart
    And "<username>" navigates to checkout
    And "<username>" enters his firstname as "<firstname>"
    And "<username>" enters his lastname as "<lastname>"
    And "<username>" enters his zipcode as "<zipcode>"
    And clicks on the continue button
    And clicks on the finish button 
    Then The page should display a success message


    Examples:
      | username                | password        | firstname | lastname |
      | standard_user           | secret_sauce    | John      | Doe      |
      | problem_user            | secret_sauce    | Jane      | Smith    |
      | performance_glitch_user | secret_sauce    | Alice     | Johnson  |
      | visual_user             | secret_sauce    | Bob       | Brown    |
      | error_user              | secret_sauce    | Charlie   | White    |

