import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, PointMaterial, Points, RoundedBox, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function StarField({ count = 900 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 34;
      data[i * 3 + 1] = (Math.random() - 0.5) * 20;
      data[i * 3 + 2] = (Math.random() - 0.5) * 28;
    }

    return data;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    ref.current.rotation.z = state.clock.elapsedTime * 0.004;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#9fb1ff" size={0.024} sizeAttenuation opacity={0.22} depthWrite={false} />
    </Points>
  );
}

function SceneRig({ focusRef, faceLightRef }) {
  const { camera } = useThree();

  const focus = useMemo(() => new THREE.Vector3(), []);
  const fallback = useMemo(() => new THREE.Vector3(0.12, 1.02, 0), []);

  useFrame((state, delta) => {
    const s = 0;
    const t = state.clock.elapsedTime;

    const targetX = THREE.MathUtils.lerp(0.64, 1.58, s) + state.pointer.x * 0.09;
    const targetY = THREE.MathUtils.lerp(1.36, 1.52, s) + state.pointer.y * 0.06;
    const targetZ = THREE.MathUtils.lerp(4.95, 6.0, s);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 5.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 5.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 5.5, delta);

    if (focusRef.current) {
      focusRef.current.getWorldPosition(focus);
      focus.x += s * 0.5;
    } else {
      focus.copy(fallback);
    }

    focus.y += Math.sin(t * 0.45) * 0.015;
    camera.lookAt(focus);

    if (faceLightRef.current) {
      const glow = THREE.MathUtils.lerp(0.78, 1.18, s) + Math.sin(t * 1.8) * 0.04;
      faceLightRef.current.intensity = THREE.MathUtils.damp(faceLightRef.current.intensity, glow, 5.2, delta);
    }
  });

  return null;
}

