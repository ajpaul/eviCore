# Estatement List
# Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-estatement |  2.4.0 |  launchpad |

# Preferences

- **estatementEnrollmentEndpoint**: Enrollment Data Source
- **estatementListEndpoint**: List Data Source
- **detailsEndpoint**: User Details Data Source


- estatementListEndpoint: The HTTP endpoint to use for the
[estatement API](http://stash.backbase.com:7990/projects/lpm/repos/module-estatements/browse/) to
fetch the estatement list (per user, not per account).
- estatementEnrollmentEndpoint: The HTTP endpoint to use for the
[document API](http://stash.backbase.com:7990/projects/lpm/repos/module-estatements/browse/) to
check/set the enrollment state for a user.

## Dependencies

- base ^2.5.0
- core ^2.9.6
- ui ^2.4.11
- module-estatements ^2.0.4
- module-users ^2.5.1

## Run

- Install and run [api](http://stash.backbase.com:7990/projects/lp/repos/api/browse/)
 - Starts API on http://localhost:3030/
- Install and run widget
 - `npm i &amp;&amp; npm start`
 - Starts and runs on http://localhost:3000/ proxying request for /services to API.

## API Endpoints

- Document List
- Get Enrollment State
- Set Enrollment State

## Components Used

- select [ui](http://stash.backbase.com:7990/projects/lpm/repos/ui/browse/)
- lp-list [ui](http://stash.backbase.com:7990/projects/lpm/repos/ui/browse/)
- lp-notify? (ui)
- lp-accounts-select [module-accounts](http://stash.backbase.com:7990/projects/lpm/repos/module-accounts/browse/)

## References

- UX Design
- API demo service
- [E-Statements](http://stash.backbase.com:7990/projects/lpm/repos/module-estatements/browse/)

## BDD
As a customer, I want to access all my previous e-Statements so that I can use them later if needed for tax purposes

Feature: View previous e-Statements
  In order to use my previous e-Statements for tax purposes
  As a customer
  I want to access all my previous e-Statements

  Scenario: All e-Statements have been read
    Given I have enrolled for e-Statements
    When I navigate to the e-Statements widget
    Then I will see a list of e-Statements
    And it will be ordered by date
    And each e-Statement will contain a description
    And a function to view the e-Statement in HTML format
    And a function to download the e-Statement in PDF format

  Scenario: New e-Statement is available
    Given I have enrolled for e-Statements
    And I have received a new e-Statement
    When I navigate to the e-Statements widget
    Then I will see a list of e-Statements
    And it will be ordered by date
    And each e-Statement will contain a description
    And a function to view the e-Statement in HTML format
    And a function to download the e-Statement in PDF format
    And the new e-Statement will contain a flag indicating that I haven't read it

  Scenario: e-Statement service is offline
    Given the customer has enrolled for e-Statements
    When e-Statement service cannot be reached
    Then a message informing the customer the service is offline will be displayed

  Scenario: Customer has not enrolled for e-Statements
    Given I did not subscribe for e-Statements
    When I navigate to the e-Statements widget
    Then I will see a message informing me that I didn't subscribe for e-Statements
    And a link for the e-Statements enrollment function will be displayed

