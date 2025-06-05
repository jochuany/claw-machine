import { PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";

import gsap from "gsap";


function ClawCamera({ clawPos, setClawPos, isClawDown, setIsClawDown }) {

    const [, getKeys] = useKeyboardControls();

    const camRef = useRef();

    const speed = 0.05;
    const limitX = 0.4;
    const limitZ = 0.4;

    useFrame(() => {


        const { forward, backward, left, right, jump } = getKeys();

        if (!isClawDown) { //如果夾子沒有在下降中，就判斷按鍵盤

            if (jump) {
                console.log("jump");
                setIsClawDown(true);
                gsap.to(clawPos, {
                    y: -0.7, duration: 3, onComplete: () => {
                        gsap.to(clawPos, {
                            y: 0.3, duration: 3, onComplete: () => {
                                setIsClawDown(false);
                            }
                        });
                    }
                });
            }
            if (forward) {
                if (clawPos.z < -limitZ) {
                    setClawPos({ x: clawPos.x, y: clawPos.y, z: clawPos.z - speed }); // 往前是負值
                }
            }
            if (backward) {
                if (clawPos.z > limitZ) {
                    setClawPos({ x: clawPos.x, y: clawPos.y, z: clawPos.z + speed }); // 往後是正值
                }
            }
            if (right) {
                if (clawPos.z < limitX) {
                    setClawPos({ x: clawPos.x + speed, y: clawPos.y, z: clawPos.z });
                }
            }
            if (left) {
                if (clawPos.z > -limitX) {
                    setClawPos({ x: clawPos.x - speed, y: clawPos.y, z: clawPos.z });
                }
            }
        }



        if (camRef.current) {
            camRef.current.lookAt(0, 1, 0); // 讓相機看向 0, 1, 0
        }
    });


    return (
        <>

            {/* 建立鏡頭：透視相機（一般世界） */}
            <PerspectiveCamera
                ref={camRef}
                makeDefault
                position={[0, 1, 3]} />

        </>
    )

}



export default ClawCamera;