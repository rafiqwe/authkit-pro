import { write } from "../../../utils/write.js";

export const mongoDbConfig = () => {
  const fileContent = `
import { MongoClient, ServerApiVersion } from "mongodb"

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL")
}

const uri = process.env.DATABASE_URL

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

    `;

  write(process.cwd(), "lib/mongodb.ts", fileContent);
};
