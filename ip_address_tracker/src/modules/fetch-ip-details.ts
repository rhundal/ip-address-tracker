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
};

export const fetchIPDetails = async (
  searchCriteria: string = "www.gameloft.com",
): Promise<IPObject> => {
  if (searchCriteria === "") {
    searchCriteria = "microsoft.com";
  }

  const parameterName =
    searchCriteria?.includes(".") &&
    !/^\d{1,3}(\.\d{1,3}){3}$/.test(searchCriteria)
      ? "domain"
      : "ipAddress";

  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.IPIFY_API_KEY}&${parameterName}=${encodeURIComponent(searchCriteria ?? "www.gameloft.com")}`;

  console.log("Request URL:", url);
  const ipDetailsResponse = await fetch(url);

  if (!ipDetailsResponse.ok) {
    throw new Error("Failed to fetch user details");
  }

  const ipDetails: IPObject = await ipDetailsResponse.json();

  console.log(ipDetails);

  return ipDetails;
};

/*
steps - 

1. get handles to the ui
2. get values from user
2b. (for later) validate fields
3. enable search button
3. on btn click call the api function with values passed by user
4. return the object 
5. update the ui with api response

*/
