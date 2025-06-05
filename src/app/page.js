"use client"
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { RoundedBox, CameraControls, Environment, useGLTF, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { useRef } from "react";


function ClawModel() {
  const clawModel = useGLTF("claw2.glb");
  return (<>
    <primitive
      object={clawModel.scene}
      scale={[0.6, 0.6, 0.6]}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  </>)
}

export default function Home() {

  const isHidden = true; //這裡只是要把原本的RoundedBox隱藏而已

  const cameraRef = useRef();



  return (
    <div className="w-full h-screen">
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

        {/* 載入前不要出現 */}
        <Suspense fallback={null}>
          <ClawModel />
        </Suspense>


        <Environment
          background={true} // can be true, false or "only" (which only sets the background) (default: false)
          backgroundBlurriness={0.5} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
          backgroundIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
          environmentIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
          preset={'city'}
        />

        <ContactShadows opacity={1} scale={10} blur={10} far={10} resolution={256} color="#DDDDDD" />

        {/* 鏡頭控制 */}
        <CameraControls />

        {/* 建立鏡頭：透視相機（一般世界） */}
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[0, 1, 3]} />


      </Canvas>
    </div>
  );
}