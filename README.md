# Simpleclub Fork of AppSearch

This is a fork of the original Elastic Sync because that one is no longer maintained (https://github.com/elastic/app-search-firestore-extension).

This fork supports some improvements:

- Better Firestore Reference handling (storing the document path as a string, instead of a weird JavaScript object).
- Updated to Node 20

## Install & Deploy this fork

| ❗ **You should not use this for new installations! Only existing installations may be updated with the local fork!** |
| --------------------------------------------------------------------------------------------------------------------- |

Installing from local source (skipping the Extension Hub) is a bit tricky but possible.
The process is basically described [here](https://firebase.google.com/docs/extensions/publishers/get-started) but adjusted to fit our needs better.

1. You need to clone the repository first.

2. Install dependencies

   ```shell
   yarn install
   ```

3. Sign in to firebase!

   ```shell
   firebase login
   ```

4. Next, change into our backend repository.

5. Then, go to the following folder: `config/extensions-simpleclub`

6. Check if there is already a manifest / env file for the instance set up.

   If yes, proceed with step 7!

   Otherwise create it here:

   | ❗ Do not use `firebase ext:install` for this at it creates ressources in GCP that you may not want! |
   | ---------------------------------------------------------------------------------------------------- |

   1. Decide on a name for your instance

      It should be `<name of your use case>-firestore-elastic-app-search`

   2. Reference extension locally

      In the `firebase.json`, reference the local path to the extension like so:

      ```json
      {
        "extensions": {
          "<your instance name>": "../../../app-search-firestore-extension" // This should be your local path
        }
      }
      ```

   3. Create environment file

      In the `extensions` subfolder, create a file with the name of your instance, e.g. `<your instance name>.env`.

      Adjust the following example to your needs

      ```env
      APP_SEARCH_API_KEY=projects/<project number>/secrets/<name of the secret>/versions/latest
      APP_SEARCH_ENGINE_NAME=<search engine name>
      COLLECTION_PATH=<firestore collection name>
      ENTERPRISE_SEARCH_URL=https://simpleclub.ent.europe-west1.gcp.cloud.es.io
      INDEXED_FIELDS=email,name,someReference::custom_name
      LOCATION=europe-west1
      ```

7. Deploy the extension

   Before deploying it may make sense to uncomment all other extensions from the `firebase.json`, although this is not required. (Yes, comments work!)

   ```shell
   firebase deploy --only extensions --project <project-id>
   ```

   If the CLI asks you do DELETE not-listed functions, say NO!
