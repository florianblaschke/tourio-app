import dbConnect from "@/db/connect";
import Place from "@/db/Models/Places";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const place = await Place.find();
    if (!place) {
      return res.status(400).json({ status: "Not found" });
    }
    return res.status(200).json(place);
  }

  if (req.method === "POST") {
    try {
      const newPlace = req.body;
      await Place.create(newPlace);
      return res.status(200).json({ status: "New place found" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
