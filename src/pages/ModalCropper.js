import React, { useState, useCallback } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import getCroppedImg from "../cropImage";

export const ModalCropper = ({
  setSrc,
  setSelectImageValue,
  src,
  setCroppedImageUrl,
  setCroppedImage,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onClickClose = () => {
    setSrc(null);
    setSelectImageValue("");
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(src, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImageUrl(croppedImage);
      let blobImage = await fetch(croppedImage).then((r) => r.blob());
      setCroppedImage(blobImage);
      setSrc(null);
      setSelectImageValue("");
    } catch (e) {
      console.error(e);
    }
  }, [src, croppedAreaPixels]);

  return (
    <ModalCropperWrap>
      <ModalCropperInner>
        <CloseIcon onClick={onClickClose} />
        <div className="cropper-wrap">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="slider-wrap">
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(zoom)}
            classes={{ root: "slider" }}
          />
        </div>
        <Button
          className="cropper-ok"
          variant="contained"
          onClick={showCroppedImage}
        >
          OK
        </Button>
      </ModalCropperInner>
    </ModalCropperWrap>
  );
};

const ModalCropperWrap = styled.div`
  z-index: 4;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalCropperInner = styled.div`
  z-index: 5;
  height: 45.6vw; //87.5rem;
  width: 40.2vw; //77.2rem;
  border-radius: 3.4vw; //6.5rem;
  background-color: #fff;

  .MuiSvgIcon-root {
    font-size: 2.6vw; //5rem;
    margin: 2.1vw 2.86vw 0 0; //4rem 5.5rem 0 0;
    float: right; 
    cursor: pointer;
    color: #EF4565;
  }

  .cropper-wrap {
    position: relative;
    height: 25.62vw; //49.2rem;
    width: 25.62vw; //49.2rem;
    margin: 6.25vw auto 2.38vw; //12rem auto 4.57rem;
    .reactEasyCrop_Container {
      height: 100%;
      width: 100%;
      object-fit: contain;
      img {
        height: 26vw; //50rem;
      }
      div {
        height: 100%;
        width: 100%;
      }
    }
  }

  .slider-wrap {
    width: 50%;
    margin: 0 auto;
  }

  .cropper-ok {
    display: block;
    margin: 2.4vw auto 0; //4.6rem auto 0;
    background-color: #ef4565;
      color: #fff;
      font-size: 1.8vw; //3.5rem;
      border-radius: 0.62vw; //1.2rem;
      width: 11.4vw; //21.9rem;
      height: 3.9vw; //7.5rem;
      font-family: "ヒラギノ丸ゴ ProN";
      font-weight: normal;
      line-height: 3.1vw; //6rem;
      :hover {
        background-color: #dc004e;
      }
    }
  }
`;
