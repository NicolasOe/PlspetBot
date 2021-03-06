import { injectable } from "inversify";
import { ResponseData } from "./response-data";

@injectable()
export class DataFetcher<T = any> {
  constructor() { }
  /** Base URL to fetch data */
  apiUrl: URL;
  /** Data fetch method */
  fetchData: () => Promise<ResponseData<T>>;
}