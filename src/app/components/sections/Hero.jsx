'use client';

import { useRef, useState, useEffect } from 'react';
import { 
  FaPlay, FaStar, FaUsers, FaVideo, FaClock, FaCertificate, 
  FaArrowRight, FaGithub, FaTwitter, FaLinkedin, FaRocket, 
  FaShieldAlt, FaAward, FaInfinity 
} from 'react-icons/fa';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import Button from '../ui/Button';

export default function Hero() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const threeContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Three.js setup with advanced effects
  useEffect(() => {
    if (!threeContainerRef.current) return;

    const container = threeContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1e);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: false, 
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    container.appendChild(renderer.domElement);

    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.3,
      0.1,
      0.1
    );
    composer.addPass(bloomPass);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404060, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 10, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x4a9eff, 1.5);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x9f7aea, 1);
    rimLight.position.set(0, -5, -5);
    scene.add(rimLight);

    // Create Main 3D Object - Helix/Torus Knot
    const mainGroup = new THREE.Group();

    // Torus Knot - Main shape
    const knotGeometry = new THREE.TorusKnotGeometry(1.5, 0.5, 128, 16);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4a9eff,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x4a9eff,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.9,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
    });
    const knot = new THREE.Mesh(knotGeometry, knotMaterial);
    knot.castShadow = true;
    mainGroup.add(knot);

    // Secondary inner knot
    const innerKnotGeometry = new THREE.TorusKnotGeometry(1.2, 0.3, 128, 16);
    const innerKnotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x9f7aea,
      metalness: 0.8,
      roughness: 0.1,
      emissive: 0x9f7aea,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.8,
      clearcoat: 0.5,
    });
    const innerKnot = new THREE.Mesh(innerKnotGeometry, innerKnotMaterial);
    innerKnot.rotation.x = Math.PI / 2;
    mainGroup.add(innerKnot);

    // Orbital rings
    const ringCount = 3;
    const rings = [];
    for (let i = 0; i < ringCount; i++) {
      const radius = 2.2 + i * 0.4;
      const ringGeometry = new THREE.TorusGeometry(radius, 0.02, 32, 64);
      const ringMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(0.6 + i * 0.1, 0.8, 0.5),
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.4,
        emissive: new THREE.Color().setHSL(0.6 + i * 0.1, 0.8, 0.5),
        emissiveIntensity: 0.1,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2 + i * 0.3;
      ring.rotation.z = i * 0.5;
      mainGroup.add(ring);
      rings.push(ring);
    }

    // Particle system - orbiting
    const particleCount = 300;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.5 + Math.random() * 1.5;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      const color = new THREE.Color().setHSL(0.6 + Math.random() * 0.3, 0.9, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = 0.02 + Math.random() * 0.06;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // Floating particles
    const floatCount = 500;
    const floatGeometry = new THREE.BufferGeometry();
    const floatPositions = new Float32Array(floatCount * 3);
    for (let i = 0; i < floatCount; i++) {
      floatPositions[i * 3] = (Math.random() - 0.5) * 15;
      floatPositions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      floatPositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    floatGeometry.setAttribute('position', new THREE.BufferAttribute(floatPositions, 3));
    const floatMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x4a9eff,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const floatParticles = new THREE.Points(floatGeometry, floatMaterial);
    scene.add(floatParticles);

    mainGroup.position.y = 0.5;
    scene.add(mainGroup);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.minPolarAngle = Math.PI / 3;
    controls.target.set(0, 0.5, 0);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      // Rotate main group
      mainGroup.rotation.y += 0.003;
      mainGroup.rotation.x = Math.sin(time * 0.2) * 0.1;
      mainGroup.rotation.z = Math.cos(time * 0.15) * 0.05;

      // Rotate individual knots
      knot.rotation.x += 0.005;
      knot.rotation.y += 0.008;
      innerKnot.rotation.y += 0.01;
      innerKnot.rotation.z += 0.005;

      // Animate rings
      rings.forEach((ring, i) => {
        ring.rotation.z += 0.005 * (i + 1);
        ring.rotation.x += 0.003 * (i + 1);
      });

      // Float particles animation
      const fPos = floatParticles.geometry.attributes.position.array;
      for (let i = 0; i < floatCount; i++) {
        fPos[i * 3 + 1] += Math.sin(time + i) * 0.0003;
        fPos[i * 3] += Math.cos(time * 0.7 + i * 0.5) * 0.0003;
        fPos[i * 3 + 2] += Math.sin(time * 0.5 + i * 0.3) * 0.0003;
      }
      floatParticles.geometry.attributes.position.needsUpdate = true;

      controls.update();
      composer.render();
    };

    animate();

    // Resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  // Scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.9, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Mouse tracking
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseX(x);
    setMouseY(y);
  };

  const handleMouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
  };

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [-8, 8]);
  const cardScale = useTransform(springX, [-0.5, 0.5], [0.98, 1.02]);

  // Stagger animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0f1e] flex items-center"
      style={{ y, opacity, scale }}
    >
      {/* Three.js Container */}
      <div 
        ref={threeContainerRef} 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e] via-[#0a0f1e]/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
      >
        <span className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400/60">Scroll to explore</span>
        <motion.div
          className="w-[2px] h-16 bg-gradient-to-b from-blue-400/50 to-transparent rounded-full"
          animate={{ y: [0, 12, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
                <span className="text-sm font-medium text-blue-300/90">
                  <FaRocket className="inline mr-2 text-blue-400" />
                  AI-powered learning paths
                </span>
              </div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              <span className="text-white">Master the</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Future of Tech</span>
              <br />
              <span className="text-white">With Expert Guidance</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-lg leading-relaxed">
              Join 2000+ premium courses taught by industry experts. Master new skills and advance your career with our interactive 3D learning platform.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button
                href="#"
                icon={FaPlay}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-blue-600/30 hover:shadow-purple-600/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 font-semibold text-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaPlay className="text-sm" />
                  Start Learning Free
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Button>
              <Button
                href="#"
                variant="outline"
                icon={FaArrowRight}
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 font-semibold text-lg"
              >
                Explore Courses
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
              <div>
                <div className="text-2xl font-bold text-white">2000+</div>
                <div className="text-sm text-gray-400">Premium Courses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">4.9/5</div>
                <div className="text-sm text-gray-400">Average Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">12K+</div>
                <div className="text-sm text-gray-400">Students</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-3">
                {[
                  { initial: 'A', gradient: 'from-blue-400 to-blue-600' },
                  { initial: 'B', gradient: 'from-purple-400 to-purple-600' },
                  { initial: 'C', gradient: 'from-pink-400 to-pink-600' },
                  { initial: 'D', gradient: 'from-indigo-400 to-indigo-600' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.gradient} border-2 border-[#0a0f1e] flex items-center justify-center text-white font-bold text-sm shadow-xl shadow-purple-500/20`}
                    whileHover={{ scale: 1.2, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {item.initial}
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 + i * 0.08 }}
                  >
                    <FaStar className="drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT - Premium Course Card */}
          <motion.div
            variants={itemVariants}
            className="relative [perspective:1200px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              ref={cardRef}
              className="relative [transform-style:preserve-3d]"
              style={{
                rotateY: rotateY,
                rotateX: rotateX,
                scale: cardScale
              }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
            >
              {/* Glow effects */}
              <motion.div
                className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/50">
                <div className="absolute -top-4 -right-4 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-gradient-to-tr from-pink-500/20 to-indigo-500/20 rounded-full blur-3xl"></div>

                <div className="relative bg-gradient-to-br from-[#111a2e] to-[#0a1222] rounded-2xl p-8 border border-white/5 shadow-inner">
                  {/* Featured Badge */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-amber-500/30">
                    FEATURED
                  </div>

                  {/* Card Header */}
                  <motion.div
                    className="flex items-center gap-4 mb-6"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/30"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <FaVideo className="text-white text-2xl" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Complete Web 3.0</h3>
                      <p className="text-sm text-gray-400">12 modules · 45 hours</p>
                    </div>
                  </motion.div>

                  {/* Card Details */}
                  <div className="space-y-3">
                    {[
                      { icon: FaUsers, text: '3,200+ students enrolled' },
                      { icon: FaClock, text: 'Lifetime access' },
                      { icon: FaCertificate, text: 'Certificate included' },
                      { icon: FaShieldAlt, text: 'Money-back guarantee' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 text-sm bg-white/5 hover:bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/5 transition-all duration-300 group cursor-pointer"
                        whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.08)' }}
                      >
                        <item.icon className="text-blue-400 group-hover:text-blue-300 transition-colors text-base" />
                        <span className="text-gray-300 font-medium">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <motion.div
                    className="mt-8 flex items-center justify-between pt-6 border-t border-white/5"
                    whileHover={{ y: -2 }}
                  >
                    <div>
                      <span className="text-4xl font-black text-white">$49</span>
                      <span className="text-lg font-medium text-gray-400 line-through ml-3">$99</span>
                      <span className="ml-3 text-sm text-green-400 font-semibold bg-green-400/10 px-3 py-1 rounded-full">Save 50%</span>
                    </div>
                    <motion.a
                      href="#"
                      className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3.5 rounded-xl font-semibold shadow-xl shadow-blue-600/30 hover:shadow-purple-600/40 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">Enroll Now</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    </motion.a>
                  </motion.div>

                  {/* Progress */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>Course Progress</span>
                      <span>68% complete</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '68%' }}
                        transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                className="absolute -top-10 -right-6 bg-gradient-to-br from-amber-400 to-orange-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-xl shadow-amber-500/30 backdrop-blur-sm"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🔥 Best Seller
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -left-6 bg-gradient-to-br from-emerald-400 to-teal-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-xl shadow-emerald-500/30 backdrop-blur-sm"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                ⚡ Updated Monthly
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                className="absolute -left-4 top-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500 to-purple-600 text-white p-2 rounded-full shadow-xl shadow-blue-500/30"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaAward className="text-lg" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}