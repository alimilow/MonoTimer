# MonoTimer — Sequential & Simple Timer for Windows 11

**MonoTimer** es una aplicación de escritorio moderna, fluida y ligera para **Windows 11**

---

## ✨ Características Principales

- **Temporizador Secuencial Multibloque**:
  - Configura secuencias por bloques (ej. *10 min Actividad → 1 min Descanso → 10 min Actividad*).
  - Categorías universales: Actividad, Enfoque, Ejercicio, Descanso, Preparación o **etiquetas personalizadas**.
  - Transiciones configurables: automática al terminar o pausa en espera de confirmación.
- **Temporizador Simple (Un solo tiempo)**:
  - Apartado independiente con configuración directa de horas, minutos y segundos.
  - Ajustes rápidos (1m, 5m, 10m, 15m, 25m, 30m, etc.) y modo repetición continua (Loop).
- **Atajos de Teclado Globales (Windows 11 Win32 Hotkeys)**:
  - Funcionan dentro de cualquier juego o aplicación sin necesidad de hacer Alt+Tab:
    - `Alt + P`: Iniciar / Pausar / Confirmar siguiente bloque.
    - `Alt + N`: Saltar al siguiente bloque.
    - `Alt + R`: Reiniciar bloque actual.
    - `Alt + M`: Alternar Modo Compacto / Siempre Visible.
- **Modo Compacto Flotante (*Always on Top*)**:
  - Transforma la ventana con un clic o con `Alt + M` en un mini widget HUD superpuesto en pantalla.
- **9 Paletas de Colores**:
  - Incluye *Blanco Monocromático*, *Negro Puro (OLED Dark)*, *Grafito*, *Azul Océano*, *Azul Cobalto*, *Verde Esmeralda*, *Lavanda*, *Ámbar Dorado* y *Rosa Carmesí*.
- **Alertas de Sonido Sintetizadas**:
  - Sintetizadas con la Web Audio API (sin dependencias de archivos de audio externos).
  - Incluye aviso con bips en los últimos 3 segundos (3, 2, 1).
- **Soporte Multilenguaje**:
  - Cambio en vivo e instantáneo entre **Español** e **Inglés**.

---

## 🛠️ Tecnologías

- **Plataforma**: Windows 11 / Windows 10
- **Host Desktop**: .NET 10 (C# / WinForms) + Microsoft Edge WebView2 Runtime
- **Frontend**: HTML5, CSS3 Moderno (@starting-style, CSS Tokens Material 3), JavaScript Vanilla (Web Audio API)
- **Windows APIs**: Win32 `user32.dll` (`RegisterHotKey`), `dwmapi.dll` (Esquinas redondeadas DWM)

---

## 🚀 Compilación y Ejecución

### Requisitos
- Windows 10 / 11 con WebView2 Runtime instalado (viene de serie en Windows 11).
- [.NET 10.0 SDK](https://dotnet.microsoft.com/) para compilar desde el código fuente.

### Compilar desde la terminal
```powershell
dotnet build KovaaksTimer.csproj -c Release -o dist
```

### Ejecutar
Puedes ejecutar directamente `dist/KovaaksSequentialTimer.exe` o usar el script:
```powershell
.\Iniciar-MonoTimer.bat
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

**Autor**: alimilow
