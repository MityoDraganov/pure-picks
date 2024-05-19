import { Gltf, Text, useGLTF } from "@react-three/drei";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const { animations } = useGLTF("Worker.glb");

  const [hoveredCanvas, setHoveredCanvas] = useState<string | null>(null);

  const handleMouseEnter = (canvasId: string) => {
    setHoveredCanvas(canvasId);
  };

  const handleMouseLeave = () => {
    setHoveredCanvas(null);
  };

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen">
      <div className="h-2/3 flex justify-evenly">
        <div className="flex flex-col justify-center items-center w-1/5">
          <Canvas
            className="h-min"
            id="farmer"
            shadows
            onMouseEnter={() => handleMouseEnter("farmer")}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate("auth/register/farmer")}
          >
            <Text
              anchorY={-3.8}
              color={hoveredCanvas == "farmer" ? "#1A4D2E" : "#BACD92"}
              fontSize={0.8}
            >
              Farmer
            </Text>
            <Gltf
              castShadow
              receiveShadow
              scale={2}
              position={[0, -1, 0]}
              src="Farmer.glb"
              animations={[animations[0]]}
            />
            <ambientLight intensity={hoveredCanvas == "farmer" ? 8 : 5} />
          </Canvas>
        </div>

        <div className="flex flex-col justify-center items-center w-2/5">
          <Canvas
            shadows
            onMouseEnter={() => handleMouseEnter("worker")}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate("auth/register/deliverer")}
          >
            <Text
              anchorY={-3.8}
              color={hoveredCanvas == "worker" ? "#1A4D2E" : "#BACD92"}
              fontSize={0.8}
            >
              Delivery worker
            </Text>
            <Gltf
              castShadow
              receiveShadow
              scale={2}
              position={[0, -1, 0]}
              src="Worker.glb"
              animations={animations}
            />
            <ambientLight intensity={hoveredCanvas == "worker" ? 8 : 5} />
          </Canvas>
        </div>

        <div className="flex flex-col justify-center items-center w-1/5">
          <Canvas
            shadows
            onMouseEnter={() => handleMouseEnter("businessMan")}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate("auth/register/buyer")}
          >
            <Text
              anchorY={-3.8}
              color={hoveredCanvas == "businessMan" ? "#1A4D2E" : "#BACD92"}
              fontSize={0.8}
            >
              Buyer
            </Text>
            <Gltf
              castShadow
              receiveShadow
              scale={2}
              position={[0, -1, 0]}
              src="BusinessMan.glb"
              animations={animations}
            />
            <ambientLight intensity={hoveredCanvas == "businessMan" ? 8 : 5} />
          </Canvas>
        </div>
      </div>
    </div>
  );
};
