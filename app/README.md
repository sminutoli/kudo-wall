# Development

Run `yarn dev` to run the kudo-wall.
You should have a MongoDB service running

To debugg, with Chorme Dev Tools, start the server, open [chrome://inspect/#devices](chrome://inspect/#devices) *and click *Open dedicated DevTools for Node*

### Environment
To run, you need to configure tese environment variables:
* `IP` & `PORT`: The port to run the app. Defaults to `localhost` and `3000`.
* `MONGO_URI`: The URI for the mongoDB. Defaults to `mongodb://localhost/kudos`.
* `TOKEN`: The token to accept the REST request. Defaults to `Tis a token`.
* `URL`: The URL callback to post to Slack. Defaults to `localhost:3000`.
