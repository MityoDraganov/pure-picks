import { Canvas } from '@react-three/fiber';
import { Gltf, OrbitControls, useGLTF } from '@react-three/drei';

export const Home = () => {
  const { animations } = useGLTF('Worker.glb');

  return (
    <div className='h-screen flex'>
      <Canvas shadows>
        <Gltf
          castShadow
          receiveShadow
          scale={2}
          position={[0, -1, 0]}
          src='Farmer.glb'
          animations={[animations[0]]}
   
        />
        <ambientLight intensity={7} />

        <OrbitControls />
      </Canvas>

      <Canvas shadows>
        <Gltf
          castShadow
          receiveShadow
          scale={2}
          position={[0, -1, 0]}
          src='Worker.glb'
          animations={animations}
        />
        <ambientLight intensity={7} />

        <OrbitControls />
      </Canvas>

      <Canvas shadows>
        <Gltf
          castShadow
          receiveShadow
          scale={2}
          position={[0, -1, 0]}
          src='BusinessMan.glb'
          animations={animations}
        />
        <ambientLight intensity={7} />

        <OrbitControls />
      </Canvas>
    </div>
  );
};
