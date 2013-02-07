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

  isVisibleCursor = DocumentCollection.find({is_visible: true});

  observerHandle = isVisibleCursor.observe({
    added: function (doc, idx) {
      count++;
      subscription.set("documents_count", docId, { count: count });
      subscription.flush();
    },

    removed: function (doc, idx) {
      count--;
      subscription.set("documents_count", docId, { count: count });
      subscription.flush();
    }
  });

  subscription.onStop(function () {
    observerHandle.stop();
  });

  subscription.complete();
  subscription.flush();
});

/* Server side helper functions */

function insertDocument (doc) {
  Fiber(function () {
    DocumentCollection.insert(doc);
  }).run();
}

function removeOne () {
  Fiber(function () {
    var id = DocumentCollection.findOne({is_visible: true})._id;
    DocumentCollection.remove({_id: id});
  }).run();
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
