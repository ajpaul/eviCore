# Portfolio Assets Allocation widget
 Provides an asset allocation (Equities, Other Investments, Bonds, Cash) chart over time. It allows a specific column to be selected. The selected timeframe is affected by portfolio-minimap widget.

## Information
|  name |  version |  bundle |
|--|--|--|
|  portfolio-assets |  2.4.0 |  wealth |

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
|  portfolio-itemSelected |  subscribe |  {Date} |  Selected item (month) |
|  portfolio-itemSelected |  publish |  {Date} |  Selected item (month) |

## Preferences

- **dataSrc**: Data Source

|  name |  label |  description |  default value |
|--|--|--|--|
|  dataSrc |  Data Source |  API endpoint |  //private-acee1-indamix.apiary-mock.com/bb/wealth/portfolio/{id} |

## Directives
|  name |  description |
|--|--|
|  lp-wealth-assets |  Assets Allocation (Stacked Area) chart |

