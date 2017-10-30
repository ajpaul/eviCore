# Portfolio Performance widget
Provides a bar chart with performance over time (and cumulative line chart), also switches to valuation mode. The selected timeframe is affected by portfolio-minimap widget.

## Information
|  name |  version |  bundle |
|--|--|--|
|  portfolio-performance |  2.3.0 |  wealth |

## Dependencies

- base 2.x
- core 2.x
- ui 2.x
- module-wealth 2.x

## Events
|  name |   |  data type |  data description |
|--|--|--|--|
|  launchpad-retail.portfolioSelected |  subscribe |  {Object} |  Selected portfolio |
|  portfolio-rangeSelected |  subscribe |  [{Date}, {Date}] |  Selected timeframe (after a timeframe is selected) |
|  portfolio-rangeSelected-live |  subscribe |  [{Date}, {Date}] |  Selected timeframe (during selection, each mousemove) |
|  portfolio-frequency |  subscribe |  {String} |  'monthly' or 'yearly' |

## Preferences

- **dataSrc**: Data Source

|  name |  label |  description |  default value |
|--|--|--|--|
|  dataSrc |  Data Source |  API endpoint |  //private-acee1-indamix.apiary-mock.com/bb/wealth/portfolio/{id} |

## Directives
|  name |  description |
|--|--|
|  lp-wealth-performance |  Performance chart |

