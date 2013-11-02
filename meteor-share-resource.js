Resources = new Meteor.Collection("resources");

if (Meteor.isClient) {
  Template.resource_container.resources = function () {
    return Resources.find({});
  };

  Template.resource_form.events({
    'click .resource-submit': function (evt, tmpl) { 
      var resource_url = document.getElementById('resource_url');
      var resource_description = document.getElementById('resource_description');
      if (resource_url.value != '') {
        Resources.insert({
          url: resource_url.value,
          description: resource_description.value,
          time: Date.now(),
        });

        document.getElementById('resource_url').value = '';
        document.getElementById('resource_description').value = '';
        resource_url.value = '';
        resource_description.value = '';
      }

    }
  });
}

if (Meteor.isServer) {
  // Bootstrap data
  Meteor.startup(function () {
    if (Resources.find().count() === 0) {
      var urls = [ "http://example.com/",
                   "http://example-1.com",
                   "http://example-2.com"];
      for (var i = 0; i < urls.length; i++)
        Resources.insert({url: urls[i], time: Date.now()});
    }
  });
}

