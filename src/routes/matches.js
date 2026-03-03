import { Router } from "express";
import { db } from "../db/db.js";
import { matches } from "../db/schema.js";
import {createMatchSchema, listMatchesQuerySchema} from "../validation/matches.js";
import {getMatchStatus} from "../utils/match-status.js";
import {desc} from "drizzle-orm";

export const matchRouter = Router();

matchRouter.get("/", async (req, res) => {

  const MAX_LIMIT = 100;

  const parsed = listMatchesQuerySchema.safeParse(req.body);
  if(!parsed.success){
   return res.status(400).json({error:"invalid query", details:JSON.stringify(parsed.error)})
  }

  const limit = Math.min(parsed.data.limit ?? 50 , MAX_LIMIT)
  try{
    const data = await db.select().from(matches).orderBy((desc(matches.createdAt))).limit(limit)
    res.status(200).json({data})
  }catch(err){
    res.status(500).json({err:"failed to fetch match list"})

  }
  res.status(200).json({message:"its matches route "})
});

matchRouter.post("/",async (req,res)=>{
  const parsed = createMatchSchema.safeParse(req.body)

  if(!parsed.success){
    return res.status(400).json({message:"Invalid payload", details:JSON.stringify(parsed.error)})
  }

  try{
    const { startTime, endTime, homeScore, awayScore, ...rest } = parsed.data;

    const [event] = await db.insert(matches).values({
      ...rest,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      homeScore: homeScore ?? 0,
      awayScore: awayScore ?? 0,
      status: getMatchStatus(startTime,endTime)
    }).returning();

    console.log(event.data);

    res.status(201).json({data:event})

  }catch(err){
    console.error("Failed to create match:", {
      message: err?.message,
      cause: err?.cause,
      stack: err?.stack,
      error: err,
    });
    res.status(500).json({error:"failed to create match", details: err?.message ?? "Unknown error"})
  }
})
