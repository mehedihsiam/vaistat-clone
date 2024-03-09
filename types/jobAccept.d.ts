export type TOnAcceptAll = (driver_id: string, pharmacy_id: string) => void;
export type TOnAccept = (
  driver_id: string,
  job_id: string,
  pharmacy_id?: string
) => void;
