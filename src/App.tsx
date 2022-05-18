import React, {useEffect, useState} from 'react';
import './App.css';
import DrawArea from "./components/DrawArea";
import ImageList from "./components/ImageList";
import axios from "axios";
import {EmptyImage, ICurrentImage, IImage} from "./store/reducers/models";
import {ThemeProvider} from 'styled-components';
import {darkTheme, GlobalStyle, lightTheme} from "./GlobalStyle";
import {DarkMode, LightMode} from "@styled-icons/material-rounded";
import {NewImage} from "./utils/utils";
import {useActions} from "./hooks/useAction";

export function App() {
  const [images, setImages] = useState<IImage[]>([EmptyImage])
  const [currentImage, setCurrentImage] = useState<ICurrentImage>({src: "", w: 0, h: 0})
  const [theme, setTheme] = useState<any>(darkTheme)

  const {addImage} = useActions()


  const themeSwitch = () => {
    if (theme === darkTheme) setTheme(lightTheme)
    else setTheme(darkTheme)
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <DrawArea setImages={setImages}/>
        <ImageList/>
      </div>
      <div onClick={themeSwitch} style={{
        width: "50px",
        height: "50px",
        textAlign: "center",
        borderRadius: "4px",
        margin: "30px",
        position: "fixed",
        bottom: "170px",
        right: "-20px",
      }}>
        {(theme === darkTheme)
          ? <LightMode size={50} color={darkTheme.fourth}/>
          : <DarkMode size={50} color={lightTheme.fourth}/>}
      </div>
      <GlobalStyle colors={theme}/>
    </ThemeProvider>
  );
}
