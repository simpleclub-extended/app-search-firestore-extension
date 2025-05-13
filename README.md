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

   1. "Install" extension

      ```shell
      firebase ext:install <path to your local extension clone> --project=<project id>
      ```

      This will ask you some configuration questions. For the secreat value (api key), it will generate a new secret in secret manager.

   2. Decide on a name for your instance

      It should be `<name of your use case>-firestore-elastic-app-search`

   3. Rename the generated instance

      In the `firebase.json`, change the name that references the local path to the extension like so:

      ```json
      {
        "extensions": {
          "<your instance name>": "../../../app-search-firestore-extension" // This should be your local path
        }
      }
      ```

   4. Rename the environment file

      In the `extensions` subfolder, rename the generated file with the name of your instance, e.g. `<your instance name>.env`.

7. Deploy the extension

   Before deploying it may make sense to uncomment all other extensions from the `firebase.json`, although this is not required. (Yes, comments work!)

   ```shell
   firebase deploy --only extensions --project <project-id>
   ```

   If the CLI asks you do DELETE not-listed functions, say NO!

   This does change the `.firebaserc` in the backend. This change is fine and should be commited!
