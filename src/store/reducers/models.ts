export interface IRectangle {
  id: string,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  label: string,
}

export interface IImage {
  uuid?: string,
  src: string,
  height: number,
  width: number,
  annotations: IRectangle[]
}

export interface IImagesStore {
  images: IImage[],
  currentImage: IImage,
}

export interface ICurrentImage {
  src: string,
  h: number,
  w: number
}

export const EmptyImage = {
  uuid: "",
  src: "",
  width: 0,
  height: 0,
  annotations: []
}

export const EmptyRectangle = {
  id: "0",
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  label: "",
}
