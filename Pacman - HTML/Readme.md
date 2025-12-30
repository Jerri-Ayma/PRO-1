# 🎮 PAC-MAN - Juego Arcade Clásico

Un juego de Pacman completamente funcional con estética retro arcade y movimiento fluido.

## 📁 Estructura del Proyecto

```
pacman-game/
│
├── index.html      # Estructura HTML del juego
├── styles.css      # Estilos y diseño visual
├── game.js         # Lógica del juego (JavaScript)
└── README.md       # Este archivo
```

## 🚀 Cómo usar

1. **Descarga todos los archivos** en la misma carpeta
2. **Abre index.html** en tu navegador web
3. **¡Juega!** Presiona "INICIAR JUEGO"

## 🎮 Controles

- **⬆️ ⬇️ ⬅️ ➡️** - Mover a Pacman
- **ESPACIO** - Pausar/Reanudar juego
- **ESC** - Reiniciar juego

## ⚙️ Características

### Jugabilidad
- ✅ Movimiento fluido y suave
- ✅ 4 fantasmas con diferentes personalidades de IA
- ✅ Power pellets que te hacen invencible
- ✅ Sistema de vidas y puntuación
- ✅ High score guardado en localStorage
- ✅ Túneles laterales para escapar

### Diseño
- 🎨 Estética neón retro-futurista
- 💡 Efectos de iluminación brillantes
- 📺 Efecto de líneas de escaneo CRT
- 🎬 Animaciones suaves
- 📱 Diseño responsive

## 🔧 Personalización

### Velocidades del juego (en `game.js`)

```javascript
// Línea ~362 - Velocidad de Pacman
this.speed = 0.08;

// Línea ~286 - Velocidad de fantasmas
this.speed = 0.06;

// Línea ~361 - Velocidad de animación de boca
this.mouthSpeed = 0.05;

// Línea ~417 - Duración del Power Mode
gameState.powerModeTimer = 380; // frames (6.3 segundos a 60fps)

// Línea ~377 - Boost de velocidad en Power Mode
let currentSpeed = gameState.powerMode ? this.speed * 1.4 : this.speed;
```

### Control de movimiento (en `game.js`)

```javascript
// Línea ~673 - Cambiar comportamiento de movimiento
const STOP_ON_KEY_RELEASE = false;

// false = Estilo clásico (sigue moviéndose hasta chocar)
// true = Se detiene al soltar la tecla
```

### Colores (en `styles.css`)

```css
/* Líneas 11-19 - Variables de colores */
:root {
    --neon-yellow: #FFE100;
    --neon-pink: #FF1493;
    --neon-cyan: #00FFFF;
    --neon-orange: #FF6B00;
    --neon-red: #FF0040;
    --deep-blue: #0a0a2e;
    --darker-blue: #050516;
    --maze-blue: #2121DE;
}
```

## 🎯 Reglas del Juego

1. **Come todos los puntos** pequeños para avanzar de nivel
2. **Evita los fantasmas** - pierdes una vida si te tocan
3. **Come power pellets** (puntos grandes) para:
   - Hacer a los fantasmas vulnerables
   - Moverte más rápido
   - Ganar puntos extra al comerlos
4. **Usa los túneles** laterales para escapar

## 📊 Sistema de Puntuación

- 🔵 Punto pequeño: **10 puntos**
- 🔴 Power pellet: **50 puntos**
- 👻 Fantasma comido: **200 puntos**

## 🐛 Solución de Problemas

### El juego no carga
- Asegúrate de que los 3 archivos estén en la misma carpeta
- Verifica que los nombres sean exactos: `index.html`, `styles.css`, `game.js`

### Movimiento muy rápido/lento
- Ajusta los valores de velocidad en `game.js` (ver sección Personalización)

### Los fantasmas son muy difíciles
- Aumenta la duración del Power Mode en línea ~417
- Reduce la velocidad de los fantasmas en línea ~286

## 💻 Compatibilidad

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Navegadores móviles

## 📝 Notas Técnicas

### Tecnologías usadas
- HTML5 Canvas para renderizado del juego
- CSS3 para animaciones y efectos visuales
- JavaScript vanilla (sin frameworks)
- localStorage para guardar high score

### Arquitectura del código
- **Clase Pacman**: Maneja movimiento y lógica del jugador
- **Clase Ghost**: IA de fantasmas con diferentes personalidades
- **Sistema de colisiones**: Detección precisa con posiciones visuales
- **Sistema de tiles**: Laberinto basado en matriz 28x31

## 🎨 Créditos

Diseñado con estética retro arcade inspirada en el Pacman clásico de 1980.

---

**¡Disfruta del juego!** 🎮👾