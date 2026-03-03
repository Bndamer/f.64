-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-03-2026 a las 17:59:47
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `camaras`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accesorios`
--

CREATE TABLE `accesorios` (
  `idAccesorios` int(11) NOT NULL,
  `nombreAccesorios` varchar(100) NOT NULL,
  `descripcionAccesorios` text DEFAULT NULL,
  `tipoAccesorios` varchar(50) DEFAULT NULL,
  `precioAccesorios` decimal(10,2) DEFAULT NULL,
  `fk_marcas` int(11) DEFAULT NULL,
  `imagenAccesorios` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `accesorios`
--

INSERT INTO `accesorios` (`idAccesorios`, `nombreAccesorios`, `descripcionAccesorios`, `tipoAccesorios`, `precioAccesorios`, `fk_marcas`, `imagenAccesorios`) VALUES
(10, 'Parasol Nikon d-23', 'Parasol compatible con lentes zoom', 'Parasol', 18.00, 1, '01.webp'),
(11, 'Parasol Nikon f-27', 'Parasol compatible con lentes angular', 'Parasol', 15.00, 1, '02.webp'),
(12, 'Difusor Nikon e3', 'Difusor rigido compatible con flashes Nikon', 'Difusor', 9.00, 1, '03.jpg'),
(14, 'Batería Canon LP-E6N', 'Batería recargable para cámaras Canon', 'Batería', 45.00, 2, '04.jpg'),
(15, 'Filtro UV 52mm', 'Filtro de protección UV para lentes de 52mm', 'Filtro', 10.00, 3, '05.jpg'),
(19, 'Tamron ', 'v5556', 'Parasol', 12.00, 3, '1771968916616.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camaras`
--

