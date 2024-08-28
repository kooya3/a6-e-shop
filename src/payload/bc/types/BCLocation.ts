export interface BCLocation {
  "@odata.context": string;
  value: Value[];
}

export interface Value {
  "@odata.etag": string;
  Code: string;
  Name: string;
}
