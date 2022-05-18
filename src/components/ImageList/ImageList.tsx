import {ColoredClose, ColoredUpload, ImageListWrapper, ImageWrapper} from "./style";
import React, {useRef, useState} from "react";
import {ICurrentImage, IImage} from "../../store/reducers/models";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useAction";
import {NewImage} from "../../utils/utils";
import axios from "axios";
import {v4} from "uuid";
import {ExposurePlus1, ExposurePlus2} from "@styled-icons/material-rounded";

type ImageListProps = {
  // images: IImage[],
  currentImage: ICurrentImage,
  setCurrentImage: React.Dispatch<React.SetStateAction<ICurrentImage>>
}

export function ImageList() {
  const [imagessList, setImagesList] = useState<IImage[]>([])
  const refImageList = useRef<HTMLDivElement>(null);

  const images = useTypedSelector(store => store.images.images)
  const currentImage = useTypedSelector(store => store.images.currentImage)

  const {setCurrentImage, setImage, addImage, removeImage} = useActions()

  // useEffect(() => {
  //   let arr = [...images]
  //   setImagesList(arr)
  // }, [images]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (refImageList.current) {
      refImageList.current["scrollLeft"] += e.deltaY;
    }
  }

  const handleClick = (uuid: string) => {
    // setImage()
    setCurrentImage(uuid!)
    // console.log(image.width, image.height)
  }

  function randomImages(c: number = 5) {
    for (let i = 0; i < c; i++) {
      axios.get(`https://source.unsplash.com/random?sig=${v4().substring(1, 6)}`).then(
        res => {
          let img = new Image()
          img.src = res.request.responseURL
          img.crossOrigin = "anonymous"
          img.onload = () => {
            addImage(NewImage(img))
          }
        }
      )
    }

  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const {files} = event.target
    const img = new Image()

    if (files) img.src = window.URL.createObjectURL(files[0])
    img.onload = () => {
      addImage(NewImage(img))
    }
    console.log(img.src)
  }


  return (
    <ImageListWrapper ref={refImageList} onWheel={handleWheel}>
      <ImageWrapper>
        <ExposurePlus1 size={150} onClick={() => {
          randomImages(1)
        }}/>
      </ImageWrapper>
      {images.map((image, i) =>
        image.uuid ?
          <ImageWrapper key={i}
                        onClick={() => handleClick(image.uuid!)}
                        border={image.src === currentImage.src}
          >
            <img src={image.src} height={150} alt=""/>
            <ColoredClose size={40} onClick={(e) => {
              e.stopPropagation()
              removeImage(image.uuid!)
            }}/>
          </ImageWrapper>
          : null
      )}
      <ImageWrapper>
        <input
          id="uploadImage"
          type="file"
          onChange={handleUpload}
          hidden
        />
        <ColoredUpload size={150} onClick={() => {
          let input = document.getElementById("uploadImage")
          if (input) input.click()
        }}/>
      </ImageWrapper>
    </ImageListWrapper>);
}