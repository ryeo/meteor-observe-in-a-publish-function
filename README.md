Meteor - Observe in a Publish Function
======================================

##http://www.eventedmind.com/posts/meteor-observe-in-a-publish-function

###Screencast Topics
* Server side debug calling observe in a publish function
* What happens under the covers when a publish function returns a cursor?

###Node Inspector Instructions

1. Install Node Inspector

```
> npm install -g node-inspector
```

2. Start your Meteor project with Node debugging enabled
```
> NODE_OPTIONS='--debug' mrt
```

3. Start the node inspector in another terminal window
```
> node-inspector
```

4. Open Chrome and navigate to: http://localhost:8080/debug?port=5858

5. Debug just like you would in the browser!


###DDP Client Instructions

Watch the Subscriptions and DDP screencast for instructions on how to set up a simple DDP client.
