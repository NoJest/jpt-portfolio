'use client';
import { useProgress } from '@react-three/drei';

export default function Loader() {
  const { progress, active } = useProgress();
  
  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black transition-opacity duration-1000 ${
      progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="text-white text-center">
        <div className="text-4xl mb-4">{Math.round(progress)}%</div>
        <div className="w-64 h-1 bg-gray-700 rounded overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}