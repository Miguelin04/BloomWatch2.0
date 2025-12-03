🎨 Prototipo UI – BloomWatch (Stitch)

Este documento describe el flujo principal del prototipo diseñado en Stitch para la aplicación BloomWatch, junto con la especificación de cada una de las 8 pantallas requeridas: propósito, componentes principales, estructura y espacios reservados para capturas de pantalla.

🔁 1. Flujo General del Usuario

El prototipo cubre el flujo completo de interacción dentro de BloomWatch:

Inicio de Sesión → Dashboard → (Explorador de Mapas o Carga de Imagen Satelital) → Análisis de IA → Predicciones → Centro de Alertas → Configuración

Este flujo representa el recorrido natural del usuario desde su acceso a la plataforma hasta la visualización analítica, soporte a la toma de decisiones y ajustes personales del sistema.

🖼️ 2. Pantallas del Prototipo

A continuación se presentan las 8 pantallas definidas, con su descripción detallada.

🔐 Pantalla 1 – Inicio de Sesión

📌 Propósito:
Permitir el acceso seguro al sistema mediante autenticación del usuario.

🧩 Componentes principales:

Formulario: correo + contraseña

Botón Iniciar sesión

Mensajes de error / validación

Indicador de carga

Enlace “Recuperar contraseña” (opcional)

🖼️ Captura:
/docs/img/inicio de sesion.png

🏠 Pantalla 2 – Dashboard

📌 Propósito:
Funcionar como centro de mando del sistema. Provee una vista general del estado global, métricas clave y accesos a las rutas principales.

🧩 Componentes principales:

Tarjetas de métricas (cobertura, actividad reciente, alertas)

Mini-mapa global con resumen

Botones de acceso: Explorador de Mapas, Cargar Imagen, Centro de Alertas, Predicciones

Barra superior de navegación

🖼️ Captura:
/docs/img/dashboard.png

🗺️ Pantalla 3 – Explorador de Mapas

📌 Propósito:
Permitir al usuario navegar globalmente, activar capas de información y seleccionar una región de interés para su análisis.

🧩 Componentes principales:

Mapa interactivo global

Panel de filtros: fecha, nubosidad, capas

Selección de región (ROI)

Botón Analizar Región

Barra de herramientas geoespaciales (zoom, reset, capas)

🖼️ Captura:
/docs/img/explorador de mapas.png

🖼️ Pantalla 4 – Carga de Imagen Satelital

📌 Propósito:
Subir archivos GeoTIFF, RGB o imágenes satelitales para procesarlos mediante IA.

🧩 Componentes principales:

Cuadro para arrastrar/soltar archivo

Botón Subir archivo

Barra de progreso del procesamiento

Mensajes de validación (formato, tamaño, éxito)

Botón Ver Resultados al finalizar

🖼️ Captura:
/docs/img/cargar imagen satelital.png

🤖 Pantalla 5 – Análisis de IA

📌 Propósito:
Mostrar los resultados generados por la IA: comparativas, segmentación y datos analíticos descargables.

🧩 Componentes principales:

Slider “Antes / Después”

Visor de máscaras U-Net

Panel de métricas técnicas

Botón Descargar reporte

Selector de capas analizadas

🖼️ Captura:
/docs/img/analisis de IA.png

📈 Pantalla 6 – Predicciones

📌 Propósito:
Presentar tendencias futuras y análisis temporal generados mediante modelos predictivos.

🧩 Componentes principales:

Gráficos de línea y mapas de calor

Filtros temporales (rango de fechas)

Indicadores clave de tendencia

Notas o advertencias automáticas

🖼️ Captura:
/docs/img/predicciones.png

🚨 Pantalla 7 – Centro de Alertas

📌 Propósito:
Listar y priorizar alertas críticas detectadas automáticamente por el sistema.

🧩 Componentes principales:

Lista de alertas con nivel de severidad

Filtros: tipo, fecha, prioridad

Vista rápida de la ubicación en mini-mapa

Indicador de estado (activa, resuelta)

🖼️ Captura:
/docs/img/centro de alertas.png

⚙️ Pantalla 8 – Configuración

📌 Propósito:
Permitir al usuario personalizar su experiencia, idioma, notificaciones y credenciales API.

🧩 Componentes principales:

Preferencias generales (tema, idioma, notificaciones)

Gestión de API Keys

Botón Editar perfil

Botón Cerrar sesión

🖼️ Captura:
/docs/img/configuracion.png
