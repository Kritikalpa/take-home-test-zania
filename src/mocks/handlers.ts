import { http, HttpResponse } from "msw";
import data from "../utils/data.json";
import { Data } from "../types";

const setData = (data: Array<Data>) => {
  window.localStorage.setItem("listOfData", JSON.stringify(data));
};

setData(data);

export const handlers = [
  http.get("https://example.com/data", () => {
    const listOfData = window.localStorage.getItem("listOfData");
    return HttpResponse.json(JSON.parse(listOfData as string));
  }),

  http.post("https://example.com/save", async ({ request }) => {
    const updatedData = await request.json();

    setData(updatedData as Array<Data>);
    return HttpResponse.json({ status: 200, message: "Saved data" });
  }),
];
