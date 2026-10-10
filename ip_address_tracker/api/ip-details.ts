// server-side middleman between your frontend and Ipify.
/*
Vercel will expose it at:
https://your-project.vercel.app/api/ip-details
*/

import type { VercelRequest, VercelResponse } from "@vercel/node";

type IPObject = {
  ip: string;
  location: LocationData;
  isp: string;
};

type LocationData = {
  country: string;
  region: string;
  city: string;
  postalCode?: string;
  timezone: string;
  lat: number;
  lng: number;
};

export default async function middleman(
  req: VercelRequest,
  res: VercelResponse,
) {
  const apiKey = process.env.IPIFY_API_KEY;
  const { ipAddress, domain } = req.query;

  const parameterName = typeof ipAddress === "string" ? "ipAddress" : "domain";
  const searchCriteria = String(ipAddress ?? domain).trim();

  if (!apiKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  const params = new URLSearchParams({
    apiKey,
    [parameterName]: searchCriteria,
  });

  try {
    const url = `https://geo.ipify.org/api/v2/country,city?${params.toString()}`;

    console.log("Request URL:", url);

    const ipDetailsResponse = await fetch(url);

    if (!ipDetailsResponse.ok) {
      throw new Error("Failed to fetch user details");
    }

    const ipDetails: IPObject = await ipDetailsResponse.json();

    if (!ipDetailsResponse.ok) {
      return res.status(502).json({ error: "IP lookup failed" });
    }

    return res.status(200).json(ipDetails);
  } catch {
    return res.status(502).json({ error: "IP service unavailable" });
  }
}
