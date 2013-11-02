Resources = new Meteor.Collection("resources");

if (Meteor.isClient) {
  Template.resource_container.resources = function () {
    return Resources.find({});
  };
}

if (Meteor.isServer) {
  // Bootstrap data
  Meteor.startup(function () {
    if (Resources.find().count() === 0) {
      var urls = [ "http://example.com/",
                   "http://example-1.com",
                   "http://example-2.com"];
      for (var i = 0; i < urls.length; i++)
        Resources.insert({url: urls[i]});
    }
  });
}