CREATE TABLE `camaras` (
  `idCamaras` int(11) NOT NULL,
  `modeloCamaras` varchar(100) NOT NULL,
  `tipoCamaras` varchar(50) DEFAULT NULL,
  `sensorCamaras` varchar(50) DEFAULT NULL,
  `resolucionCamaras` decimal(5,2) DEFAULT NULL,
  `isoMinCamaras` int(11) DEFAULT NULL,
  `isoMaxCamaras` int(11) DEFAULT NULL,
  `marca_id` int(11) DEFAULT NULL,
  `precioCamaras` decimal(10,2) DEFAULT NULL,
  `imagenCamaras` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `camaras`
--

INSERT INTO `camaras` (`idCamaras`, `modeloCamaras`, `tipoCamaras`, `sensorCamaras`, `resolucionCamaras`, `isoMinCamaras`, `isoMaxCamaras`, `marca_id`, `precioCamaras`, `imagenCamaras`) VALUES
(11, 'Nikon D7500', 'DSLR', 'APS-C', 20.90, 150, 51200, 1, 1200.00, 'd7500.jpg'),
(12, 'Canon EOS R5', 'Mirrorless', 'Full-frame', 45.00, 100, 51200, 2, 3900.00, 'r5.jpg'),
(13, 'Sony A7 III', 'Mirrorless', 'Full-frame', 24.20, 100, 51200, 3, 2000.00, 'a7iii.jpg'),
(14, 'Nikon Z6 II', 'Mirrorless', 'Full Frame', 24.50, 100, 51200, 1, 2000.00, 'z6ii.jpg'),
(15, 'Canon EOS M50 Mark II', 'Mirrorless', 'APS-C', 24.10, 100, 25600, 2, 700.00, 'm50.jpg'),
(16, 'Nikon D5600', 'DSRL', 'APS-C', 14.00, 100, 25600, 3, 800.00, 'd5600.jpg'),
(17, 'Nikon D850', 'DSLR', 'Full Frame', 45.70, 64, 25600, 1, 3000.00, 'd850.jpg'),
(18, 'Canon EOS 90D', 'DSLR', 'APS-C', 32.50, 100, 51200, 2, 1200.00, '90d.webp'),
(19, 'Sony A7R IV', 'Mirrorless', 'Full Frame', 61.00, 100, 32000, 3, 3500.00, 'a7riv.jpg'),
(20, 'Nikon Z7 II', 'Mirrorless', 'Full Frame', 45.70, 64, 25600, 1, 3000.00, 'z7ii.jpg'),
(21, 'Canon EOS Rebel T7', 'DSLR', 'APS-C', 24.10, 100, 6400, 2, 400.00, 't7.jpg'),
(24, 'sony', '234', '1', 1.00, 1, 1, 1, 1.00, '1769207003519.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios_fotos`
--

CREATE TABLE `comentarios_fotos` (
  `id` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `fk_galeria` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desafios`
--

CREATE TABLE `desafios` (
  `idDesafio` int(11) NOT NULL,
  `nombreDesafio` varchar(100) NOT NULL,
  `consignaDesafio` text NOT NULL,
  `nivelDificultad` enum('Fácil','Medio','Difícil') DEFAULT 'Medio',
  `tiempoVigenciaDias` int(11) NOT NULL,
  `premioDesafio` varchar(150) DEFAULT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `desafios`
--

INSERT INTO `desafios` (`idDesafio`, `nombreDesafio`, `consignaDesafio`, `nivelDificultad`, `tiempoVigenciaDias`, `premioDesafio`, `fechaCreacion`) VALUES
(1, 'Claroscuro: El Legado de Rembrandt', 'Lograr un retrato utilizando una sola fuente de luz lateral a 45 grados (estilo Rembrandt)...', 'Fácil', 10, 'Insignia Digital Maestro de la Luz', '2026-01-27 19:38:43'),
(2, 'Compresión Urbana', 'Realizar una fotografía urbana utilizando una focal mayor a 200mm...', 'Difícil', 30, 'Libro digital: Secretos de la Óptica', '2026-01-27 19:38:43'),
(5, 'Explorador Urbano', 'Captura una escena cotidiana en la ciudad que transmita emocion o historia sin utilizar edicion digital.', 'Fácil', 10, '40', '2026-03-01 04:24:35'),
(6, 'Juego de Sombras', 'Realiza una fotografia donde las sombras sean el elemento principal de la composicion.', 'Medio', 7, '60', '2026-03-01 04:25:36'),
(7, 'Colores de la Naturaleza', 'Toma una fotografia destacando al menos tres colores predominantes presentes en un entorno natural.', 'Medio', 14, '30', '2026-03-01 04:25:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evidencias_desafio`
--

CREATE TABLE `evidencias_desafio` (
  `idEvidencia` int(11) NOT NULL,
  `fkInscripcion` int(11) NOT NULL,
  `nombreArchivo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fechaSubida` datetime DEFAULT current_timestamp(),
  `estado` enum('pendiente','aprobada','rechazada') DEFAULT 'pendiente',
  `observacionAdmin` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evidencias_desafio`
--

INSERT INTO `evidencias_desafio` (`idEvidencia`, `fkInscripcion`, `nombreArchivo`, `descripcion`, `fechaSubida`, `estado`, `observacionAdmin`) VALUES
(1, 1, 'evi_1.webp', 'Primera parte del desafío completada', '2026-02-27 20:12:07', 'pendiente', 'me gusto tu trabajo!'),
(2, 2, 'evi_2.avif', 'Entrega final del desafío', '2026-02-27 20:12:39', 'aprobada', 'Buen trabajo, cumple con lo solicitado.'),
(3, 1, '1772331672603.png', NULL, '2026-02-28 23:21:12', 'pendiente', NULL),
(4, 1, '1772331706628.png', NULL, '2026-02-28 23:21:46', 'pendiente', NULL),
(5, 4, '1772335877206.jpg', 'descripcion 1', '2026-03-01 00:31:17', 'pendiente', NULL),
(6, 9, '1772340596114.jpg', 'comentario 1', '2026-03-01 01:49:56', 'pendiente', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotografos`
--

CREATE TABLE `fotografos` (
  `idFotografo` int(11) NOT NULL,
  `nombreCompleto` varchar(100) NOT NULL,
  `nacionalidad` varchar(50) DEFAULT NULL,
  `anioNacimiento` smallint(5) DEFAULT NULL,
  `anioFallecimiento` smallint(5) DEFAULT NULL,
  `estiloFotografico` varchar(100) DEFAULT NULL,
  `biografia` text DEFAULT NULL,
  `imagenFotografo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fotografos`
--

INSERT INTO `fotografos` (`idFotografo`, `nombreCompleto`, `nacionalidad`, `anioNacimiento`, `anioFallecimiento`, `estiloFotografico`, `biografia`, `imagenFotografo`) VALUES
(1, 'Annie Leibovitz', 'Estados Unidos', 1945, 2, 'Retrato editorial', 'Famosa por sus retratos de celebridades para revistas como Vanity Fair y Rolling Stone. Estilo teatral y escenificado.', 'leibovitz.jpg'),
(2, 'Dorothea Lange', 'Estados Unidos', 3, 4, 'Documental', 'Reconocida por sus retratos de la Gran Depresión. Su foto \"Migrant Mother\" es un ícono del fotoperiodismo.', 'lange.jpg'),
(3, 'David LaChapelle', 'Estados Unidos', 5, 6, 'Fotografía artística y publicitaria', 'Conocido por su estilo saturado, surrealista y barroco. Ha trabajado con celebridades y campañas de alto impacto.', 'lachapelle.jpg'),
(4, 'Mario Testino', 'Perú', 7, 8, 'Moda y retrato', 'Uno de los fotógrafos de moda más influyentes. Ha trabajado con Vogue, Vanity Fair y la realeza británica.', 'testino.jpg'),
(5, 'Henri Cartier-Bresson', 'Francia', 9, 10, 'Fotografía callejera', 'Pionero del \"momento decisivo\", cofundador de la agencia Magnum. Estilo documental con gran precisión compositiva.', 'cartier_bresson.jpg'),
(6, 'Steve McCurry', 'Estados Unidos', 11, 12, 'Fotoperiodismo', 'Famoso por su retrato \"La niña afgana\". Ha cubierto conflictos y culturas alrededor del mundo.', 'mccurry.jpg'),
(7, 'Robert Capa', 'Hungría', 13, 14, 'Fotoperiodismo bélico', 'Fotógrafo de guerra y cofundador de Magnum Photos. Documentó cinco guerras distintas.', 'capa.jpg'),
(8, 'Sebastião Salgado', 'Brasil', 15, 16, 'Documental y humanista', 'Conocido por sus series sobre migración, pobreza y naturaleza. Enfocado en la condición humana.', 'salgado.jpg'),
(9, 'Vivian Maier', 'Estados Unidos', 17, 18, 'Fotografía callejera', 'Niñera que documentó la vida urbana de Chicago y Nueva York. Su trabajo fue descubierto post mortem.', 'maier.webp'),
(10, 'Diane Arbus', 'Estados Unidos', 19, 20, 'Retrato psicológico', 'Exploró lo marginal y lo extraño. Su obra es inquietante y profundamente humana.', 'arbus.jpg'),
(11, 'Richard Avedon', 'Estados Unidos', 21, 22, 'Moda y retrato', 'Revolucionó la fotografía de moda con dinamismo. Retrató a figuras emblemáticas del siglo XX.', 'avedon.webp'),
(12, 'Helmut Newton', 'Alemania', 23, 24, 'Moda y erotismo', 'Conocido por sus imágenes provocadoras y estilizadas. Marcó una época en la fotografía de moda.', 'newton.jpg'),
(13, 'Gordon Parks', 'Estados Unidos', 25, 26, 'Documental y retrato', 'Primer fotógrafo afroamericano en Life. Documentó temas raciales y sociales.', 'parks.jpg'),
(14, 'Man Ray', 'Estados Unidos', 27, 28, 'Experimental y surrealismo', 'Pionero del dadaísmo y surrealismo en fotografía. Innovador en técnicas como la solarización.', 'manray.jpg'),
(15, 'Irving Penn', 'Estados Unidos', 29, 30, 'Moda y retrato', 'Reconocido por su trabajo con Vogue. Retratos simples y elegantes, con atención al detalle.', 'penn.webp'),
(16, 'Dorothea Lange', 'Estadounidense', 1562, 2025, 'Documental, Humanista', 'hghghghghg', '1769207134600.jpg'),
(21, 'abc', 'abc', 1990, 2024, 'unike', 'acavfvc', '1769207079213.jpg'),
(25, '112233', 'ucrania', 1980, 2022, 'barroco', 'cxvcxvcx', '1771978579536.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotografos_camaras`
--

CREATE TABLE `fotografos_camaras` (
  `id` int(11) NOT NULL,
  `idFotografo` int(11) DEFAULT NULL,
  `idCamara` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotografos_lentes`
--

CREATE TABLE `fotografos_lentes` (
  `id` int(11) NOT NULL,
  `idFotografo` int(11) NOT NULL,
  `idLente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotografos_tecnicas`
--

CREATE TABLE `fotografos_tecnicas` (
  `id` int(11) NOT NULL,
  `idFotografo` int(11) NOT NULL,
  `idTecnica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `galeria_fotos`
--

CREATE TABLE `galeria_fotos` (
  `idGaleria` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `imagenGaleria` varchar(255) NOT NULL,
  `descripcionGaleria` text DEFAULT NULL,
  `fecha_subidaGaleria` datetime DEFAULT current_timestamp(),
  `fk_camara` int(11) DEFAULT NULL,
  `fk_lente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `galeria_fotos`
--

INSERT INTO `galeria_fotos` (`idGaleria`, `fk_usuario`, `imagenGaleria`, `descripcionGaleria`, `fecha_subidaGaleria`, `fk_camara`, `fk_lente`) VALUES
(6, 15, '001.jpg', 'Retrato en luz natural utilizando ventana lateral para generar volumen y sombras suaves.', '2026-02-10 18:45:00', 16, NULL),
(7, 15, '002.jpg', 'Captura de paisaje al atardecer con larga exposición para suavizar el agua y resaltar el cielo.', '2026-02-11 19:10:00', NULL, NULL),
(8, 15, '005.webp', 'Fotografía urbana en blanco y negro buscando contraste fuerte y geometría en la composición.', '2026-02-12 16:30:00', 11, 14),
(9, 15, '003.jpg', 'Fotografía macro enfocada en texturas naturales con profundidad de campo reducida.', '2026-02-14 11:20:00', 17, 10),
(10, 2, '004.webp', 'Retrato estilo claroscuro inspirado en iluminación clásica con una sola fuente de luz lateral.', '2026-02-15 20:05:00', NULL, NULL),
(13, 15, '1771957260756.jpg', 'prueba 356', '2026-02-24 15:21:00', 20, 13),
(19, 38, '1771975388650.jpg', 'prueba 2', '2026-02-24 20:23:08', 21, 11),
(20, 38, '1771975407614.jpg', 'prueba 3', '2026-02-24 20:23:27', 21, 9),
(21, 38, '1771975433512.jpg', 'prueba 4', '2026-02-24 20:23:53', 18, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `galeria_tecnicas`
--

CREATE TABLE `galeria_tecnicas` (
  `idGaleriaTecnica` int(11) NOT NULL,
  `fk_galeria` int(11) NOT NULL,
  `fk_tecnica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `galeria_tecnicas`
--

INSERT INTO `galeria_tecnicas` (`idGaleriaTecnica`, `fk_galeria`, `fk_tecnica`) VALUES
(6, 13, 2),
(14, 19, 3),
(15, 20, 14),
(19, 21, 7),
(20, 21, 11),
(23, 8, 13),
(24, 9, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE `inscripciones` (
  `idInscripcion` int(11) NOT NULL,
  `fkUsuario` int(11) NOT NULL,
  `fkDesafio` int(11) NOT NULL,
  `fechaInscripcion` datetime DEFAULT current_timestamp(),
  `estado` enum('activo','completado','abandonado') DEFAULT 'activo',
  `progreso` tinyint(3) UNSIGNED DEFAULT 0,
  `puntosObtenidos` int(10) UNSIGNED DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`idInscripcion`, `fkUsuario`, `fkDesafio`, `fechaInscripcion`, `estado`, `progreso`, `puntosObtenidos`) VALUES
(1, 1, 1, '2026-02-27 18:21:43', 'activo', 25, 50),
(2, 2, 1, '2026-02-27 18:21:43', 'completado', 100, 200),
(3, 3, 2, '2026-02-27 18:21:43', 'activo', 60, 120),
(4, 1, 2, '2026-03-01 00:27:10', 'activo', 0, 0),
(9, 15, 2, '2026-03-01 01:21:21', 'activo', 0, 0),
(11, 15, 5, '2026-03-01 01:49:37', 'activo', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lentes`
--

CREATE TABLE `lentes` (
  `idLentes` int(11) NOT NULL,
  `modeloLentes` varchar(100) DEFAULT NULL,
  `tipoLentes` varchar(50) DEFAULT NULL,
  `aperturaMinLentes` decimal(4,2) DEFAULT NULL,
  `aperturaMaxLentes` decimal(4,2) DEFAULT NULL,
  `distanciaFocalLentes` varchar(10) NOT NULL,
  `marca_id` int(11) DEFAULT NULL,
  `precioLentes` decimal(10,2) DEFAULT NULL,
  `descripcionLentes` text NOT NULL,
  `imagenLentes` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lentes`
--

INSERT INTO `lentes` (`idLentes`, `modeloLentes`, `tipoLentes`, `aperturaMinLentes`, `aperturaMaxLentes`, `distanciaFocalLentes`, `marca_id`, `precioLentes`, `descripcionLentes`, `imagenLentes`) VALUES
(7, 'Nikon 27-70 2.8', 'Prime Zoom Luminoso', 2.50, 54.00, '27-70', 1, 450.00, 'Súper estable y siempre listo, el lente AF-S NIKKOR 24-70mm f/2.8G ED VR está preparado para llevar su trabajo al próximo nivel. Con una estabilización de imagen con VR (Reducción de la Vibración) de hasta 4 pasos*, capture imágenes fijas a pulso que sean nítidas y estables', 'n24_70f2.8.png'),
(8, 'Canon EF 50mm f/1.8 STM', 'Prime', 1.80, 16.00, '50', 2, 125.00, 'Conocido como el “nifty fifty”, este lente es una joya económica en el ecosistema Canon. Su apertura de f/1.8 ofrece un desenfoque suave y excelente rendimiento en situaciones de poca luz. Es ideal para retratos, callejera y video gracias a su motor STM silencioso. Aunque su construcción es plástica, la calidad óptica que entrega por su precio es sorprendente.', 'c50f1.8.jpg'),
(9, 'Sony FE 70-200mm f/4 G OSS', 'Zoom', 4.00, 22.00, '70-200', 3, 1500.00, 'Este teleobjetivo ofrece una excelente combinación de portabilidad, nitidez y rendimiento óptico. La apertura f/4 constante brinda buenos resultados en exteriores y eventos, con un desenfoque de fondo muy agradable. Su sistema OSS (estabilización óptica) es eficaz para tomas a pulso. Aunque no tiene la luminosidad del f/2.8, es mucho más liviano y accesible. Ideal para fotógrafos de viaje, naturaleza o deportes en buenas condiciones de luz.', 's70_200f4.png'),
(10, 'Nikon AF-S 50mm f/1.8G', 'Prime', 1.80, 16.00, '50', 1, 200.00, 'Un clásico del sistema Nikon, ideal para quienes buscan nitidez y desenfoque atractivo sin romper el bolsillo. Con una apertura f/1.8, permite fotografiar con luz natural y lograr buen bokeh en retratos. Su enfoque es rápido y silencioso gracias al motor AF-S. Aunque es compacto y liviano, su rendimiento óptico está a la altura de lentes más caros. Perfecto para calle, retrato y uso diario.', 'n50f1.8.png'),
(11, 'Canon EF 24-70mm f/2.8L II USM', 'Zoom', 2.80, 22.00, '24-70', 2, 1600.00, 'Un zoom estándar de gama alta, imprescindible para profesionales de Canon. La versión II mejora en nitidez, contraste y control de aberraciones respecto a su predecesor. Con apertura constante f/2.8, rinde excelente en retratos, eventos y bodas. El enfoque USM es rápido y preciso, y la construcción robusta con sellado contra el clima lo hace confiable en condiciones exigentes. Un caballo de batalla en cualquier kit full frame.', 'c24_70f2.8.jpg'),
(12, 'Sony FE 85mm f/1.4 GM', 'Prime', 1.40, 16.00, '85', 3, 1800.00, 'El Sony FE 85mm f/1.4 GM es un teleobjetivo prime de la serie G Master, diseñado para ofrecer un rendimiento óptico excepcional en retratos. Su apertura máxima de f/1.4 proporciona un bokeh suave y una separación de planos muy marcada, ideal para destacar al sujeto. La calidad de construcción es profesional, con sellado contra el clima y un anillo de apertura con clic desactivable. El enfoque es rápido y preciso gracias al motor lineal, aunque algo más audible que en otras ópticas Sony. Es una de las mejores opciones en 85mm para sistemas Sony full frame.', 's85f1.4.webp'),
(13, 'Nikon AF-P DX 70-300mm f/4.5-6.3G', 'Zoom', 4.50, 22.00, '70-300', 1, 400.00, 'Un teleobjetivo liviano y accesible ideal para usuarios de cámaras Nikon con sensor APS-C. El motor AF-P ofrece un enfoque automático rápido y silencioso, excelente para fotografía y video. Aunque su apertura máxima es limitada, ofrece buena calidad de imagen en condiciones de luz decente. Compacto para su rango focal, es una excelente opción para naturaleza, deportes o viajes sin cargar demasiado peso. Ideal como primer tele para principiantes.', 'n70_300f4.5.webp'),
(14, 'Nikon AF-S 17 - 55mm f/2.8G', 'Prime Zoom', 2.80, 22.00, '17-55', 1, 700.00, 'Este zoom estándar profesional para cámaras DX es una de las joyas más robustas del sistema APS-C de Nikon. Con apertura constante f/2.8, rinde excelente en eventos, retratos y trabajos en interiores. Su construcción metálica y sellado contra el clima lo hacen confiable en entornos exigentes. Ofrece gran nitidez, buen contraste y un enfoque rápido gracias al motor AF-S. Aunque es algo pesado para ser DX, su calidad lo convierte en una opción de primer nivel para quienes buscan lo mejor en formato recortado.', 'n17_55f2.8.jpg'),
(15, 'Sony E 16-55mm f/2.8 G', 'Zoom', 2.80, 22.00, '16-55', 3, 1400.00, 'El Sony E 16-55mm f/2.8 G es un zoom estándar profesional diseñado para cámaras APS-C con montura E. Ofrece una apertura constante de f/2.8, ideal para lograr desenfoques suaves y un buen rendimiento en baja luz. Su construcción óptica incluye elementos asféricos y de dispersión extra baja, lo que garantiza gran nitidez y control de aberraciones. Es rápido, preciso y silencioso al enfocar, gracias a su motor lineal XD. Su cuerpo sellado contra el polvo y la humedad lo hace apto para uso profesional en exteriores.', 's16_55f2.8.jpg'),
(17, 'Nikon AF-S 80-200mm', 'Zoom', 2.80, 22.00, '80-200', 1, 450.00, 'El Nikon 80-200mm f/2.8D es un zoom teleobjetivo clásico con apertura constante f/2.8, ideal para retratos, deportes y eventos. Ofrece gran nitidez y buena reproducción del color gracias a sus elementos ED. Su construcción es sólida y duradera, aunque carece de estabilización. Es una alternativa profesional más accesible frente a modelos más nuevos. Aún hoy sigue siendo muy valorado por su calidad óptica.', '1751485560240.jpg'),
(18, '1', '2', 55.00, 66.00, '77', 2, 8.00, '6', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes_fotos`
--

CREATE TABLE `likes_fotos` (
  `id` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `fk_foto` int(11) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `idMarcas` int(11) NOT NULL,
  `nombreMarcas` varchar(100) NOT NULL,
  `paisOrigenMarcas` varchar(100) DEFAULT NULL,
  `anioFundacionMarcas` year(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`idMarcas`, `nombreMarcas`, `paisOrigenMarcas`, `anioFundacionMarcas`) VALUES
(1, 'Nikon', 'Japón', '1917'),
(2, 'Canon', 'Japón', '1937'),
(3, 'Sony', 'Japón', '1946'),
(4, 'Fujifilm', 'Japón', '1934'),
(5, 'Panasonic', 'Japón', '1918'),
(6, 'Olympus', 'Japón', '1919'),
(7, 'Leica', 'Alemania', '1913'),
(8, 'Pentax', 'Japón', '1919'),
(9, 'Yongnuo Srl.', 'Japón', '2006'),
(12, 'Tamron ', 'China', '1995'),
(13, '7Artisans', 'China', '2019');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reseñas`
--

CREATE TABLE `reseñas` (
  `idResenas` int(11) NOT NULL,
  `fkUsuarioResenas` int(11) NOT NULL,
  `comentarioResenas` varchar(1000) NOT NULL,
  `fechaComentarioResenas` date NOT NULL,
  `imagenResenas` varchar(50) DEFAULT NULL,
  `fkLentes` int(11) DEFAULT NULL,
  `fkAccesorios` int(11) DEFAULT NULL,
  `fkCamaras` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reseñas`
--

INSERT INTO `reseñas` (`idResenas`, `fkUsuarioResenas`, `comentarioResenas`, `fechaComentarioResenas`, `imagenResenas`, `fkLentes`, `fkAccesorios`, `fkCamaras`) VALUES
(1, 1, 'hola mundo123', '2026-01-23', '1769369649775.jpg', 7, NULL, 17),
(2, 2, 'Conocido como el “nifty fifty”, este lente es una joya económica en el ecosistema Canon. Su apertura de f/1.8 ofrece un desenfoque suave y excelente rendimiento en situaciones de poca luz. Es ideal para retratos, callejera y video gracias a su motor STM silencioso. Aunque su construcción es plástica, la calidad óptica que entrega por su precio es sorprendente.', '2024-11-02', NULL, 10, NULL, NULL),
(3, 3, 'Este teleobjetivo ofrece una excelente combinación de portabilidad, nitidez y rendimiento óptico. La apertura f/4 constante brinda buenos resultados en exteriores y eventos, con un desenfoque de fondo muy agradable. Su sistema OSS (estabilización óptica) es eficaz para tomas a pulso. Aunque no tiene la luminosidad del f/2.8, es mucho más liviano y accesible. Ideal para fotógrafos de viaje, naturaleza o deportes en buenas condiciones de luz.', '2024-11-03', NULL, 17, NULL, NULL),
(4, 4, 'Un clásico del sistema Nikon, ideal para quienes buscan nitidez y desenfoque atractivo sin romper el bolsillo. Con una apertura f/1.8, permite fotografiar con luz natural y lograr buen bokeh en retratos. Su enfoque es rápido y silencioso gracias al motor AF-S. Aunque es compacto y liviano, su rendimiento óptico está a la altura de lentes más caros. Perfecto para calle, retrato y uso diario.', '2024-11-04', NULL, 9, NULL, NULL),
(5, 5, 'Un zoom estándar de gama alta, imprescindible para profesionales de Canon. La versión II mejora en nitidez, contraste y control de aberraciones respecto a su predecesor. Con apertura constante f/2.8, rinde excelente en retratos, eventos y bodas. El enfoque USM es rápido y preciso, y la construcción robusta con sellado contra el clima lo hace confiable en condiciones exigentes. Un caballo de batalla en cualquier kit full frame.', '2024-11-22', NULL, 11, NULL, NULL),
(6, 6, 'Un lente prime pensado para retratistas exigentes. Su apertura f/1.4 ofrece un bokeh cremoso y una separación de sujeto realmente impresionante. La nitidez en el centro es sobresaliente incluso a máxima apertura, y su enfoque es rápido y silencioso gracias al sistema de motor lineal. Construido como un tanque, con controles físicos útiles como el anillo de apertura y botón de enfoque personalizado. Un referente en calidad óptica dentro del sistema Sony full frame.', '2024-11-06', NULL, 8, NULL, NULL),
(11, 1, 'El Sony FE 85mm f/1.4 GM es un teleobjetivo prime de la serie G Master, diseñado para ofrecer un rendimiento óptico excepcional en retratos. Su apertura máxima de f/1.4 proporciona un bokeh suave y una separación de planos muy marcada, ideal para destacar al sujeto. La calidad de construcción es profesional, con sellado contra el clima y un anillo de apertura con clic desactivable. El enfoque es rápido y preciso gracias al motor lineal, aunque algo más audible que en otras ópticas Sony. Es una de las mejores opciones en 85mm para sistemas Sony full frame.', '2024-10-20', NULL, 12, NULL, NULL),
(12, 2, 'Un teleobjetivo liviano y accesible ideal para usuarios de cámaras Nikon con sensor APS-C. El motor AF-P ofrece un enfoque automático rápido y silencioso, excelente para fotografía y video. Aunque su apertura máxima es limitada, ofrece buena calidad de imagen en condiciones de luz decente. Compacto para su rango focal, es una excelente opción para naturaleza, deportes o viajes sin cargar demasiado peso. Ideal como primer tele para principiantes.', '2024-10-21', NULL, 13, NULL, NULL),
(13, 3, 'Este zoom estándar profesional para cámaras DX es una de las joyas más robustas del sistema APS-C de Nikon. Con apertura constante f/2.8, rinde excelente en eventos, retratos y trabajos en interiores. Su construcción metálica y sellado contra el clima lo hacen confiable en entornos exigentes. Ofrece gran nitidez, buen contraste y un enfoque rápido gracias al motor AF-S. Aunque es algo pesado para ser DX, su calidad lo convierte en una opción de primer nivel para quienes buscan lo mejor en formato recortado.', '2024-10-22', NULL, 14, NULL, NULL),
(14, 4, 'El Sony E 16-55mm f/2.8 G es un zoom estándar profesional diseñado para cámaras APS-C con montura E. Ofrece una apertura constante de f/2.8, ideal para lograr desenfoques suaves y un buen rendimiento en baja luz. Su construcción óptica incluye elementos asféricos y de dispersión extra baja, lo que garantiza gran nitidez y control de aberraciones. Es rápido, preciso y silencioso al enfocar, gracias a su motor lineal XD. Su cuerpo sellado contra el polvo y la humedad lo hace apto para uso profesional en exteriores.', '2024-10-23', NULL, 15, NULL, NULL),
(23, 1, 'Excelente accesorio, muy útil.', '2025-07-10', '1751660417797.png', NULL, 10, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnicas`
--

CREATE TABLE `tecnicas` (
  `idTecnica` int(11) NOT NULL,
  `nombreTecnica` varchar(100) NOT NULL,
  `descripcionTecnica` text DEFAULT NULL,
  `imagenTecnica` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tecnicas`
--

INSERT INTO `tecnicas` (`idTecnica`, `nombreTecnica`, `descripcionTecnica`, `imagenTecnica`) VALUES
(1, 'Barrido', 'Técnica que consiste en seguir un objeto en movimiento con la cámara durante una exposición lenta, logrando que el fondo se vea difuso y el sujeto enfocado.', 'barrido.jpg'),
(2, 'Zooming', 'Se logra modificando el zoom del lente durante una exposición prolongada, generando un efecto de líneas que convergen hacia el centro.', 'zooming.jpg'),
(3, 'Clave Alta', 'Imágenes con predominancia de tonos claros y blancos, baja o nula presencia de sombras, sensación de pureza, paz o limpieza.', 'clave_alta.jpg'),
(4, 'Clave Baja', 'Imágenes oscuras, con predominio de negros y sombras profundas. Genera dramatismo, tensión o misterio.', 'clave_baja.jpg'),
(5, 'Larga Exposición', 'Se utiliza un tiempo de exposición prolongado para capturar movimiento, luces o elementos que se desvanecen con el tiempo.', 'larga_exposicion.jpg'),
(6, 'Contraluz', 'La fuente de luz se encuentra detrás del sujeto, generando siluetas o efectos dramáticos de iluminación.', 'contraluz.jpg'),
(7, 'Profundidad de Campo Reducida', 'Se logra con aperturas grandes (f/1.4, f/2.8), permitiendo desenfocar el fondo y centrar la atención en el sujeto.', 'pdc_reducida.jpg'),
(8, 'Retrato Ambiental', 'Ubica al sujeto dentro de su contexto, mostrando el entorno para reforzar su identidad o actividad.', 'retrato_ambiental.jpg'),
(9, 'Fotografía Macro', 'Captura sujetos muy pequeños o detalles diminutos con gran nivel de acercamiento y definición.', 'macro.jpg'),
(10, 'Light Painting', 'Se pinta con luz en una escena oscura durante una larga exposición, generando formas, textos o efectos.', 'light_painting.webp'),
(11, 'Composición Regla de Tercios', 'Se aplica dividiendo el encuadre en 9 partes, ubicando elementos importantes en las intersecciones.', 'regla_tercios.jpg'),
(12, 'Simetría', 'Aprovecha formas o estructuras visualmente simétricas para lograr una composición balanceada.', 'simetria.jpg'),
(13, 'Reflejos', 'Usa superficies como agua, espejos o cristales para duplicar la imagen y enriquecer la composición.', 'reflejos.webp'),
(14, 'Blanco y Negro', 'Elimina el color para centrarse en forma, textura, contraste y composición. Puede ser digital o analógico.', 'blanco_negro.jpg'),
(15, 'HDR (High Dynamic Range)', 'Combina varias exposiciones de una misma escena para lograr detalles tanto en las sombras como en las luces altas.', 'hdr.jpg'),
(22, '5566', 'cxxcvbbcbcvx', '1769207208983.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

CREATE TABLE `tickets` (
  `idTicket` int(11) NOT NULL,
  `categoriaTicket` varchar(50) NOT NULL,
  `tituloTicket` varchar(150) NOT NULL,
  `descripcionTicket` text NOT NULL,
  `evidenciaTicket` varchar(255) DEFAULT NULL,
  `idUsuarioCreadorTicket` int(11) NOT NULL,
  `idAdminAsignado` int(11) DEFAULT NULL,
  `datetimeCreacionTicket` datetime DEFAULT current_timestamp(),
  `estadoTicket` enum('pendiente','abierto','finalizado') DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tickets`
--

INSERT INTO `tickets` (`idTicket`, `categoriaTicket`, `tituloTicket`, `descripcionTicket`, `evidenciaTicket`, `idUsuarioCreadorTicket`, `idAdminAsignado`, `datetimeCreacionTicket`, `estadoTicket`) VALUES
(1, '002', '003', '004', 'login_error.png', 1, 14, '2026-02-19 12:43:46', 'abierto'),
(2, 'Infraestructura', 'Servidor lento', 'El servidor principal presenta demoras superiores a 10 segundos en las consultas.', 'server_lag.png', 2, 3, '2026-02-19 12:46:17', 'abierto'),
(3, 'Hardware', 'Desafios', 'No puedo ver el progreso de mis desafios', NULL, 2, 14, '2026-02-20 21:53:56', 'finalizado'),
(4, 'Software', 'Error al abrir el sistema', 'El sistema muestra un mensaje de error al intentar iniciar sesión.', NULL, 3, NULL, '2026-02-20 21:53:56', 'pendiente'),
(5, 'Convivencia', 'Usuarios', 'El usuario xxx me esta hostigando y denunciando mis fotos', NULL, 4, 14, '2026-02-20 21:53:56', 'finalizado'),
(16, 'Desafíos', 'No me suma puntos al completar desafío', 'Completé el desafío semanal pero el sistema no me acreditó los puntos en mi perfil.', NULL, 3, NULL, '2026-02-24 20:44:07', 'pendiente'),
(17, 'Carga de fotos', 'Error al subir imagen de perfil', 'Intento cargar una foto JPG menor a 2MB y aparece un error inesperado.', 'error_subida_1.png', 3, NULL, '2026-02-24 20:44:07', 'pendiente'),
(18, 'Usuarios', 'Comportamiento inapropiado de otro usuario', 'El usuario con alias \"fotoMaster22\" está enviando mensajes ofensivos.', NULL, 2, NULL, '2026-02-24 20:44:07', 'pendiente'),
(19, 'Cuenta', 'No puedo iniciar sesión', 'Después de cambiar mi contraseña el sistema no me permite ingresar.', NULL, 4, 14, '2026-02-24 20:44:07', 'finalizado'),
(20, 'Desafíos', 'Desafío aparece como incompleto', 'Subí la evidencia del desafío pero sigue figurando como pendiente.', 'captura_desafio.png', 6, NULL, '2026-02-24 20:44:07', 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket_actualizaciones`
--

CREATE TABLE `ticket_actualizaciones` (
  `idActualizacion` int(11) NOT NULL,
  `fkTicket` int(11) NOT NULL,
  `fkUsuarioAutor` int(11) NOT NULL,
  `mensajeActualizacion` text NOT NULL,
  `fechaHoraActualizacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ticket_actualizaciones`
--

INSERT INTO `ticket_actualizaciones` (`idActualizacion`, `fkTicket`, `fkUsuarioAutor`, `mensajeActualizacion`, `fechaHoraActualizacion`) VALUES
(1, 2, 3, 'El ticket fue tomado y estamos revisando el problema reportado.', '2026-02-19 17:29:58'),
(2, 2, 2, 'Gracias por la respuesta. Quedo atento a cualquier novedad.', '2026-02-19 17:33:22'),
(3, 1, 14, 'primer comentario', '2026-02-22 14:22:36'),
(4, 1, 14, 'segundo comentario', '2026-02-22 14:22:52'),
(5, 1, 14, 'tercer comentario', '2026-02-22 14:23:10'),
(6, 5, 14, 'actualizacion 1 y 2', '2026-02-22 14:24:07'),
(7, 5, 14, '2.3 y 4', '2026-02-22 14:24:19'),
(8, 1, 14, 'cuarto comentario', '2026-02-22 14:42:00'),
(9, 19, 14, 'prueba 1', '2026-02-24 20:45:13'),
(10, 19, 14, 'prueba 2', '2026-02-24 20:45:17'),
(11, 19, 14, 'prueba 3', '2026-02-24 20:45:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombreCompletoUsuario` varchar(40) NOT NULL,
  `aliasUsuario` varchar(25) NOT NULL,
  `DniUsuario` int(10) NOT NULL,
  `ultimoLogeoUsuario` datetime DEFAULT NULL,
  `emailUsuario` varchar(60) NOT NULL,
  `passwordUsuario` varchar(70) NOT NULL,
  `img_usuarios` varchar(50) DEFAULT NULL,
  `esAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreCompletoUsuario`, `aliasUsuario`, `DniUsuario`, `ultimoLogeoUsuario`, `emailUsuario`, `passwordUsuario`, `img_usuarios`, `esAdmin`) VALUES
(1, 'Juan Carlos Lopez', 'Juan_065', 25256889, '2024-10-18 14:30:00', 'jcl@gmail.com', '$2a$08$sgL5uP69/CDuETtLE6hDOux0xu1NwovDIVETmfCNKNodeM6nuWk0a', '1770768732920.jpg', 0),
(2, 'María Fernández', 'mari22', 87654321, '2025-06-11 20:23:25', 'mf@gmail.com', '$2a$08$aC7vbJSl3H.MGrsT4WlyJeSBmCjoW5RJVGHRH/dpbfyy0DsDbfeuO', NULL, 0),
(3, 'Maria Eugenia', 'lupe_g', 11223344, '2024-10-17 09:15:00', 'gg@gmail.com', '$2a$08$8N2oAK0Pg1Cbcg2pQHrJ1esUhnW1U6h0C0AY5nIhyn65Guk9a2vyy', NULL, 1),
(4, 'Pedro Sánchez', 'pedro.87', 22334455, NULL, 'ps@gmail.com', '$2a$08$TXAZS1ZFYng/.BvtkSXrHuCcEyaYRy0YL/yYvCtu3oGbCBE/ZFMFC', NULL, 0),
(5, 'Ana Martínez', 'ana_m', 33445566, '2024-10-19 08:00:00', 'am@gmail.com', '$2a$08$KGVvKNJw9VGjXPh8Pg25nu9AjmWQ1NWF319zhrLzVTzVP2xnObCku', NULL, 0),
(6, 'Jonatan Pérez', 'Jon56', 55448877, NULL, 'juan.perez@gmail.com', '$2a$08$s8PitjAWfAOzCeRRfZJGfOtlXblECauNnWttg64.MvbglXKVC0QN.', NULL, 0),
(8, 'Anita Ross', 'A64', 5489, NULL, 'a@gmail.com', '$2a$08$RSx40gn8GE7iCYcdyEUI6e07HtafRUzvKddcYUlVMoQSry2UygVDG', '1730668934660.jpg', 0),
(9, 'Prueba 1122', 'Prueba', 448484, NULL, 'prueba@gmail.com', '$2a$08$kzObm8VQLUXrseRDnicHI.Fluy.mpavBfFQfNuJEpGLjpNY7BNq/C', NULL, 0),
(11, 'Prueba 112233', 'Prueba123', 44844, NULL, 'prueba123@gmail.com', '$2a$08$0sUaAJq8hFOJpwJ2WxKweOupR2ngPoThh.IxPwTxWsPB4rurQCPFm', NULL, 0),
(12, 'Jonan Pérez', 'Jon256', 55877, NULL, 'juan.p@gmail.com', '$2a$08$9rnQ4kjjIKY6XWAkFZR2kOZAodAqvi1BDHQj7E43tc13GluihlaXW', NULL, 0),
(13, 'Erika Ross', '123Bri', 5489, NULL, '123@gmail.com', '$2a$08$Di28qdHyT2UUBvDrc4F8P.26UG.Tv94WzYOdpybPxdoCQRbYqjFyC', '1747845930552.jpg', 0),
(14, 'Admin455', 'damer1990', 35323958, '2026-03-01 01:33:43', 'bnd@gmail.com', '$2a$08$DGOovQOHy0p1BtfABbVEculik9GRIOKeGtH9VtlIAl2//wIli3ZY.', '1770998211815.jpg', 1),
(15, 'alan4560', 'alan 6768', 36353245, '2026-03-01 01:51:47', 'brier@gmail.com', '$2a$08$zQ7dbJpmJcPI6cu5JIDP6u6eZeBj501PkqC3dunoMHWWjFh2YiQn2', '1771799151284.jpg', 0),
(16, 'Admin 2', 'der90', 758695, NULL, 'main@gmail.com', '$2a$08$jzATlEenJQCfDa0ZiQoneul/GffEaFUNW1blXE9DUGtR9.G.A9VOu', NULL, 1),
(17, 'alan', '4587ruru', 457845, NULL, 'qwe@hotmail.com', '$2a$08$5s..LmsjWwlt4rnTODri7.9KnmKBtDfoeKsJWXKXeHCJr.q8G5zKS', NULL, 0),
(19, 'Erika Ross23', '123Bri23', 54892323, NULL, '124533@gmail.com', '$2a$08$rzQb7X.GLpszykrkA2qvu.3AS1AG/7dzvTVsBKCQGYutBWTZTkzs2', '1753721387859.jpg', 0),
(20, '789', '458595', 784535, NULL, '4@user.com', '$2a$08$5o8ueBu2p59LdaSUe08MnOqaB2gLI5Ds0kSy6CTYkRBVPpy3pr7gi', NULL, 0),
(21, '2424', 'asde54er', 852569, NULL, 'an@mail.com', '$2a$08$zOk0afDmciKz1Bv.Y0dC6ulVoHGMUmGu5Wd7qIiRDDyUXpAfUZzR6', NULL, 0),
(22, '1278', '4571', 853652, NULL, 'mail@mail.com', '$2a$08$EaMlbMuYc/QD/wQad8nGqes0zEuznBGQxoRwvSUIzbYBmkbjY/.Y.', NULL, 0),
(23, 'qwer', 'wsder', 789562, NULL, 'asdam@gmail.com', '$2a$08$Y01PdUXII3ka9HWLXR2AUuWW7acTIk7o/Rsn5ljHzS2TmVcAVRRue', NULL, 0),
(24, 'rtyu', '3er6', 145698, NULL, '45@gmail.com', '$2a$08$AODZJtA7yVVqMRuoc9AwiOfimmCgJlWOGrmXkw7lj7Tcbh6qLjoRm', NULL, 0),
(25, '78765', 'jjgjfgjh', 2565444, NULL, 'r@mail.com', '$2a$08$TqzO/kLkL6twEGrNCv2O5extqV.YEncPKaOsNt2UBJ2r6Ogh8uvbC', NULL, 0),
(26, 'fbvzcxbcx', 'bvccvc', 855345, NULL, '34efwd@gmail.com', '$2a$08$FtoQAWbDI71Dozu4vx9vw.cvpjWU0by/vodaZZ0P3XlV/f65JBlc.', NULL, 0),
(27, 'x cvcxvx', 'fbcvbc', 543524, NULL, 'bamer@gmail.com', '$2a$08$TOirUlPNcrQYO1tsYhbutOc2MfC1WAOzeptwDPueKHgPVNGjamDte', NULL, 0),
(28, '2323323', 'dfsdfs', 255424, NULL, '23@gmail.com', '$2a$08$DMCdFoBP7mgncO4E8fVwheXul7iEqjAQBcr.OQSDRjhhqvQ19jDN2', NULL, 0),
(29, '2424', 'vdsvcx', 5345, NULL, '3@mail.com', '$2a$08$lRGnpy2UfYl8LhPxq7cYWOH8bB0eLD6H0s7A4Yx3K7gqCGh4EWOdq', '1753752095937.jpg', 0),
(30, '45', '5252', 859625, NULL, 'wer@gmail.com', '$2a$08$CTmpkO8jZ.VuIlfns6bCh.O3B3AEf1tfDk5qJVXxEdWPtIkb4I5JG', NULL, 0),
(31, 'fdfdsf', 'nbvvb', 8574589, NULL, '78@gmail.com', '$2a$08$H0qoK.JzyR0gLbaBbcHtiu4.PugQSE4GaXAfoQSh.evS.zaNzWwyi', NULL, 0),
(35, '123598', '1537354', 25252525, NULL, '111111@gmail.com', '$2a$08$0/XZedPl.o6ukPHkFcNoS.fR2COtZOEHhqEOw02.qeOkwkOC3mLMi', '1770771570540.png', 1),
(36, 'gaia', 'gaia1990', 45474560, '2026-02-24 18:17:34', 'gaia@gmail.com', '$2a$08$zn2D4F3QNeEhjVF6vUPDK.sfZ0Qodcc5Al8oRdtCCRD/Nva4N/Emi', '1771967632861.jpg', 0),
(37, '242456', 'vvdv', 2525267, NULL, 'olasdr@gmail.com', '$2a$08$r5On2QWVTwqH5T8VK6wHnud65xS4VGNwz94L3aRnohzbJs68JBo.y', NULL, 1),
(38, 'Juan jose', 'Juan_0274', 77445575, '2026-02-24 20:20:15', '1122@gmail.com', '$2a$08$Zux8EPzvjkFMecr79T1WeeKMqa/i4.VD8YS448UmpbZFYAGHCgqpi', '1771975201894.jpg', 0),
(40, 'usuario 1', 'dvdsvd', 44887766, '2026-02-24 21:11:35', '4455@gmail.com', '$2a$08$56NUxg5H3o//bFGU8J1mqeg5aME6Nda/cSXCgQbuce2I8hdNMaVIu', '1771978279212.jpeg', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_desafios`
--

CREATE TABLE `usuarios_desafios` (
  `idUsuarioDesafio` int(11) NOT NULL,
  `fkDesafio` int(11) NOT NULL,
  `fkUsuario` int(11) NOT NULL,
  `fechaParticipacion` datetime DEFAULT current_timestamp(),
  `imagenParticipante` varchar(100) DEFAULT NULL,
  `comentarioDesafio` text DEFAULT NULL,
  `estado` enum('Enviado','Aprobado','Rechazado','NoEnviado') NOT NULL DEFAULT 'NoEnviado',
  `devolucionModerador` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accesorios`
--
ALTER TABLE `accesorios`
  ADD PRIMARY KEY (`idAccesorios`),
  ADD KEY `accesorios_ibfk_1` (`fk_marcas`) USING BTREE;

--
-- Indices de la tabla `camaras`
--
ALTER TABLE `camaras`
  ADD PRIMARY KEY (`idCamaras`),
  ADD KEY `camaras_ibfk_1` (`marca_id`) USING BTREE;

--
-- Indices de la tabla `comentarios_fotos`
--
ALTER TABLE `comentarios_fotos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario` (`fk_usuario`),
  ADD KEY `fk_galeria` (`fk_galeria`);

--
-- Indices de la tabla `desafios`
--
ALTER TABLE `desafios`
  ADD PRIMARY KEY (`idDesafio`);

--
-- Indices de la tabla `evidencias_desafio`
--
ALTER TABLE `evidencias_desafio`
  ADD PRIMARY KEY (`idEvidencia`),
  ADD KEY `fk_evidencia_inscripcion` (`fkInscripcion`);

--
-- Indices de la tabla `fotografos`
--
ALTER TABLE `fotografos`
  ADD PRIMARY KEY (`idFotografo`);

--
-- Indices de la tabla `fotografos_camaras`
--
ALTER TABLE `fotografos_camaras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idFotografo` (`idFotografo`),
  ADD KEY `idCamara` (`idCamara`);

--
-- Indices de la tabla `fotografos_lentes`
--
ALTER TABLE `fotografos_lentes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idFotografo` (`idFotografo`),
  ADD KEY `idLente` (`idLente`);

--
-- Indices de la tabla `fotografos_tecnicas`
--
ALTER TABLE `fotografos_tecnicas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idFotografo` (`idFotografo`),
  ADD KEY `idTecnica` (`idTecnica`);

--
-- Indices de la tabla `galeria_fotos`
--
ALTER TABLE `galeria_fotos`
  ADD PRIMARY KEY (`idGaleria`),
  ADD KEY `fk_usuario` (`fk_usuario`),
  ADD KEY `fk_camara` (`fk_camara`),
  ADD KEY `fk_lente` (`fk_lente`);

--
-- Indices de la tabla `galeria_tecnicas`
--
ALTER TABLE `galeria_tecnicas`
  ADD PRIMARY KEY (`idGaleriaTecnica`),
  ADD KEY `fk_galeria` (`fk_galeria`),
  ADD KEY `fk_tecnica` (`fk_tecnica`);

--
-- Indices de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD PRIMARY KEY (`idInscripcion`),
  ADD UNIQUE KEY `unique_usuario_desafio` (`fkUsuario`,`fkDesafio`),
  ADD KEY `fk_inscripcion_desafio` (`fkDesafio`);

--
-- Indices de la tabla `lentes`
--
ALTER TABLE `lentes`
  ADD PRIMARY KEY (`idLentes`),
  ADD KEY `lentes_ibfk_1` (`marca_id`);

--
-- Indices de la tabla `likes_fotos`
--
ALTER TABLE `likes_fotos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fk_usuario` (`fk_usuario`,`fk_foto`),
  ADD KEY `fk_foto` (`fk_foto`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`idMarcas`);

--
-- Indices de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD PRIMARY KEY (`idResenas`),
  ADD KEY `reseñas_ibfk_1` (`fkUsuarioResenas`),
  ADD KEY `fk_lentes_resenas` (`fkLentes`),
  ADD KEY `fk_reseñas_accesorios` (`fkAccesorios`),
  ADD KEY `fk_reseñas_camaras` (`fkCamaras`);

--
-- Indices de la tabla `tecnicas`
--
ALTER TABLE `tecnicas`
  ADD PRIMARY KEY (`idTecnica`);

--
-- Indices de la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`idTicket`),
  ADD KEY `idUsuarioCreador` (`idUsuarioCreadorTicket`),
  ADD KEY `idAdminAsignado` (`idAdminAsignado`);

--
-- Indices de la tabla `ticket_actualizaciones`
--
ALTER TABLE `ticket_actualizaciones`
  ADD PRIMARY KEY (`idActualizacion`),
  ADD KEY `fkTicket` (`fkTicket`),
  ADD KEY `fkUsuarioAutor` (`fkUsuarioAutor`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- Indices de la tabla `usuarios_desafios`
--
ALTER TABLE `usuarios_desafios`
  ADD PRIMARY KEY (`idUsuarioDesafio`),
  ADD KEY `fkDesafio` (`fkDesafio`),
  ADD KEY `fkUsuario` (`fkUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accesorios`
--
ALTER TABLE `accesorios`
  MODIFY `idAccesorios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `camaras`
--
ALTER TABLE `camaras`
  MODIFY `idCamaras` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `comentarios_fotos`
--
ALTER TABLE `comentarios_fotos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `desafios`
--
ALTER TABLE `desafios`
  MODIFY `idDesafio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `evidencias_desafio`
--
ALTER TABLE `evidencias_desafio`
  MODIFY `idEvidencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `fotografos`
--
ALTER TABLE `fotografos`
  MODIFY `idFotografo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `fotografos_camaras`
--
ALTER TABLE `fotografos_camaras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fotografos_lentes`
--
ALTER TABLE `fotografos_lentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fotografos_tecnicas`
--
ALTER TABLE `fotografos_tecnicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `galeria_fotos`
--
ALTER TABLE `galeria_fotos`
  MODIFY `idGaleria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `galeria_tecnicas`
--
ALTER TABLE `galeria_tecnicas`
  MODIFY `idGaleriaTecnica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  MODIFY `idInscripcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `lentes`
--
ALTER TABLE `lentes`
  MODIFY `idLentes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `likes_fotos`
--
ALTER TABLE `likes_fotos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `idMarcas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  MODIFY `idResenas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `tecnicas`
--
ALTER TABLE `tecnicas`
  MODIFY `idTecnica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `tickets`
--
ALTER TABLE `tickets`
  MODIFY `idTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `ticket_actualizaciones`
--
ALTER TABLE `ticket_actualizaciones`
  MODIFY `idActualizacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accesorios`
--
ALTER TABLE `accesorios`
  ADD CONSTRAINT `accesorios_ibfk_1` FOREIGN KEY (`fk_marcas`) REFERENCES `marcas` (`idMarcas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `camaras`
--
ALTER TABLE `camaras`
  ADD CONSTRAINT `camaras_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`idMarcas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comentarios_fotos`
--
ALTER TABLE `comentarios_fotos`
  ADD CONSTRAINT `comentarios_fotos_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `comentarios_fotos_ibfk_2` FOREIGN KEY (`fk_galeria`) REFERENCES `galeria_fotos` (`idGaleria`) ON DELETE CASCADE;

--
-- Filtros para la tabla `evidencias_desafio`
--
ALTER TABLE `evidencias_desafio`
  ADD CONSTRAINT `fk_evidencia_inscripcion` FOREIGN KEY (`fkInscripcion`) REFERENCES `inscripciones` (`idInscripcion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `fotografos_camaras`
--
ALTER TABLE `fotografos_camaras`
  ADD CONSTRAINT `fotografos_camaras_ibfk_1` FOREIGN KEY (`idFotografo`) REFERENCES `fotografos` (`idFotografo`) ON DELETE CASCADE,
  ADD CONSTRAINT `fotografos_camaras_ibfk_2` FOREIGN KEY (`idCamara`) REFERENCES `camaras` (`idCamaras`) ON DELETE CASCADE;

--
-- Filtros para la tabla `fotografos_lentes`
--
ALTER TABLE `fotografos_lentes`
  ADD CONSTRAINT `fotografos_lentes_ibfk_1` FOREIGN KEY (`idFotografo`) REFERENCES `fotografos` (`idFotografo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fotografos_lentes_ibfk_2` FOREIGN KEY (`idLente`) REFERENCES `lentes` (`idLentes`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `fotografos_tecnicas`
--
ALTER TABLE `fotografos_tecnicas`
  ADD CONSTRAINT `fotografos_tecnicas_ibfk_1` FOREIGN KEY (`idFotografo`) REFERENCES `fotografos` (`idFotografo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fotografos_tecnicas_ibfk_2` FOREIGN KEY (`idTecnica`) REFERENCES `tecnicas` (`idTecnica`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `galeria_fotos`
--
ALTER TABLE `galeria_fotos`
  ADD CONSTRAINT `galeria_fotos_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `galeria_fotos_ibfk_2` FOREIGN KEY (`fk_camara`) REFERENCES `camaras` (`idCamaras`) ON DELETE SET NULL,
  ADD CONSTRAINT `galeria_fotos_ibfk_3` FOREIGN KEY (`fk_lente`) REFERENCES `lentes` (`idLentes`) ON DELETE SET NULL;

--
-- Filtros para la tabla `galeria_tecnicas`
--
ALTER TABLE `galeria_tecnicas`
  ADD CONSTRAINT `galeria_tecnicas_ibfk_1` FOREIGN KEY (`fk_galeria`) REFERENCES `galeria_fotos` (`idGaleria`) ON DELETE CASCADE,
  ADD CONSTRAINT `galeria_tecnicas_ibfk_2` FOREIGN KEY (`fk_tecnica`) REFERENCES `tecnicas` (`idTecnica`) ON DELETE CASCADE;

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `fk_inscripcion_desafio` FOREIGN KEY (`fkDesafio`) REFERENCES `desafios` (`idDesafio`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_inscripcion_usuario` FOREIGN KEY (`fkUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `lentes`
--
ALTER TABLE `lentes`
  ADD CONSTRAINT `lentes_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`idMarcas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `likes_fotos`
--
ALTER TABLE `likes_fotos`
  ADD CONSTRAINT `likes_fotos_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_fotos_ibfk_2` FOREIGN KEY (`fk_foto`) REFERENCES `galeria_fotos` (`idGaleria`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD CONSTRAINT `fk_lentes_resenas` FOREIGN KEY (`fkLentes`) REFERENCES `lentes` (`idLentes`),
  ADD CONSTRAINT `fk_reseñas_accesorios` FOREIGN KEY (`fkAccesorios`) REFERENCES `accesorios` (`idAccesorios`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reseñas_camaras` FOREIGN KEY (`fkCamaras`) REFERENCES `camaras` (`idCamaras`) ON DELETE CASCADE,
  ADD CONSTRAINT `reseñas_ibfk_1` FOREIGN KEY (`fkUsuarioResenas`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`idUsuarioCreadorTicket`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`idAdminAsignado`) REFERENCES `usuarios` (`idUsuario`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `ticket_actualizaciones`
--
ALTER TABLE `ticket_actualizaciones`
  ADD CONSTRAINT `ticket_actualizaciones_ibfk_1` FOREIGN KEY (`fkTicket`) REFERENCES `tickets` (`idTicket`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_actualizaciones_ibfk_2` FOREIGN KEY (`fkUsuarioAutor`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_desafios`
--
ALTER TABLE `usuarios_desafios`
  ADD CONSTRAINT `fkDesafio` FOREIGN KEY (`fkDesafio`) REFERENCES `desafios` (`idDesafio`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkUsuario` FOREIGN KEY (`fkUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_desafios_ibfk_2` FOREIGN KEY (`fkDesafio`) REFERENCES `desafios` (`idDesafio`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
