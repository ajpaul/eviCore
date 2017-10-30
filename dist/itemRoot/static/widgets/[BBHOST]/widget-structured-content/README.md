# Structured Content
Widget for rendering structured content

#Information
| name                        | version       | bundle     |
| ----------------------------|:-------------:| ----------:|
| structured-content-widget   | 1.0.8         | universal  |

## Brief Description
Structured Content is one of the new features of CXP 5.6, allowing you to define custom content data structure
that are not only reusable, but also linkable. The purpose of the widget is to be able to render structured content items
which are defined by json schema descriptors.

## How to use
This document assumes that you already know how to define content items, create content types and create the content. You can read more in
[this guide](https://my.backbase.com/resources/how-to-guides/bring-some-structure-to-your-content).

### Example Usage

1. In the portal manager go to **Shared content** and create your content item
1. Add the structured content widget to the page, edit the preferences and select the template for your content item
1. Go to **Content -> Shared** and drag the content item on the structured content widget
1. If a page is referenced in the **Dynamic Page** preference, a link will be added to that page. In addition the content reference will be added as a dynamic URL part.
1. To dynamically read and load the content from the dynamic URL part, place a new instance of the widget on the referenced page (optionally attaching "default" content). The dynamic URL will be read and the content fetched and inserted.

