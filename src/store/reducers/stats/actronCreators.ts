import {
  SetCurrentImageAction,
  AddImageAction,
  ImagesActionEnum,
  SetImageAction,
  SetAnnotationsAciton,
  RemoveImageAction
} from "./types";
import {IImage, IRectangle} from "../models";

export const ImagesActionCreator = {
  addImage: (payload: IImage): AddImageAction => ({type: ImagesActionEnum.ADD_IMAGE, payload}),
  setCurrentImage: (payload: string): SetCurrentImageAction => ({type: ImagesActionEnum.SET_CURRENT_IMAGE, payload}),
  setAnnotations: (payload: IRectangle[]): SetAnnotationsAciton => ({type: ImagesActionEnum.SET_ANNOTATIONS, payload}),
  setImage: (): SetImageAction => ({type: ImagesActionEnum.SET_IMAGE}),
  removeImage: (payload: string): RemoveImageAction => ({type: ImagesActionEnum.REMOVE_IMAGE, payload}),
}