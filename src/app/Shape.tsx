'use client';

import { useParallax } from 'react-scroll-parallax';

export default function Shape() {


    const parallax = useParallax<HTMLDivElement>({
        // scale: [0, 1, "easeInQuad"],
        translateY: ["0px", '800px'],
        speed: 10
    })

    const parallax2 = useParallax<HTMLDivElement>({
        // scale: [0, 1, "easeInQuad"],
        translateY: ["0px", '600px'],
        rotate: [0, 360],
        speed: -10
    })

  return (
    <>
      <div className='shape absolute' ref={parallax.ref} ></div>
      <div className='shape2 absolute' ref={parallax2.ref} ></div>
    </>
  );
}