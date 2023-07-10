import dbConnect from "@/db/connect";
import Place from "@/db/Models/Places";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return req.status(400).json({ status: "Not found" });
    }
    return res.status(200).json(place);
  }

  if (req.method === "PUT") {
    await Place.findByIdAndUpdate(id, { $set: req.body });

    return res.status(200).json({ status: "Succesfully updated" });
  }

  if (req.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    return res.status(200).json({ status: "Place got deleted" });
  }
}
