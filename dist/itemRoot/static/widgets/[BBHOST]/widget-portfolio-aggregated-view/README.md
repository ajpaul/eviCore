# Portfolio Aggregated View
Provides a tabbed view consisting of 4 treemaps (Assets Allocation, Geographical Allocation, Combined Assets and Geographical, Equity Sectors) and 1 barchart (Bonds Details)

## Information
|  name |  version |  bundle |
|--|--|--|
|  portfolio-aggregated-view |  2.4.1 |  wealth |

## Dependencies

- base 2.x
- core 2.x
- ui 2.x
- module-wealth 2.x

## Events
|  name |   |  data type |  data description |
|--|--|--|--|
|  launchpad-retail.portfolioSelected |  subscribe |  {Object} |  Selected portfolio |

## Preferences

- **dataSrc**: Data Source

|  name |  label |  description |  default value |
|--|--|--|--|
|  dataSrc |  Data Source |  API endpoint |  //private-acee1-indamix.apiary-mock.com/bb/wealth/aggregated/{id} |

## Directives
|  name |  attrs.type |  description |
|--|--|--|
|  lp-wealth-aggregated-view |  treemap |  Treemap chart |
|  lp-wealth-aggregated-view |  barchart |  Bar chart |

