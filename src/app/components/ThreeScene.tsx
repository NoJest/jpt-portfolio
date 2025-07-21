'use-client';
import {Canvas, useFrame } from '@react-three/fiber';
import {useRef} from 'react';
import {Mesh} from 'three';

function Cube(){
    const cubeRef = useRef<Mesh>(null);
    useFrame( () => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x += 0.01;
            cubeRef.current.rotation.y =+ 0.01;
        }
    });

    return (
        <mesh ref={cubeRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="6b46c1" />
        </mesh>
    );
}

export default function ThreeScene() {
    return (
        <div className='h-64 w-full'>
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position= {[10,10,10]} />
                <Cube />
            </Canvas>
        </div>
    );
}