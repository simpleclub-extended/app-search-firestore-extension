import { firestore, logger, Change } from "firebase-functions/v1";
import { toAppSearch } from "./toAppSearch";

import { getNewAppSearchClient } from "./utils";

const appSearchClient = getNewAppSearchClient();

// We separate and curry this function from shipToElastic so we can test with less mocking
export const handler = (client: any) => {
  return async (change: Change<firestore.DocumentSnapshot>) => {
    logger.info(`Received request to ship to ship to Elastic`, {
      change,
    });
    if (change.before.exists === false) {
      logger.info(`Creating document`, { id: change.after.id });
      try {
        client.indexDocuments(process.env.APP_SEARCH_ENGINE_NAME, [
          {
            id: change.after.id,
            ...toAppSearch(change.after.data()),
          },
        ]);
      } catch (e) {
        logger.error(`Error while creating document`, {
          id: change.after.id,
        });
        throw e;
      }
    } else if (change.after.exists === false) {
      logger.info(`Deleting document`, { id: change.before.id });
      try {
        client.destroyDocuments(process.env.APP_SEARCH_ENGINE_NAME, [
          change.before.id,
        ]);
      } catch (e) {
        logger.error(`Error while deleting document`, {
          id: change.before.id,
        });
        throw e;
      }
    } else {
      logger.info(`Updating document`, { id: change.after.id });
      try {
        client.indexDocuments(process.env.APP_SEARCH_ENGINE_NAME, [
          {
            id: change.after.id,
            ...toAppSearch(change.after.data()),
          },
        ]);
      } catch (e) {
        logger.error(`Error while updating document`, {
          id: change.after.id,
        });
        throw e;
      }
    }
    return change.after;
  };
};

// Note that in extensions, functions get declared slightly differently then typical extensions:
// https://firebase.google.com/docs/extensions/publishers/functions#firestore
// See also https://firebase.google.com/docs/extensions/publishers/functions#special-considerations for the path to be defined here.
export const shipToElastic = firestore
  .document("{collection_id}/{doc_id}")
  .onWrite(handler(appSearchClient));
