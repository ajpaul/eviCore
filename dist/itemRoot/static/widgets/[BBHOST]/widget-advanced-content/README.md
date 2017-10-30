# Advanced Content
The Advanced Content Widget allows business users to create content in CXP Manager. The widget leverages the ICE (In Context Editing) capabilities provided by CXP. The feature of having a full-screen background image has been implemented in this widget as well. The content templates are build fully supporting Bootstrap responsive classes.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-advanced-content |  1.0.1 |  Universal |

## Preferences

- **bgImageContainer**, Background position: By ticking this preference the image (which need to be dropped in the template) will appear on it's parent element on the page.
- **templateUrl**, Template: Providing a list of templates which are described in more detail below.
- **title**, Title: The title of the widget.
- **height**, Height: This preference gives the widget a fixed height. The number need to be provided in pixels.

## Templates
Widget comes with predefained set of templates for content templates with and without image backgrounds.


- **jumbotron.html**: The Jumbotron is an implementation based on the Jumbotron component provided by Bootstrap.
- **thumbnail.html**: The thumbnail with caption extends the "media" classes provided by Bootstrap.
- **callout.html**: The callout provides a header plus a paragraph to for example introduce a new feature or part of the page.
- **callout-with-image.html**: The callout with image is similar to the Callout but comes with the possibility to provide a background image.
- **background-image.html**: Background image with ability to control its size.
- **promo-banner.html**: Promo banner template. 

