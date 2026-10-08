import { MongoClient } from "mongodb";

// 개발 중 핫리로드마다 연결이 새로 생기지 않도록 전역에 한 번만 만들어 재사용합니다.
const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

// 환경 변수는 실제로 DB를 쓸 때 확인합니다. (빌드 시점에 없어도 빌드가 깨지지 않도록)
function getClientPromise() {
  if (!globalForMongo.mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI 환경 변수가 없습니다. .env.local을 확인하세요.");
    }
    globalForMongo.mongoClientPromise = new MongoClient(uri)
      .connect()
      .catch((error) => {
        // 연결에 실패하면 다음 요청에서 다시 시도하도록 비웁니다.
        globalForMongo.mongoClientPromise = undefined;
        throw error;
      });
  }
  return globalForMongo.mongoClientPromise;
}

export async function getDb() {
  const client = await getClientPromise();
  return client.db();
}
