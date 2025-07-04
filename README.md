# Elastic App Search extension for Firestore

This extension syncs data from Google's [Cloud Firestore](https://firebase.google.com/products/firestore) to [Elastic App Search](https://www.elastic.co/app-search/).

Out-of-the-box, Cloud Firestore provides no mechanism for full-text search on data. Syncing your Cloud Firestore data to Elastic App Search not only gives you a mechanism for full-text search on your data, it also lets you enjoy App Search's powerful relevance tuning features and search analytics data.

**NOTE:** This extension is no longer maintained.  We encourage the community use the open and supported [connectors framework](https://www.elastic.co/guide/en/enterprise-search/current/connectors.html#connectors-overview-framework) to build an Elasticsearch connector for integration with Google Cloud Firestore.

## Install

### From the web

Visit the following link: https://console.firebase.google.com/project/_/extensions/install?ref=elastic/firestore-elastic-app-search@0.4.1

### From source

After pulling this project source locally, follow these steps:

```shell
npm install -g firebase-tools
npm install
firebase login
firebase ext:install . --project=<ID of your project>
```

## Contributing

Plan to pull this code and run it locally? See [CONTRIBUTING.md](CONTRIBUTING.md).
