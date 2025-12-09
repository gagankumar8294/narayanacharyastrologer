export async function getSheetData() {
  const SHEET_URL =
    "https://opensheet.elk.sh/1vwuhTGyY1P6QtG1QD1-s42Jr02AoF9L88-mIOktl1hw/Sheet1";

  const res = await fetch(SHEET_URL, {
    cache: "no-store", // always fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sheet data");
  }

  return res.json();
}
