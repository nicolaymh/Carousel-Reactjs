import "./App.css";

import { useEffect, useState } from "react";
import { styled } from "styled-components";

const CarouselImg = styled.img`
   max-width: 500px;
   width: 100%;
   height: auto;
   opacity: 0;
   transition: 1s;
   &.loaded {
      opacity: 1;
   }
`;

const CarouselButtonContainer = styled.div`
   display: flex;
   align-content: center;
   flex-direction: row;
   margin-top: 15px;
`;

const CarouselButton = styled.button`
   color: white;
   background-color: #eb118a;
   padding: 8px;
   margin: 0 5px;
`;

function App(autoPlay = true, showButtons = false) {
   const images = ["nintendo.jpg", "nintendo2.jpg", "playStation2.jpg"];
   const [selectedIndex, setSelectedIndex] = useState(0);
   const [selectedImage, setSelectedImage] = useState(images[0]);
   const [loaded, setLoaded] = useState(false);

   useEffect(() => {
      if (autoPlay || !showButtons) {
         const interval = setInterval(() => {
            selectNewImage(selectedIndex, images);
         }, 2000);
         return () => clearInterval(interval);
      }
   });

   const selectNewImage = (index, images, next = true) => {
      setLoaded(false);

      setTimeout(() => {
         const condition = next ? selectedIndex < images.length - 1 : selectedIndex > 0;
         const nextIndex = next
            ? condition
               ? selectedIndex + 1
               : 0
            : condition
            ? selectedIndex - 1
            : images.length - 1;

         setSelectedImage(images[nextIndex]);
         setSelectedIndex(nextIndex);
      }, 500);
   };

   const previous = () => selectNewImage(selectedIndex, images, false);
   const next = () => selectNewImage(selectedIndex, images);

   function getImgUrl(name) {
      return new URL(`./assets/${name}`, import.meta.url).href;
   }

   return (
      <>
         <CarouselImg
            src={getImgUrl(selectedImage)}
            alt="img-carousel"
            className={loaded ? "loaded" : ""}
            onLoad={() => setLoaded(true)}
         />
         <CarouselButtonContainer></CarouselButtonContainer>

         {showButtons ? (
            <>
               <CarouselButton onClick={previous}>{"<"}</CarouselButton>
               <CarouselButton onClick={next}>{">"}</CarouselButton>
            </>
         ) : (
            <></>
         )}
      </>
   );
}

export default App;