function CharacterWorkspace({ interactiveMode, faceLightRef, focusRef }) {
  const rootRef = useRef();
  const torsoRef = useRef();
  const chestRef = useRef();
  const headRef = useRef();

  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const leftPupilRef = useRef();
  const rightPupilRef = useRef();

  const leftUpperArmRef = useRef();
  const rightUpperArmRef = useRef();
  const leftForeArmRef = useRef();
  const rightForeArmRef = useRef();
  const leftHandRef = useRef();
  const rightHandRef = useRef();

  const leftUpperLegRef = useRef();
  const rightUpperLegRef = useRef();
  const leftLowerLegRef = useRef();
  const rightLowerLegRef = useRef();

  const leftShoulderRef = useRef();
  const rightShoulderRef = useRef();

  const leftHandTargetRef = useRef();
  const rightHandTargetRef = useRef();

  const laptopGroupRef = useRef();
  const screenLightRef = useRef();

  const blinkRef = useRef({ start: -1, duration: 0.12, next: 1.25 });

  const leftTargetLocal = useMemo(() => new THREE.Vector3(), []);
  const rightTargetLocal = useMemo(() => new THREE.Vector3(), []);

  const materials = useMemo(
    () => ({
      skin: new THREE.MeshPhysicalMaterial({
        color: '#ebebf0',
        roughness: 0.62,
        metalness: 0.02,
        clearcoat: 0.12,
        clearcoatRoughness: 0.56,
      }),
      shirt: new THREE.MeshPhysicalMaterial({
        color: '#f3f3f7',
        roughness: 0.72,
        metalness: 0.01,
        clearcoat: 0.08,
        clearcoatRoughness: 0.64,
      }),
      hair: new THREE.MeshPhysicalMaterial({
        color: '#07080e',
        roughness: 0.42,
        metalness: 0.08,
        clearcoat: 0.18,
        clearcoatRoughness: 0.34,
      }),
      eyeWhite: new THREE.MeshStandardMaterial({ color: '#fbfdff', roughness: 0.16, metalness: 0.0 }),
      iris: new THREE.MeshStandardMaterial({ color: '#4d3fc9', roughness: 0.26, metalness: 0.05 }),
      pupil: new THREE.MeshStandardMaterial({ color: '#0e1018', roughness: 0.22, metalness: 0.02 }),
      desk: new THREE.MeshPhysicalMaterial({
        color: '#e9eef6',
        roughness: 0.54,
        metalness: 0.05,
        clearcoat: 0.14,
        clearcoatRoughness: 0.44,
      }),
      metal: new THREE.MeshStandardMaterial({ color: '#d0d7e3', roughness: 0.38, metalness: 0.5 }),
      chair: new THREE.MeshPhysicalMaterial({
        color: '#f2f5fa',
        roughness: 0.58,
        metalness: 0.03,
        clearcoat: 0.1,
        clearcoatRoughness: 0.58,
      }),
      laptopBody: new THREE.MeshPhysicalMaterial({
        color: '#101520',
        roughness: 0.34,
        metalness: 0.26,
        clearcoat: 0.22,
        clearcoatRoughness: 0.32,
      }),
      laptopScreen: new THREE.MeshStandardMaterial({
        color: '#f29bc4',
        emissive: '#bf5e8f',
        emissiveIntensity: 0.95,
        roughness: 0.22,
        metalness: 0.08,
      }),
      propRed: new THREE.MeshStandardMaterial({ color: '#c64d4d', roughness: 0.48, metalness: 0.08 }),
      propGreen: new THREE.MeshStandardMaterial({ color: '#2ac6a7', roughness: 0.42, metalness: 0.08 }),
      propPink: new THREE.MeshStandardMaterial({ color: '#e88bb8', roughness: 0.48, metalness: 0.04 }),
    }),
    [],
  );

  const solveArm = (upper, fore, hand, target, side, delta, typingWave) => {
    if (!upper || !fore || !hand) return;

    const tx = clamp(target.x, -0.42, 0.42);
    const ty = clamp(target.y, -0.5, 0.16);
    const tz = clamp(target.z, -0.46, 0.46);

    const shoulderYaw = clamp(tx * 1.75, -0.9, 0.9);
    const shoulderPitch = clamp(-tz * 1.35 + ty * 0.35 + 0.18, -1.0, 0.72);
    const shoulderRoll = side * clamp(0.38 + Math.abs(tx) * 0.9, 0.28, 1.12);
    const elbowBend = clamp(1.18 - tz * 0.95 - Math.abs(tx) * 0.4, 0.54, 1.62);

    upper.rotation.y = THREE.MathUtils.damp(upper.rotation.y, shoulderYaw, 8.5, delta);
    upper.rotation.x = THREE.MathUtils.damp(upper.rotation.x, shoulderPitch, 8.5, delta);
    upper.rotation.z = THREE.MathUtils.damp(upper.rotation.z, shoulderRoll, 8.5, delta);

    fore.rotation.x = THREE.MathUtils.damp(fore.rotation.x, -elbowBend, 9.2, delta);
    fore.rotation.y = THREE.MathUtils.damp(fore.rotation.y, shoulderYaw * 0.24, 8.4, delta);

    hand.rotation.x = THREE.MathUtils.damp(hand.rotation.x, -0.06 + typingWave * 1.6, 10, delta);
    hand.rotation.z = THREE.MathUtils.damp(hand.rotation.z, side * 0.12 + typingWave * side * 1.3, 10, delta);
  };

  useFrame((state, delta) => {
    if (!rootRef.current || !torsoRef.current || !headRef.current || !chestRef.current) return;

    const s = 0;
    const t = state.clock.elapsedTime;
    const pointerX = interactiveMode ? state.pointer.x : 0;
    const pointerY = interactiveMode ? state.pointer.y : 0;

    const breathe = Math.sin(t * 1.65) * 0.015;
    const sway = Math.sin(t * 0.72) * 0.032;

    const targetScale = clamp(1.03 - s * 0.44, 0.62, 1.03);
    rootRef.current.scale.setScalar(THREE.MathUtils.damp(rootRef.current.scale.x, targetScale, 5.2, delta));
    rootRef.current.position.x = THREE.MathUtils.damp(rootRef.current.position.x, s * 1.48, 4.8, delta);
    rootRef.current.position.y = THREE.MathUtils.damp(rootRef.current.position.y, -0.9 + s * 0.36 + breathe, 4.8, delta);
    rootRef.current.rotation.y = THREE.MathUtils.damp(rootRef.current.rotation.y, 0.2 + s * 0.12, 4.6, delta);

    torsoRef.current.rotation.x = THREE.MathUtils.damp(torsoRef.current.rotation.x, -0.06 + breathe * 0.45, 6.8, delta);
    torsoRef.current.rotation.z = THREE.MathUtils.damp(torsoRef.current.rotation.z, sway * 0.08, 6.8, delta);

    chestRef.current.scale.y = THREE.MathUtils.damp(chestRef.current.scale.y, 1 + breathe * 0.8, 5.5, delta);

    headRef.current.rotation.y = THREE.MathUtils.damp(headRef.current.rotation.y, pointerX * 0.1 + sway * 0.18, 7.6, delta);
    headRef.current.rotation.x = THREE.MathUtils.damp(headRef.current.rotation.x, -0.08 - pointerY * 0.07, 7.6, delta);
    headRef.current.rotation.z = THREE.MathUtils.damp(headRef.current.rotation.z, -0.04 + Math.sin(t * 0.58) * 0.02, 7.6, delta);

    if (focusRef.current) {
      focusRef.current.position.y = THREE.MathUtils.damp(focusRef.current.position.y, 0.15 + breathe * 0.4, 8, delta);
    }

    const blinkState = blinkRef.current;
    if (blinkState.start < 0 && t >= blinkState.next) {
      blinkState.start = t;
      blinkState.duration = THREE.MathUtils.randFloat(0.085, 0.15);
      blinkState.next = t + THREE.MathUtils.randFloat(2.4, 5.0);
    }

    let blinkAmount = 0;
    if (blinkState.start >= 0) {
      const progress = (t - blinkState.start) / blinkState.duration;
      if (progress >= 1) {
        blinkState.start = -1;
      } else {
        blinkAmount = Math.sin(progress * Math.PI);
      }
    }

    const eyeScaleY = 0.84 - blinkAmount * 0.75;
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = THREE.MathUtils.damp(leftEyeRef.current.scale.y, eyeScaleY, 16, delta);
      rightEyeRef.current.scale.y = THREE.MathUtils.damp(rightEyeRef.current.scale.y, eyeScaleY, 16, delta);
    }

    const irisX = clamp(pointerX * 0.018, -0.017, 0.017);
    const irisY = clamp(pointerY * 0.013, -0.012, 0.012);

    if (leftPupilRef.current && rightPupilRef.current) {
      leftPupilRef.current.position.x = THREE.MathUtils.damp(leftPupilRef.current.position.x, irisX, 11.5, delta);
      leftPupilRef.current.position.y = THREE.MathUtils.damp(leftPupilRef.current.position.y, irisY, 11.5, delta);
      rightPupilRef.current.position.x = THREE.MathUtils.damp(rightPupilRef.current.position.x, irisX, 11.5, delta);
      rightPupilRef.current.position.y = THREE.MathUtils.damp(rightPupilRef.current.position.y, irisY, 11.5, delta);
    }

    const typingLeft = Math.sin(t * 8.4) * 0.012;
    const typingRight = Math.sin(t * 8.4 + Math.PI * 0.75) * 0.012;

    if (leftHandTargetRef.current && rightHandTargetRef.current && leftShoulderRef.current && rightShoulderRef.current) {
      leftHandTargetRef.current.getWorldPosition(leftTargetLocal);
      leftTargetLocal.y += typingLeft;
      leftShoulderRef.current.worldToLocal(leftTargetLocal);

      rightHandTargetRef.current.getWorldPosition(rightTargetLocal);
      rightTargetLocal.y += typingRight;
      rightShoulderRef.current.worldToLocal(rightTargetLocal);

      solveArm(leftUpperArmRef.current, leftForeArmRef.current, leftHandRef.current, leftTargetLocal, -1, delta, typingLeft);
      solveArm(rightUpperArmRef.current, rightForeArmRef.current, rightHandRef.current, rightTargetLocal, 1, delta, typingRight);
    }

    if (leftUpperLegRef.current && rightUpperLegRef.current && leftLowerLegRef.current && rightLowerLegRef.current) {
      leftUpperLegRef.current.rotation.x = THREE.MathUtils.damp(leftUpperLegRef.current.rotation.x, -1.1 + breathe * 0.06, 7.5, delta);
      rightUpperLegRef.current.rotation.x = THREE.MathUtils.damp(rightUpperLegRef.current.rotation.x, -1.12 - breathe * 0.05, 7.5, delta);

      leftLowerLegRef.current.rotation.x = THREE.MathUtils.damp(leftLowerLegRef.current.rotation.x, 1.08 + Math.sin(t * 1.2) * 0.03, 7.8, delta);
      rightLowerLegRef.current.rotation.x = THREE.MathUtils.damp(rightLowerLegRef.current.rotation.x, 1.06 - Math.sin(t * 1.2) * 0.03, 7.8, delta);
    }

    if (laptopGroupRef.current) {
      laptopGroupRef.current.rotation.y = THREE.MathUtils.damp(laptopGroupRef.current.rotation.y, -0.18 + Math.sin(t * 0.5) * 0.02, 4.8, delta);
    }

    if (screenLightRef.current) {
      const glowTarget = 0.85 + Math.sin(t * 1.25) * 0.06;
      screenLightRef.current.intensity = THREE.MathUtils.damp(screenLightRef.current.intensity, glowTarget, 5.6, delta);
    }
  });

  return (
    <group ref={rootRef} position={[0, -0.9, 0]} scale={1.03}>
      <group position={[0, 0, 0]}>
        <RoundedBox args={[3.2, 0.1, 1.62]} radius={0.04} position={[0, 0.64, 0.16]} material={materials.desk} castShadow receiveShadow />

        {[
          [-1.42, 0.32, -0.5],
          [1.42, 0.32, -0.5],
          [-1.42, 0.32, 0.8],
          [1.42, 0.32, 0.8],
        ].map((legPos) => (
          <mesh key={legPos.join('-')} position={legPos} castShadow receiveShadow material={materials.metal}>
            <cylinderGeometry args={[0.035, 0.04, 0.64, 14]} />
          </mesh>
        ))}

        <group ref={laptopGroupRef} position={[0.28, 0.73, 0]} rotation={[0, -0.18, 0]}>
          <RoundedBox args={[0.94, 0.032, 0.62]} radius={0.02} material={materials.laptopBody} castShadow receiveShadow />
          <RoundedBox args={[0.72, 0.01, 0.18]} radius={0.008} position={[0, 0.019, 0.06]} material={materials.desk} />
          <RoundedBox args={[0.86, 0.5, 0.028]} radius={0.015} position={[0, 0.27, -0.29]} rotation={[-0.22, 0, 0]} material={materials.laptopScreen} castShadow />

          <group ref={leftHandTargetRef} position={[-0.18, 0.038, 0.02]} />
          <group ref={rightHandTargetRef} position={[0.16, 0.038, 0.01]} />
        </group>

        <RoundedBox args={[0.19, 0.44, 0.15]} radius={0.03} position={[0.7, 0.86, 0.32]} material={materials.propPink} castShadow receiveShadow />

        <mesh position={[-1.08, 0.71, 0.34]} material={materials.propRed} castShadow receiveShadow>
          <cylinderGeometry args={[0.06, 0.07, 0.06, 18]} />
        </mesh>

        <mesh position={[1.14, 0.71, 0.44]} material={materials.propGreen} castShadow receiveShadow>
          <sphereGeometry args={[0.09, 18, 18]} />
        </mesh>
      </group>

      <group position={[0, 0, -0.88]}>
        <group position={[0, 0.22, -0.28]}>
          <RoundedBox args={[0.74, 0.12, 0.72]} radius={0.07} material={materials.chair} castShadow receiveShadow />
          <RoundedBox args={[0.72, 0.62, 0.1]} radius={0.06} position={[0, 0.34, -0.23]} material={materials.chair} castShadow receiveShadow />
          <mesh position={[0, -0.22, -0.02]} material={materials.metal} castShadow receiveShadow>
            <cylinderGeometry args={[0.045, 0.05, 0.32, 16]} />
          </mesh>
        </group>

        <group ref={torsoRef} position={[0, 0.58, 0]}>
          <RoundedBox args={[0.7, 0.38, 0.34]} radius={0.1} position={[0, 0.02, 0.03]} material={materials.shirt} castShadow receiveShadow />

          <group ref={chestRef} position={[0, 0.06, 0.08]}>
            <RoundedBox args={[0.62, 0.25, 0.26]} radius={0.09} material={materials.shirt} castShadow receiveShadow />
          </group>

          <mesh position={[0, 0.22, 0.08]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.14, 16]} />
            <primitive object={materials.skin} attach="material" />
          </mesh>

          <group ref={headRef} position={[0, 0.42, 0.14]}>
            <group ref={focusRef} position={[0, 0.15, 0.2]} />

            <Sphere args={[0.3, 34, 34]} material={materials.skin} castShadow receiveShadow />
            <Sphere args={[0.3, 28, 28]} position={[0, -0.08, 0.04]} scale={[0.96, 0.72, 0.86]} material={materials.skin} castShadow receiveShadow />

            <Sphere args={[0.07, 20, 20]} position={[-0.32, 0.0, 0.01]} material={materials.skin} castShadow />
            <Sphere args={[0.07, 20, 20]} position={[0.32, 0.0, 0.01]} material={materials.skin} castShadow />
            <Sphere args={[0.042, 16, 16]} position={[-0.32, 0.0, 0.03]} material={materials.shirt} />
            <Sphere args={[0.042, 16, 16]} position={[0.32, 0.0, 0.03]} material={materials.shirt} />

            <Sphere args={[0.058, 20, 20]} position={[0, -0.03, 0.28]} scale={[0.72, 0.96, 0.64]} material={materials.skin} castShadow />

            <group position={[0, 0.11, 0.02]}>
              <Sphere args={[0.33, 30, 30]} position={[0, 0.1, -0.05]} scale={[1, 0.56, 0.92]} material={materials.hair} castShadow receiveShadow />
              <RoundedBox args={[0.56, 0.13, 0.41]} radius={0.06} position={[0, -0.01, 0.16]} material={materials.hair} castShadow receiveShadow />
            </group>

            <RoundedBox args={[0.15, 0.032, 0.03]} radius={0.01} position={[-0.115, 0.115, 0.24]} rotation={[0, 0, 0.02]} material={materials.hair} />
            <RoundedBox args={[0.15, 0.032, 0.03]} radius={0.01} position={[0.115, 0.115, 0.24]} rotation={[0, 0, -0.02]} material={materials.hair} />

            <group ref={leftEyeRef} position={[-0.115, 0.02, 0.26]}>
              <Sphere args={[0.052, 18, 18]} material={materials.eyeWhite} castShadow />
              <group ref={leftPupilRef} position={[0, 0, 0.03]}>
                <Sphere args={[0.028, 16, 16]} material={materials.iris} />
                <Sphere args={[0.014, 12, 12]} position={[0, 0, 0.018]} material={materials.pupil} />
              </group>
            </group>

            <group ref={rightEyeRef} position={[0.115, 0.02, 0.26]}>
              <Sphere args={[0.052, 18, 18]} material={materials.eyeWhite} castShadow />
              <group ref={rightPupilRef} position={[0, 0, 0.03]}>
                <Sphere args={[0.028, 16, 16]} material={materials.iris} />
                <Sphere args={[0.014, 12, 12]} position={[0, 0, 0.018]} material={materials.pupil} />
              </group>
            </group>

            <mesh position={[0, -0.15, 0.24]} rotation={[Math.PI, 0.04, 0]}>
              <torusGeometry args={[0.06, 0.009, 10, 22, Math.PI]} />
              <meshStandardMaterial color="#1d212e" roughness={0.45} metalness={0.03} />
            </mesh>
          </group>

          <group ref={leftShoulderRef} position={[-0.24, 0.15, 0.09]}>
            <group ref={leftUpperArmRef}>
              <mesh position={[0, -0.14, 0]} castShadow material={materials.shirt}>
                <cylinderGeometry args={[0.058, 0.063, 0.28, 16]} />
              </mesh>

              <group ref={leftForeArmRef} position={[0, -0.28, 0]}>
                <mesh position={[0, -0.13, 0]} castShadow material={materials.skin}>
                  <cylinderGeometry args={[0.05, 0.055, 0.26, 16]} />
                </mesh>

                <group ref={leftHandRef} position={[0, -0.26, 0]}>
                  <RoundedBox args={[0.11, 0.065, 0.11]} radius={0.02} material={materials.skin} castShadow />
                  {[-0.032, -0.012, 0.01, 0.032].map((fingerX) => (
                    <RoundedBox
                      key={`lf-${fingerX}`}
                      args={[0.018, 0.028, 0.05]}
                      radius={0.008}
                      position={[fingerX, -0.008, 0.045]}
                      material={materials.skin}
                      castShadow
                    />
                  ))}
                </group>
              </group>
            </group>
          </group>

          <group ref={rightShoulderRef} position={[0.24, 0.15, 0.09]}>
            <group ref={rightUpperArmRef}>
              <mesh position={[0, -0.14, 0]} castShadow material={materials.shirt}>
                <cylinderGeometry args={[0.058, 0.063, 0.28, 16]} />
              </mesh>

              <group ref={rightForeArmRef} position={[0, -0.28, 0]}>
                <mesh position={[0, -0.13, 0]} castShadow material={materials.skin}>
                  <cylinderGeometry args={[0.05, 0.055, 0.26, 16]} />
                </mesh>

                <group ref={rightHandRef} position={[0, -0.26, 0]}>
                  <RoundedBox args={[0.11, 0.065, 0.11]} radius={0.02} material={materials.skin} castShadow />
                  {[-0.032, -0.012, 0.01, 0.032].map((fingerX) => (
                    <RoundedBox
                      key={`rf-${fingerX}`}
                      args={[0.018, 0.028, 0.05]}
                      radius={0.008}
                      position={[fingerX, -0.008, 0.045]}
                      material={materials.skin}
                      castShadow
                    />
                  ))}
                </group>
              </group>
            </group>
          </group>

          <group position={[-0.14, -0.15, 0.02]} ref={leftUpperLegRef} rotation={[-1.12, 0.0, 0.06]}>
            <mesh position={[0, -0.2, 0]} castShadow material={materials.shirt}>
              <cylinderGeometry args={[0.07, 0.074, 0.4, 16]} />
            </mesh>
            <group ref={leftLowerLegRef} position={[0, -0.4, 0]} rotation={[1.08, 0, 0]}>
              <mesh position={[0, -0.2, 0]} castShadow material={materials.shirt}>
                <cylinderGeometry args={[0.064, 0.068, 0.4, 16]} />
              </mesh>
              <RoundedBox args={[0.16, 0.08, 0.29]} radius={0.04} position={[0.0, -0.41, 0.09]} material={materials.shirt} castShadow />
            </group>
          </group>

          <group position={[0.14, -0.15, 0.02]} ref={rightUpperLegRef} rotation={[-1.14, 0.0, -0.06]}>
            <mesh position={[0, -0.2, 0]} castShadow material={materials.shirt}>
              <cylinderGeometry args={[0.07, 0.074, 0.4, 16]} />
            </mesh>
            <group ref={rightLowerLegRef} position={[0, -0.4, 0]} rotation={[1.06, 0, 0]}>
              <mesh position={[0, -0.2, 0]} castShadow material={materials.shirt}>
                <cylinderGeometry args={[0.064, 0.068, 0.4, 16]} />
              </mesh>
              <RoundedBox args={[0.16, 0.08, 0.29]} radius={0.04} position={[0.0, -0.41, 0.09]} material={materials.shirt} castShadow />
            </group>
          </group>
        </group>
      </group>

      <pointLight ref={screenLightRef} position={[0.44, 1.0, -0.05]} color="#8bb8ff" intensity={0.85} distance={2.1} decay={2} />

      <pointLight ref={faceLightRef} position={[-0.08, 1.38, 0.18]} color="#c58cff" intensity={0.78} distance={4.5} decay={2} />
    </group>
  );
}

