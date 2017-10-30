# Portfolio Minimap
Allows users to select a custom time period. The mini map displays a reduced visual of the historic balance of the aggregated portfolios. Other portfolio widgets on the page react on the changes to the time period.

## Information
|  name |  version |  bundle |
|--|--|--|
|  portfolio-minimap |  2.3.2 |  wealth |

## Dependencies

- base 2.x
- core 2.x
- ui 2.x
- module-wealth 2.x

## Events
|  name |   |  data type |  data description |
|--|--|--|--|
|  launchpad-retail.portfolioSelected |  subscribe |  {Object} |  Selected portfolio |
|  portfolio-frequency |  publish |  {String} |  'monthly' or 'yearly' |
|  portfolio-rangeSelected |  publish |  [{Date}, {Date}] |  Selected timeframe (after a timeframe is selected) |
|  portfolio-rangeSelected-live |  publish |  [{Date}, {Date}] |  Selected timeframe (during selection, each mousemove) |

## Preferences

- **dataSrc**: Data Source

|  name |  label |  description |  default value |
|--|--|--|--|
|  dataSrc |  Data Source |  API endpoint |  //private-acee1-indamix.apiary-mock.com/bb/wealth/portfolio/{id} |

## Directives
|  name |  description |
|--|--|
|  lp-wealth-minimap |  SVG minimap with a range selector |

