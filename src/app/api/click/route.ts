import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getDb } from "@/lib/mongodb";

type ClickDoc = { _id: string; clickCount: number; updatedAt: Date };

const linkIds = new Set(links.map((link) => link.id));

// 클릭 수는 계속 바뀌므로 응답을 캐시하지 않습니다.
export const dynamic = "force-dynamic";

// 모든 링크의 현재 클릭 수를 한 번에 돌려줍니다. 예: { "github": 42, "blog": 3 }
export async function GET() {
  try {
    const db = await getDb();
    const docs = await db
      .collection<ClickDoc>("clicks")
      .find({ _id: { $in: Array.from(linkIds) } })
      .toArray();
    const counts = Object.fromEntries(docs.map((doc) => [doc._id, doc.clickCount]));
    return NextResponse.json(counts);
  } catch (error) {
    console.error("클릭 수 조회 실패", error);
    return NextResponse.json({ error: "조회에 실패했습니다" }, { status: 500 });
  }
}

// 링크 카드 클릭 시 해당 링크의 clickCount를 1 올립니다.
// sendBeacon은 text/plain으로 보내므로 본문을 직접 JSON으로 파싱합니다.
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = JSON.parse(await request.text()));
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다" }, { status: 400 });
  }

  // 등록된 링크만 집계해 아무 값이나 DB에 쌓이지 않게 합니다.
  if (typeof id !== "string" || !linkIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다" }, { status: 400 });
  }

  try {
    const db = await getDb();
    await db
      .collection<ClickDoc>("clicks")
      .updateOne(
        { _id: id },
        { $inc: { clickCount: 1 }, $set: { updatedAt: new Date() } },
        { upsert: true },
      );
  } catch (error) {
    console.error("클릭 수 저장 실패", error);
    return NextResponse.json({ error: "저장에 실패했습니다" }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
