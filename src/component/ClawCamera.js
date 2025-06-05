import { PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";


function ClawCamera({ clawPos, setClawPos }) {

    const [, getKeys] = useKeyboardControls();

    const camRef = useRef();

    const speed = 0.05;

    useFrame(() => {


        const { forward, backward, left, right, jump } = getKeys();

        if (jump) {
            console.log("jump");
        }
        if (forward) {
            setClawPos({ x: clawPos.x, y: clawPos.y, z: clawPos.z - speed }); // 往前是負值

        }
        if (backward) {
            setClawPos({ x: clawPos.x, y: clawPos.y, z: clawPos.z + speed }); // 往後是正值
        }
        if (right) {
            setClawPos({ x: clawPos.x + speed, y: clawPos.y, z: clawPos.z });

        }
        if (left) {
            setClawPos({ x: clawPos.x - speed, y: clawPos.y, z: clawPos.z });

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