"use client"
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import {
  RoundedBox, CameraControls, Environment, useGLTF, ContactShadows,
  axesHelper, KeyboardControls, useKeyboardControls, Box
} from "@react-three/drei";
import { Suspense, useState } from "react";
import ClawCamera from "@/component/ClawCamera";

function ClawModel({ clawPos }) {
  const clawModel = useGLTF("claw2.glb");
  return (<>
    <primitive
      object={clawModel.scene}
      scale={[0.6, 0.6, 0.6]}
      position={[clawPos.x, clawPos.y, clawPos.z]}
      rotation={[0, 0, 0]}
    />
  </>)
}

export default function Home() {

  const isHidden = true; //這裡只是要把原本的RoundedBox隱藏而已

  const [clawPos, setClawPos] = useState({ x: 0, y: 0, z: 0 });


  return (
    <div className="w-full h-screen">

      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
        ]}>


        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />


          {
            !isHidden && <RoundedBox
              args={[1, 1, 1]} // Width, height, depth. Default is [1, 1, 1]
              radius={0.05} // Radius of the rounded corners. Default is 0.05
              smoothness={4} // The number of curve segments. Default is 4
              bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
              creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
            >
              <meshPhongMaterial color="#f3f3f3" />
            </RoundedBox>
          }


          <Box args={[1, 1, 1]} />


          {/* 載入前不要出現 */}
          <Suspense fallback={null}>
            <ClawModel clawPos={clawPos} />
          </Suspense>


          <Environment
            background={true} // can be true, false or "only" (which only sets the background) (default: false)
            backgroundBlurriness={0.5} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
            backgroundIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
            environmentIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
            preset={'city'}
          />

          <ContactShadows opacity={1} scale={10} blur={10} far={10} resolution={256} color="#DDDDDD" />

          {/* 匯入透視相機（在 component 中） */}
          <ClawCamera setClawPos={setClawPos} clawPos={clawPos} />

          {/* 鏡頭控制 */}
          <CameraControls />
          <axesHelper args={[10]} />




        </Canvas>


      </KeyboardControls>
    </div>
  );
}