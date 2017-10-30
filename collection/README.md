# Create a custom collection

A collection must be provided as a zip-of-zips. The method to create a zip-of-zips is to copy each of your 
components to a directory and run Maven in that directory.

As an example, a project built from the archetype includes a sample widget and a sample module in the 
directory `statics/collection/components`. To create a zip-of-zips called `components.zip` run:

```
mvn clean install -Pcreate-zoz
```

This creates a zip-of-zips with items included in the order in which items they are imported to the 
portal (libraries, templates, containers, modules, widgets).