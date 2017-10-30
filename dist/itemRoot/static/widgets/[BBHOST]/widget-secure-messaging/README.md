# Secure Messaging
Displays conversation threads of secure messages between the bank and the customer, similar to an e-mail application. Provide functionalities such as List of Unread Messages, Draft Messages, Read Messages, Archived Messages and also actions to Reply, Archive, Delete a Message.

## Information
|  name |  version |  bundle |
|--|:--:|--:|
|  widget-secure-messaging |  3.0.3 |  Messaging |

## Functional Description
The message center offers a single point for creating, receiving, and
managing messages between customer and CSR portals.

### General

- A list of possible subjects is presented to the user when creating
a message. Recipients are assigned automatically based on a mapping
between the available message subjects and designated recipients.
This approach allows the flow of messages within the Customer
Service Representative (CSR) portal to be managed.
- A tag is also associated with each messages subject. These tags are
shown when messages are listed instead of the Subject line. The
backend service can configure how tags and subjects are associated.
- Messages are categorized in one of four categories:
**Inbox**, **Sent**,
**Archive**, and
**Draft**. **Inbox**,
**Sent**, and
**Archive** have their own tabs, which list all
the messages in that category. **Draft**
messages are shown under the **Inbox**
tab under a **Draft messages** heading.
Messages sent as a reply to previous messages are not explicitly
categorized as **Sent**, but are added to
the thread for that conversation. The whole conversation can be seen
by clicking a message in that conversation.
- The widget can be configured with or without the
**Archive** tab. The intention is that customer
pages will not offer access to the
**Archive** tab, but pages on a CSR portal
will, giving CSR personnel access to all messages. Messages are
categorized as **Archived** when deleted
by the user, at which point they are no longer available to
the user.
- The **Inbox** tab's label includes an
indication of the number of unread messages.
- The appearance of the controls in the message center depends on the
selected theme.
- ????On starting, or on refreshing, if there is a message categorized
as Draft it is presented to the user with the options of deleting it
or opening it for further editing. The dialog can also be closed in
which case the message remains in status Draft.????

### Listing Messages
When a tab (**Inbox**,
**Sent**, or
**Archive**) is selected the messages in that
category are listed. The following considerations apply:


- Messages are listed in time order.
- Each message is accompanied by a generated graphic that indicates
the sender.
- Each unread message has an extra visual indicator.
- Each message displays the time it was sent or received in the format
applicable for the locale, with special display cases indicating
'today' and 'yesterday'.
- Each message is accompanied by a tag that indicates the area to
which it pertains. This is derived from, and used instead of, the
Subject line.
- Each message in a list shows a compressed form of the initial lines
of the message body.

A message in a list can be selected, after which the option of showing
the whole conversation that that message was part of is made available.

### Selecting a Message
The options available when a message is selected depend on which tab is
currently active.

#### Inbox
The reply input field is automaticaly opened and the
**Send reply** button and
**Delete** button are shown.

In addition, if the message is part of a threaded conversation the
**Full conversation** button is shown.

#### Sent
The **Delete** button is shown.

In addition, if the message is part of a threaded conversation the
**Full conversation** button is shown.

#### Archive
The **Delete** button is shown.

In addition, if the message is part of a threaded conversation the
**Full conversation** button is shown.

### Replying to a Message
After selecting the **Reply** option the
reply input field, the **Send reply** button,
the **Cancel** button, and the
**Save as draft** button are displayed.


- **Send reply** sends the message. It is
an error to attempt to send an empty message. The message sent is
added to the conversation in the
**Sent** tab. The listing of messages in
**Inbox** is redisplayed.
- **Cancel** deletes the reply being made
and returns to the message listing.
- **Save as draft** makes a copy of the
message that can be completed later and returns to the
message listing. It is not possible to save a message as a draft if
it does not yet have a Subject.

### Viewing a Full Conversation
A conversation can be viewed from any tab. All messages sent and
received as part of the conversation are shown in time order.

When a full conversation is shown the only options available are to
**Delete** the whole conversation (it is not
possible to delete individual messages within the conversation), and to
go **Back** to the message listing.

### Creating a Message
There is a fixed set of subjects from which the user can select.
Subjects are mapped to recipients.

Messages in active preparation are shown in the Inbox . An unsent
message can be saved as a Draft, where it will remain until the user
takes further action, that is, cancels (deletes) it or selects the
**Full conversation** button to be able to continue
working on the message. ???And there may be other constraints as the
Drafts are held locally???

Only text messages can be created. There is no facility for adding
attachments.

At any time only one message can be open.

### Deleting Messages
An **Inbox**,
**Sent**, or **Achive**
message can be deleted when it is selected. If a conversation is
selected the **Delete** button applies to the
whole conversation.

### Archiving Messages
When a user deletes a message, it is categorized as Archived. These
messages are acessible from the **Archive**
tab of those widgets with the ??Show Archive?? preference set.

If a message is part of a conversation, then the whole conversation is
archived.

????Is there any mechanism for really deleting a message or will the
Archive just continually grow????

## Dependencies

- base 2.x
- core 2.x
- ui 2.x
- theme-default ~1.x
- module-users 2.x
- hammerjs ~2.0.4
- mock ~1.0.8

## Dev Dependencies

- config 2.x
- angular-mocks ~1.2.28

## Preferences

- **categoryList**: Categories
- **letterSrc**: Letter Data Source
- **recipientsSrc**: Recipients Data Source
- **threadSrc**: Message Thread Data Source

Get widget preference `widget.getPreference(string)`

## Events
*This widget does not subscribe/publish any events.*

