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

  const response = await fetch(
    `/api/ip-details?${parameterName}=${encodeURIComponent(searchCriteria)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch IP details");
  }

  const ipDetails: IPObject = await response.json();

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
