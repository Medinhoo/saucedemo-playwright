Feature: Add and remove product(s) from the cart for different valid users

  Background:
    Given User is logged in with username "<username>" and password "<password>"

  Scenario Outline: Add and remove a single product from the cart via the product page for a valid user
    When "<username>" navigates to the products page
    And "<username>" adds a product to the cart
    Then The product should be added to the cart
    When "<username>" removes the product from the cart via the product page
    Then The product should be removed from the cart

    Examples:
      | username                | password        |
      | standard_user           | secret_sauce    |
      | problem_user            | secret_sauce    |
      | performance_glitch_user | secret_sauce    |
      | visual_user             | secret_sauce    |
      | error_user              | secret_sauce    |

  Scenario Outline: Add and remove 6 products from the cart via the product page for a valid user
    When "<username>" navigates to the products page
    And "<username>" adds all available products to the cart
    Then All products should be added to the cart
    When "<username>" removes all products from the cart via the product page
    Then All products should be removed from the cart

    Examples:
      | username                | password        |
      | standard_user           | secret_sauce    |
      | problem_user            | secret_sauce    |
      | performance_glitch_user | secret_sauce    |
      | visual_user             | secret_sauce    |
      | error_user              | secret_sauce    |

  Scenario Outline: Add and remove a single product from the cart via the cart page and verify changes on both the cart page and the products page
    When "<username>" navigates to the products page
    And "<username>" adds a product to the cart
    Then The product should be added to the cart
    When "<username>" navigates to the cart page
    And "<username>" removes the product from the cart via the cart page
    Then The product should be removed from the cart on both the products page and the cart page

    Examples:
      | username                | password        |
      | standard_user           | secret_sauce    |
      | problem_user            | secret_sauce    |
      | performance_glitch_user | secret_sauce    |
      | visual_user             | secret_sauce    |
      | error_user              | secret_sauce    |

  Scenario Outline: Add and remove 6 products from the cart via the cart page and verify changes on both the cart page and the products page
    When "<username>" navigates to the products page
    And "<username>" adds all available products to the cart
    Then All products should be added to the cart
    When "<username>" navigates to the cart page
    And "<username>" removes all products from the cart via the cart page
    Then All products should be removed from the cart on both the products page and the cart page

    Examples:
      | username                | password        |
      | standard_user           | secret_sauce    |
      | problem_user            | secret_sauce    |
      | performance_glitch_user | secret_sauce    |
      | visual_user             | secret_sauce    |
      | error_user              | secret_sauce    |
