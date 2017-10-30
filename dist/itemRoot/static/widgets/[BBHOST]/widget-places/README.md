# Places
Provides the ability to display a set of places on a map supplied from a specified data source. Inside the widget you will find a Google places autocomplete that allows the user to move on the map by just specifying an address. Additionally, it also able to display detailed information about a given place, such as type (for instance, ATM or branch), opening hours, and services available.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-places |  2.4.8 |  Universal |

## Dependencies

- base 2.x
- core 2.x
- ui ^2.8.0
- module-places 3.x

## Dev Dependencies

- theme ^2.0.0
- config 2.x
- angular-mocks ~1.2.28

## Preferences

- **currentPosition**: Initialize on user's position
- **directionApiUrl**: Api Url for directions
- **filterDataSrc**: Filter drop-down Data Source
- **latitude**: Latitude
- **geolocationTimeout**: Latitude
- **longitude**: Longitude
- **panControl**: Show pan control on map
- **placesDataSrc**: Places Data Source
- **placesFilterRadius**: Radius in KM used from the current location used to filter out places
- **placesPageSize**: Amount of Places returned for each page
- **showPOI**: Show POI on map
- **fillViewportHeight**: Resize Content Tabs to fill the height of the viewport
- **staticMapApiUrl**: Api Url for static map
- **staticMapThumbSize**: Size of map thumbnail
- **staticMapZoom**: Default zoom value for static map
- **zoom**: Zoom

## Events
The following is a list of pub/sub event which the widget subscribes to:


- **launchpad-retail.places.loadMore** - When this message is received, additional places are loaded

The following is a list of pub/sub event which the widget publishes to:

*This widget does not publish any events.*

