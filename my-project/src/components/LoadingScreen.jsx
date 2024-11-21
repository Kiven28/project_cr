import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const RotatingBook = () => {
  const meshRef = React.useRef();

  // Rotate the book and add a slight bobbing animation
  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.05; // Bouncing effect
  });

  return (
    <group ref={meshRef}>
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[1.2, 1.5, 0.1]} />
        <meshStandardMaterial color="#4C2A85" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[1.2, 1.5, 0.1]} />
        <meshStandardMaterial color="#4C2A85" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.1, 1.4, 0.08]} />
        <meshStandardMaterial color="#D8C7FF" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.05]} rotation={[0, 0.1, 0]}>
        <boxGeometry args={[1.1, 1.4, 0.01]} />
        <meshStandardMaterial color="#EDE7FF" roughness={0.8} />
      </mesh>
    </group>
  );
};

const LoadingScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={styles.loadingScreen} className="loading-screen">
      <Canvas style={styles.canvas} gl={{ alpha: true }} onCreated={({ gl }) => (gl.setClearColor(0, 0, 0, 0))}>
        <ambientLight intensity={0.7} />
        <spotLight position={[15, 15, 10]} angle={0.3} />
        <RotatingBook />
        <OrbitControls enableZoom={false} />
      </Canvas>

      <div style={styles.textContainer}>
        <h2 style={styles.loadingText}>Preparing your tailored learning journey...</h2>
        <p style={styles.subText}>Just a moment! We’re gathering the best courses just for you.</p>
        <div style={styles.spinner}></div>
      </div>
    </div>
  );
};

const styles = {
  loadingScreen: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#FFFFFF', // Fully white background
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    opacity: 1,
    transition: 'opacity 0.5s ease-in-out',
    overflow: 'hidden',
  },
  canvas: {
    width: '160px',
    height: '160px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
  },
  textContainer: {
    marginTop: '30px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: '1.8rem',
    color: '#4C2A85',
    fontWeight: 'bold',
    textAlign: 'center',
    animation: 'fadeIn 2s ease-in-out',
  },
  subText: {
    fontSize: '1rem',
    color: '#4C2A85',
    maxWidth: '80%',
    lineHeight: '1.5',
    animation: 'fadeIn 2s ease-in-out',
    opacity: 0.85,
    marginBottom: '20px',
  },
  spinner: {
    width: '30px',
    height: '30px',
    border: '4px solid #4C2A85',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// Add CSS animations for fadeIn and spin
const stylesGlobal = `
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

document.head.insertAdjacentHTML('beforeend', `<style>${stylesGlobal}</style>`);

export default LoadingScreen;
