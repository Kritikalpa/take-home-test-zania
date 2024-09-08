export type Data = {
  type: string;
  title: string;
  position: number;
};

export type Overlay = {
  open: boolean;
  index: number;
};

export type SaveType = {
  active: boolean;
  time: number;
  data: Array<Data> | null;
};
