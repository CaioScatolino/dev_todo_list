import { NewDev } from "../db/schema";
import { db } from "../db/connection";
import { devs } from "../db/schema";

export const createDev = async (dev: NewDev) => {
    await db.insert(devs).values(dev);
};

export const getAllDevs = async () => {
    return await db.select().from(devs);
};