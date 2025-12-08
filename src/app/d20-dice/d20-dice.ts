import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

@Component({
  selector: 'app-d20-dice',
  standalone: true,
  imports: [],
  templateUrl: './d20-dice.html',
  styleUrl: './d20-dice.css',
})
export class D20Dice implements AfterViewInit, OnDestroy {
  @ViewChild('rendererCanvas', { static: true })
  rendererCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() maxNumber = 20; // Allow customizing the max roll value
  @Input() hideControls = false; // Allow hiding built-in controls
  @Output() rollComplete = new EventEmitter<number>();

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private diceMesh!: THREE.Mesh;
  private animationFrameId: number | null = null;

  isRolling = false;
  lastResult: number | null = null;

  // Для анімації
  private rollStartTime = 0;
  private rollDuration = 2000; // Increased to 2000ms for better viewing
  private startRotation = new THREE.Euler();
  private targetRotation = new THREE.Euler();
  private pendingResult: number | null = null;

  // D20 face normals for positioning numbers correctly
  private faceNormals: THREE.Vector3[] = [];
  private numberSprites: THREE.Sprite[] = [];
  private faceInfos: { center: THREE.Vector3; normal: THREE.Vector3 }[] = [];

  ngAfterViewInit(): void {
    // Use setTimeout to ensure canvas has proper dimensions
    setTimeout(() => {
      this.initScene();
      this.startRenderLoop();
      // Trigger initial render and resize
      setTimeout(() => {
        this.onWindowResize();
      }, 100);
    }, 0);
    window.addEventListener('resize', this.onWindowResize);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onWindowResize);
    this.renderer?.dispose();
  }

  // --- ПУБЛІЧНИЙ МЕТОД ДЛЯ КНОПКИ ---
  roll(): void {
    if (this.isRolling) return;

    this.isRolling = true;
    this.lastResult = null;

    this.pendingResult = this.randomInt(1, this.maxNumber);

    this.rollStartTime = performance.now();
    this.startRotation.copy(this.diceMesh.rotation);

    const targetFaceRotation = this.getRotationForNumber(this.pendingResult);

    const extraSpins = 4 + Math.random() * 2;
    this.targetRotation.set(
      targetFaceRotation.x + Math.PI * 2 * extraSpins,
      targetFaceRotation.y + Math.PI * 2 * extraSpins,
      targetFaceRotation.z + Math.PI * 2 * extraSpins
    );
  }

  // Calculate rotation needed to show a specific number face-up
  private getRotationForNumber(number: number): THREE.Euler {
    if (!this.faceInfos.length) {
      // на всякий випадок
      return new THREE.Euler(0, 0, 0);
    }

    // просте зіставлення: число 1 -> грань 0, 2 -> грань 1, ...
    const faceIndex = (number - 1) % this.faceInfos.length;
    const faceNormal = this.faceInfos[faceIndex].normal.clone().normalize();

    // напрямок на камеру (камера дивиться з +Z на (0,0,0))
    const targetNormal = new THREE.Vector3(0, 0, 1);

    const q = new THREE.Quaternion().setFromUnitVectors(faceNormal, targetNormal);
    const euler = new THREE.Euler().setFromQuaternion(q, 'XYZ');

    return euler;
  }

  // --- ІНІЦІАЛІЗАЦІЯ СЦЕНИ ---

  private initScene(): void {
    const canvas = this.rendererCanvas.nativeElement;
    const parent = canvas.parentElement;
    const width = parent?.clientWidth || canvas.clientWidth || 400;
    const height = parent?.clientHeight || canvas.clientHeight || 400;

    console.log('Initializing dice scene with dimensions:', width, height);

    // Сцена
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#111111');

    // Камера
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 6);

    // Рендерер
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Світло
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    this.scene.add(dirLight);

    // D20 (ікосаедр)
    const geometry = new THREE.IcosahedronGeometry(1, 0);

    const material = new THREE.MeshStandardMaterial({
      color: 0x8b0000, // темно-червоний
      metalness: 0.4,
      roughness: 0.3,
    });

    this.diceMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.diceMesh);

    console.log('Dice mesh created and added to scene');

    // Контур для більшої читабельності
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const lineSegments = new THREE.LineSegments(edges, lineMaterial);
    this.diceMesh.add(lineSegments);

    // Add numbers to each face
    this.addNumbersToFaces();

    console.log('Dice initialization complete');
  }

  // Add number sprites to each face of the d20
  private addNumbersToFaces(): void {
    const geometry = this.diceMesh.geometry as THREE.BufferGeometry;

    const positionAttr = geometry.getAttribute('position');
    const index = geometry.getIndex();

    if (!positionAttr || !index) {
      console.error('Position or index attribute not found on geometry');
      return;
    }

    const faces: { center: THREE.Vector3; normal: THREE.Vector3 }[] = [];

    for (let i = 0; i < index.count; i += 3) {
      const i1 = index.getX(i);
      const i2 = index.getX(i + 1);
      const i3 = index.getX(i + 2);

      const v1 = new THREE.Vector3(
        positionAttr.getX(i1),
        positionAttr.getY(i1),
        positionAttr.getZ(i1)
      );
      const v2 = new THREE.Vector3(
        positionAttr.getX(i2),
        positionAttr.getY(i2),
        positionAttr.getZ(i2)
      );
      const v3 = new THREE.Vector3(
        positionAttr.getX(i3),
        positionAttr.getY(i3),
        positionAttr.getZ(i3)
      );

      const center = new THREE.Vector3().add(v1).add(v2).add(v3).divideScalar(3);
      const edge1 = new THREE.Vector3().subVectors(v2, v1);
      const edge2 = new THREE.Vector3().subVectors(v3, v1);
      const normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize();

      faces.push({ center, normal });
    }

    this.faceInfos = faces; // збережемо для getRotationForNumber
    this.numberSprites = [];

    for (let i = 0; i < 20 && i < faces.length; i++) {
      const number = i + 1;
      const face = faces[i];

      // малюємо текст
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      ctx.clearRect(0, 0, 256, 256);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 160px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(number.toString(), 128, 140);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: true,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMaterial);

      // ВАЖЛИВО: витягуємо спрайт НАЗОВНІ
      const centerOnSurface = face.center.clone().normalize().multiplyScalar(1.1);
      const offset = face.normal.clone().multiplyScalar(0.1);
      sprite.position.copy(centerOnSurface.add(offset));

      sprite.scale.set(0.6, 0.6, 1);

      this.diceMesh.add(sprite);
      this.numberSprites.push(sprite);
    }

    console.log(`Added ${this.numberSprites.length} number sprites to dice`);
  }

  // --- РЕНДЕР-ЦИКЛ ---

  private startRenderLoop = () => {
    const render = (time: number) => {
      // Якщо йде кидок – анімуємо від поточного до цільового обертання
      if (this.isRolling) {
        const elapsed = time - this.rollStartTime;
        let t = elapsed / this.rollDuration;
        if (t >= 1) {
          t = 1;
          this.isRolling = false;

          // Після завершення – показуємо результат
          if (this.pendingResult !== null) {
            this.lastResult = this.pendingResult;
            this.rollComplete.emit(this.pendingResult);
          }
        }

        // easing (легке уповільнення в кінці)
        const eased = this.easeOutCubic(t);

        this.diceMesh.rotation.x =
          this.startRotation.x + (this.targetRotation.x - this.startRotation.x) * eased;
        this.diceMesh.rotation.y =
          this.startRotation.y + (this.targetRotation.y - this.startRotation.y) * eased;
        this.diceMesh.rotation.z =
          this.startRotation.z + (this.targetRotation.z - this.startRotation.z) * eased;
      } else {
        // Легка повільна анімація, коли кубик просто "живе"
        this.diceMesh.rotation.y += 0.002;
        this.diceMesh.rotation.x += 0.001;
      }

      this.renderer.render(this.scene, this.camera);
      this.animationFrameId = requestAnimationFrame(render);
    };

    this.animationFrameId = requestAnimationFrame(render);
  };

  // --- РЕСАЙЗ ---

  private onWindowResize = () => {
    if (!this.renderer || !this.camera || !this.rendererCanvas) return;

    const canvas = this.rendererCanvas.nativeElement;
    const parent = canvas.parentElement;
    const width = parent?.clientWidth || canvas.clientWidth || 400;
    const height = parent?.clientHeight || canvas.clientHeight || 400;

    console.log('Resizing dice canvas:', width, height);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  // --- ХЕЛПЕРИ ---

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }
}