export default function Experience({ interactiveMode }) {
  const faceLightRef = useRef();
  const focusRef = useRef();

  return (
    <>
      <color attach="background" args={['#04050a']} />
      <fog attach="fog" args={['#04050a', 6.2, 24]} />

      <SceneRig focusRef={focusRef} faceLightRef={faceLightRef} />

      <StarField />
      <CharacterWorkspace interactiveMode={interactiveMode} faceLightRef={faceLightRef} focusRef={focusRef} />

      <Environment preset="night" blur={0.85} />
      <ambientLight intensity={0.34} color="#bccaff" />
      <hemisphereLight intensity={0.3} skyColor="#8ea6ff" groundColor="#161b26" />

      <directionalLight
        castShadow
        position={[3.8, 5.8, 3.8]}
        intensity={1.02}
        color="#ffffff"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00025}
      />

      <spotLight
        castShadow
        position={[-2.4, 3.2, 2.4]}
        intensity={0.72}
        angle={0.46}
        penumbra={0.9}
        color="#95acff"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <pointLight position={[-1.7, 1.45, -0.25]} color="#f5add7" intensity={0.28} distance={5.5} />

      <ContactShadows position={[0, -1.02, 0]} opacity={0.32} scale={5.4} blur={2.2} far={3.9} color="#000000" />
    </>
  );
}
