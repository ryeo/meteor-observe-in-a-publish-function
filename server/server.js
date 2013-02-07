/* DocumentCollection contains documents that look like this:
 * {
 *    is_visible: true,
 *    text: "Some text"
 * }
 */
DocumentCollection = new Meteor.Collection("documents");

/* Publish a custom collection */
Meteor.publish("documents_count", function () {
  var subscription = this,
      count = 0,
      docId = Meteor.uuid(),
      isVisibleCursor,
      observerHandle;

});

/* Server side helper functions */

function insertDocument (doc) {
  Fiber(function () {
    DocumentCollection.insert(doc);
  }).run();
}

function removeDocument (id) {
  Fiber(function () {
    DocumentCollection.remove({_id: id});
  });
}

function seedDb () {
  DocumentCollection.remove({});

  var isVisible = [true, true, false];

  for (var i = 0; i < 3; i++) {
    DocumentCollection.insert({
      text: "Document " + i,
      is_visible: isVisible[i]
    });
  }
}

/* End helper functions */

/* Let's start with a few documents */
Meteor.startup(seedDb);
