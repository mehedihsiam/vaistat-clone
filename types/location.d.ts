export type TLocationPartial = {
  latitude: number;
  longitude: number;
};

export type TLocation = TLocationPartial & {
  heading: number | null;
};
