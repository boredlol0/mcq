import axios from "axios";

export default async function handler(req, res) {
  const query = req.query;
  const { code } = query;
  if (!code) {
    res.status(400).json({ error: "code is required" });
  }
  const baseUrls = {
    "0625": "https://papers.xtremepape.rs/CAIE/IGCSE/Physics%20(0625)/",
    "0620": "https://papers.gceguide.com/Cambridge%20IGCSE/Chemistry%20(0620)/",
    "0610": "https://papers.gceguide.com/Cambridge%20IGCSE/Biology%20(0610)/",
  };
  const series = {
    F: "m",
    M: "s",
    O: "w",
  };
  let url;
  try {
    const splitCode = code.split("/");
    url =
      baseUrls[splitCode[0]] +
      //   `20${splitCode[1]}/` +
      `${splitCode[0]}_${series[splitCode[2]]}${splitCode[1]}_qp_${
        splitCode[4]
      }.pdf`;
    const response = await axios.get(url, { responseType: "arraybuffer" });
    if (response.status !== 200) {
      res.status(400).json({ error: "code is not valid" });
    }
    const pdfUint8Array = new Uint8Array(response.data);
    res.status(200).send(pdfUint8Array);
  } catch (e) {
    res.status(400).json({ error: "code is not valid" });
  }
}
