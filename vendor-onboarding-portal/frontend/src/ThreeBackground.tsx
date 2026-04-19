import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ThreeBackground() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mount = mountRef.current!
        const w = mount.clientWidth
        const h = mount.clientHeight

        // Scene
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000)
        camera.position.z = 30

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(w, h)
        renderer.setPixelRatio(window.devicePixelRatio)
        mount.appendChild(renderer.domElement)

        // Floating particles
        const particleCount = 180
        const positions = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 80
        }
        const particleGeo = new THREE.BufferGeometry()
        particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
        const particleMat = new THREE.PointsMaterial({
            color: 0x6366f1,
            size: 0.35,
            transparent: true,
            opacity: 0.7,
        })
        const particles = new THREE.Points(particleGeo, particleMat)
        scene.add(particles)

        // Wireframe torus knot
        const torusGeo = new THREE.TorusKnotGeometry(6, 1.8, 120, 18)
        const torusMat = new THREE.MeshBasicMaterial({
            color: 0x818cf8,
            wireframe: true,
            transparent: true,
            opacity: 0.18,
        })
        const torus = new THREE.Mesh(torusGeo, torusMat)
        scene.add(torus)

        // Icosahedron
        const icoGeo = new THREE.IcosahedronGeometry(4, 1)
        const icoMat = new THREE.MeshBasicMaterial({
            color: 0xa5b4fc,
            wireframe: true,
            transparent: true,
            opacity: 0.13,
        })
        const ico = new THREE.Mesh(icoGeo, icoMat)
        ico.position.set(18, -8, -10)
        scene.add(ico)

        // Mouse parallax
        let mouseX = 0, mouseY = 0
        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2
        }
        window.addEventListener("mousemove", onMouseMove)

        // Resize
        const onResize = () => {
            const nw = mount.clientWidth
            const nh = mount.clientHeight
            camera.aspect = nw / nh
            camera.updateProjectionMatrix()
            renderer.setSize(nw, nh)
        }
        window.addEventListener("resize", onResize)

        let frameId: number
        const animate = () => {
            frameId = requestAnimationFrame(animate)
            const t = Date.now() * 0.001

            torus.rotation.x = t * 0.18
            torus.rotation.y = t * 0.12

            ico.rotation.x = t * 0.1
            ico.rotation.z = t * 0.14

            particles.rotation.y = t * 0.04

            // Subtle camera parallax
            camera.position.x += (mouseX * 4 - camera.position.x) * 0.03
            camera.position.y += (-mouseY * 4 - camera.position.y) * 0.03
            camera.lookAt(scene.position)

            renderer.render(scene, camera)
        }
        animate()

        return () => {
            cancelAnimationFrame(frameId)
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("resize", onResize)
            renderer.dispose()
            mount.removeChild(renderer.domElement)
        }
    }, [])

    return (
        <div
            ref={mountRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                background: "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 50%, #0f0c29 100%)",
            }}
        />
    )
}
