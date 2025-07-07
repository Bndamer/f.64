-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-07-2025 a las 17:58:03
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
(10, 'Parasol Nikon d-23', 'Parasol compatible con lentes zoom', 'original', 15.00, 1, NULL),
(11, 'Parasol Nikon f-27', 'Parasol compatible con lentes angular', 'original y generico', 15.00, 1, NULL),
(12, 'Difusor Nikon e3', 'Difusor rigido compatible con flashes Nikon', 'original', 9.00, 1, NULL),
(14, 'Batería Canon LP-E6N', 'Batería recargable para cámaras Canon', 'original', 45.00, 2, NULL),
(15, 'Filtro UV 52mm', 'Filtro de protección UV para lentes de 52mm', 'genérico', 10.00, 3, NULL);

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
(11, 'Nikon D7500', 'DSLR', 'APS-C', 20.90, 100, 51200, 1, 1200.00, 'd7500.jpg'),
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
(23, 'Nikon D3100', 'DSRL', 'APS-C', 14.00, 100, 5600, NULL, 300.00, 'd3100.jpg');

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
(1, 'Annie Leibovitz', 'Estados Unidos', 1, 2, 'Retrato editorial', 'Famosa por sus retratos de celebridades para revistas como Vanity Fair y Rolling Stone. Estilo teatral y escenificado.', 'leibovitz.jpg'),
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
(16, 'Dorothea Lange\n', 'Estadounidense', 1562, 2025, 'Documental, Humanista\n', 'hghghghghg', '1751655439427.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotografos_camaras`
--

CREATE TABLE `fotografos_camaras` (
  `id` int(11) NOT NULL,
  `idFotografo` int(11) DEFAULT NULL,
  `idCamara` int(11) DEFAULT NULL,
  `comentario` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotografos_lentes`
--

CREATE TABLE `fotografos_lentes` (
  `id` int(11) NOT NULL,
  `idFotografo` int(11) NOT NULL,
  `idLente` int(11) NOT NULL,
  `comentario` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotografos_tecnicas`
--

CREATE TABLE `fotografos_tecnicas` (
  `id` int(11) NOT NULL,
  `idFotografo` int(11) NOT NULL,
  `idTecnica` int(11) NOT NULL,
  `comentario` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(7, 'Nikon 27-70 2.8', 'Prime Zoom Luminoso', 2.50, 54.00, '45', 1, NULL, '', 'n24_70f2.8.png'),
(8, 'Canon EF 50mm f/1.8 STM', 'Prime', 1.80, 16.00, '50', 2, 125.00, 'Conocido como el “nifty fifty”, este lente es una joya económica en el ecosistema Canon. Su apertura de f/1.8 ofrece un desenfoque suave y excelente rendimiento en situaciones de poca luz. Es ideal para retratos, callejera y video gracias a su motor STM silencioso. Aunque su construcción es plástica, la calidad óptica que entrega por su precio es sorprendente.', 'c50f1.8.jpg'),
(9, 'Sony FE 70-200mm f/4 G OSS', 'Zoom', 4.00, 22.00, '70-200', 3, 1500.00, 'Este teleobjetivo ofrece una excelente combinación de portabilidad, nitidez y rendimiento óptico. La apertura f/4 constante brinda buenos resultados en exteriores y eventos, con un desenfoque de fondo muy agradable. Su sistema OSS (estabilización óptica) es eficaz para tomas a pulso. Aunque no tiene la luminosidad del f/2.8, es mucho más liviano y accesible. Ideal para fotógrafos de viaje, naturaleza o deportes en buenas condiciones de luz.', 's70_200f4.png'),
(10, 'Nikon AF-S 50mm f/1.8G', 'Prime', 1.80, 16.00, '50', 1, 200.00, 'Un clásico del sistema Nikon, ideal para quienes buscan nitidez y desenfoque atractivo sin romper el bolsillo. Con una apertura f/1.8, permite fotografiar con luz natural y lograr buen bokeh en retratos. Su enfoque es rápido y silencioso gracias al motor AF-S. Aunque es compacto y liviano, su rendimiento óptico está a la altura de lentes más caros. Perfecto para calle, retrato y uso diario.', 'n50f1.8.png'),
(11, 'Canon EF 24-70mm f/2.8L II USM', 'Zoom', 2.80, 22.00, '24-70', 2, 1600.00, 'Un zoom estándar de gama alta, imprescindible para profesionales de Canon. La versión II mejora en nitidez, contraste y control de aberraciones respecto a su predecesor. Con apertura constante f/2.8, rinde excelente en retratos, eventos y bodas. El enfoque USM es rápido y preciso, y la construcción robusta con sellado contra el clima lo hace confiable en condiciones exigentes. Un caballo de batalla en cualquier kit full frame.', 'c24_70f2.8.jpg'),
(12, 'Sony FE 85mm f/1.4 GM', 'Prime', 1.40, 16.00, '85', 3, 1800.00, 'El Sony FE 85mm f/1.4 GM es un teleobjetivo prime de la serie G Master, diseñado para ofrecer un rendimiento óptico excepcional en retratos. Su apertura máxima de f/1.4 proporciona un bokeh suave y una separación de planos muy marcada, ideal para destacar al sujeto. La calidad de construcción es profesional, con sellado contra el clima y un anillo de apertura con clic desactivable. El enfoque es rápido y preciso gracias al motor lineal, aunque algo más audible que en otras ópticas Sony. Es una de las mejores opciones en 85mm para sistemas Sony full frame.', 's85f1.4.webp'),
(13, 'Nikon AF-P DX 70-300mm f/4.5-6.3G', 'Zoom', 4.50, 22.00, '70-300', 1, 400.00, 'Un teleobjetivo liviano y accesible ideal para usuarios de cámaras Nikon con sensor APS-C. El motor AF-P ofrece un enfoque automático rápido y silencioso, excelente para fotografía y video. Aunque su apertura máxima es limitada, ofrece buena calidad de imagen en condiciones de luz decente. Compacto para su rango focal, es una excelente opción para naturaleza, deportes o viajes sin cargar demasiado peso. Ideal como primer tele para principiantes.', 'n70_300f4.5.webp'),
(14, 'Nikon AF-S 17 - 55mm f/2.8G', 'Prime Zoom', 2.80, 22.00, '17-55', 1, 700.00, 'Este zoom estándar profesional para cámaras DX es una de las joyas más robustas del sistema APS-C de Nikon. Con apertura constante f/2.8, rinde excelente en eventos, retratos y trabajos en interiores. Su construcción metálica y sellado contra el clima lo hacen confiable en entornos exigentes. Ofrece gran nitidez, buen contraste y un enfoque rápido gracias al motor AF-S. Aunque es algo pesado para ser DX, su calidad lo convierte en una opción de primer nivel para quienes buscan lo mejor en formato recortado.', 'n17_55f2.8.jpg'),
(15, 'Sony E 16-55mm f/2.8 G', 'Zoom', 2.80, 22.00, '16-55', 3, 1400.00, 'El Sony E 16-55mm f/2.8 G es un zoom estándar profesional diseñado para cámaras APS-C con montura E. Ofrece una apertura constante de f/2.8, ideal para lograr desenfoques suaves y un buen rendimiento en baja luz. Su construcción óptica incluye elementos asféricos y de dispersión extra baja, lo que garantiza gran nitidez y control de aberraciones. Es rápido, preciso y silencioso al enfocar, gracias a su motor lineal XD. Su cuerpo sellado contra el polvo y la humedad lo hace apto para uso profesional en exteriores.', 's16_55f2.8.jpg'),
(17, 'Nikon AF-S 80-200mm', 'Zoom', 2.80, 22.00, '80-200', 1, 450.00, 'El Nikon 80-200mm f/2.8D es un zoom teleobjetivo clásico con apertura constante f/2.8, ideal para retratos, deportes y eventos. Ofrece gran nitidez y buena reproducción del color gracias a sus elementos ED. Su construcción es sólida y duradera, aunque carece de estabilización. Es una alternativa profesional más accesible frente a modelos más nuevos. Aún hoy sigue siendo muy valorado por su calidad óptica.', '1751485560240.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `idMarcas` int(11) NOT NULL,
  `nombreMarcas` varchar(100) NOT NULL,
  `paisOrigenMarcas` varchar(100) DEFAULT NULL,
  `añoFundacionMarcas` year(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`idMarcas`, `nombreMarcas`, `paisOrigenMarcas`, `añoFundacionMarcas`) VALUES
(1, 'Nikon', 'Japón', '1917'),
(2, 'Canon', 'Japón', '1937'),
(3, 'Sony', 'Japón', '1946'),
(4, 'Fujifilm', 'Japón', '1934'),
(5, 'Panasonic', 'Japón', '1918'),
(6, 'Olympus', 'Japón', '1919'),
(7, 'Leica', 'Alemania', '1913'),
(8, 'Pentax', 'Japón', '1919'),
(9, 'Yongnuo Srl.', 'Japón', '2006');

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
(1, 1, 'Un lente imprescindible para fotografía profesional, especialmente en bodas, retratos y eventos. La apertura constante de f/2.8 permite trabajar con poca luz y lograr un bonito bokeh. Enfoca rápido, es nítido incluso a plena apertura, y su construcción es robusta. Aunque es pesado, su rendimiento justifica el tamaño. Ideal como lente todoterreno en cuerpos full frame Nikon.', '2024-11-01', NULL, NULL, NULL, NULL),
(2, 2, 'Conocido como el “nifty fifty”, este lente es una joya económica en el ecosistema Canon. Su apertura de f/1.8 ofrece un desenfoque suave y excelente rendimiento en situaciones de poca luz. Es ideal para retratos, callejera y video gracias a su motor STM silencioso. Aunque su construcción es plástica, la calidad óptica que entrega por su precio es sorprendente.', '2024-11-02', NULL, NULL, NULL, NULL),
(3, 3, 'Este teleobjetivo ofrece una excelente combinación de portabilidad, nitidez y rendimiento óptico. La apertura f/4 constante brinda buenos resultados en exteriores y eventos, con un desenfoque de fondo muy agradable. Su sistema OSS (estabilización óptica) es eficaz para tomas a pulso. Aunque no tiene la luminosidad del f/2.8, es mucho más liviano y accesible. Ideal para fotógrafos de viaje, naturaleza o deportes en buenas condiciones de luz.', '2024-11-03', NULL, NULL, NULL, NULL),
(4, 4, 'Un clásico del sistema Nikon, ideal para quienes buscan nitidez y desenfoque atractivo sin romper el bolsillo. Con una apertura f/1.8, permite fotografiar con luz natural y lograr buen bokeh en retratos. Su enfoque es rápido y silencioso gracias al motor AF-S. Aunque es compacto y liviano, su rendimiento óptico está a la altura de lentes más caros. Perfecto para calle, retrato y uso diario.', '2024-11-04', NULL, NULL, NULL, NULL),
(5, 5, 'Un zoom estándar de gama alta, imprescindible para profesionales de Canon. La versión II mejora en nitidez, contraste y control de aberraciones respecto a su predecesor. Con apertura constante f/2.8, rinde excelente en retratos, eventos y bodas. El enfoque USM es rápido y preciso, y la construcción robusta con sellado contra el clima lo hace confiable en condiciones exigentes. Un caballo de batalla en cualquier kit full frame.', '2024-11-22', NULL, NULL, NULL, NULL),
(6, 6, 'Un lente prime pensado para retratistas exigentes. Su apertura f/1.4 ofrece un bokeh cremoso y una separación de sujeto realmente impresionante. La nitidez en el centro es sobresaliente incluso a máxima apertura, y su enfoque es rápido y silencioso gracias al sistema de motor lineal. Construido como un tanque, con controles físicos útiles como el anillo de apertura y botón de enfoque personalizado. Un referente en calidad óptica dentro del sistema Sony full frame.', '2024-11-06', NULL, NULL, NULL, NULL),
(11, 1, 'El Sony FE 85mm f/1.4 GM es un teleobjetivo prime de la serie G Master, diseñado para ofrecer un rendimiento óptico excepcional en retratos. Su apertura máxima de f/1.4 proporciona un bokeh suave y una separación de planos muy marcada, ideal para destacar al sujeto. La calidad de construcción es profesional, con sellado contra el clima y un anillo de apertura con clic desactivable. El enfoque es rápido y preciso gracias al motor lineal, aunque algo más audible que en otras ópticas Sony. Es una de las mejores opciones en 85mm para sistemas Sony full frame.', '2024-10-20', NULL, NULL, NULL, NULL),
(12, 2, 'Un teleobjetivo liviano y accesible ideal para usuarios de cámaras Nikon con sensor APS-C. El motor AF-P ofrece un enfoque automático rápido y silencioso, excelente para fotografía y video. Aunque su apertura máxima es limitada, ofrece buena calidad de imagen en condiciones de luz decente. Compacto para su rango focal, es una excelente opción para naturaleza, deportes o viajes sin cargar demasiado peso. Ideal como primer tele para principiantes.', '2024-10-21', NULL, NULL, NULL, NULL),
(13, 3, 'Este zoom estándar profesional para cámaras DX es una de las joyas más robustas del sistema APS-C de Nikon. Con apertura constante f/2.8, rinde excelente en eventos, retratos y trabajos en interiores. Su construcción metálica y sellado contra el clima lo hacen confiable en entornos exigentes. Ofrece gran nitidez, buen contraste y un enfoque rápido gracias al motor AF-S. Aunque es algo pesado para ser DX, su calidad lo convierte en una opción de primer nivel para quienes buscan lo mejor en formato recortado.', '2024-10-22', NULL, NULL, NULL, NULL),
(14, 4, 'El Sony E 16-55mm f/2.8 G es un zoom estándar profesional diseñado para cámaras APS-C con montura E. Ofrece una apertura constante de f/2.8, ideal para lograr desenfoques suaves y un buen rendimiento en baja luz. Su construcción óptica incluye elementos asféricos y de dispersión extra baja, lo que garantiza gran nitidez y control de aberraciones. Es rápido, preciso y silencioso al enfocar, gracias a su motor lineal XD. Su cuerpo sellado contra el polvo y la humedad lo hace apto para uso profesional en exteriores.', '2024-10-23', NULL, NULL, NULL, NULL),
(23, 1, 'Excelente accesorio, muy útil.', '2025-07-10', '1751660417797.png', NULL, 10, NULL),
(24, 1, 'Excelente accesorio, muy útil.', '2025-07-03', '1751659631343.jpg', NULL, 10, NULL);

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
(15, 'HDR (High Dynamic Range)', 'Combina varias exposiciones de una misma escena para lograr detalles tanto en las sombras como en las luces altas.', 'hdr.jpg');

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
(1, 'Juan Carlos Lopez', 'Juan_002', 25256485, '2024-10-18 14:30:00', 'jcl@gmail.com', '$2a$08$sgL5uP69/CDuETtLE6hDOux0xu1NwovDIVETmfCNKNodeM6nuWk0a', NULL, 0),
(2, 'María Fernández', 'mari22', 87654321, NULL, 'mf@gmail.com', '$2a$08$aC7vbJSl3H.MGrsT4WlyJeSBmCjoW5RJVGHRH/dpbfyy0DsDbfeuO', NULL, 0),
(3, 'Maria Eugenia', 'lupe_g', 11223344, '2024-10-17 09:15:00', 'gg@gmail.com', '$2a$08$pmPtsCLCcFA8IBkwi.xcr.Izi6dITuwZFX6kdafgq.ybD8X.m.soa', NULL, 0),
(4, 'Pedro Sánchez', 'pedro.87', 22334455, NULL, 'ps@gmail.com', '$2a$08$TXAZS1ZFYng/.BvtkSXrHuCcEyaYRy0YL/yYvCtu3oGbCBE/ZFMFC', NULL, 0),
(5, 'Ana Martínez', 'ana_m', 33445566, '2024-10-19 08:00:00', 'am@gmail.com', '$2a$08$KGVvKNJw9VGjXPh8Pg25nu9AjmWQ1NWF319zhrLzVTzVP2xnObCku', NULL, 0),
(6, 'Jonatan Pérez', 'Jon56', 55448877, NULL, 'juan.perez@gmail.com', '$2a$08$s8PitjAWfAOzCeRRfZJGfOtlXblECauNnWttg64.MvbglXKVC0QN.', NULL, 0),
(8, 'Anita Ross', 'A64', 5489, NULL, 'a@gmail.com', '$2a$08$RSx40gn8GE7iCYcdyEUI6e07HtafRUzvKddcYUlVMoQSry2UygVDG', '1730668934660.jpg', 0),
(9, 'Prueba 1122', 'Prueba', 448484, NULL, 'prueba@gmail.com', '$2a$08$kzObm8VQLUXrseRDnicHI.Fluy.mpavBfFQfNuJEpGLjpNY7BNq/C', '', 0),
(10, 'Erika Ross', '123eli', 5489, NULL, 'b@gmail.com', '$2a$08$lXADqdsiyNMozBcyQwmCcetD3ILZoSQX77XgNg39YFQeyxvbcBqke', '1730751498399.jpg', 0),
(11, 'Prueba 112233', 'Prueba123', 44844, NULL, 'prueba123@gmail.com', '$2a$08$0sUaAJq8hFOJpwJ2WxKweOupR2ngPoThh.IxPwTxWsPB4rurQCPFm', '', 0),
(12, 'Jonan Pérez', 'Jon256', 55877, NULL, 'juan.p@gmail.com', '$2a$08$9rnQ4kjjIKY6XWAkFZR2kOZAodAqvi1BDHQj7E43tc13GluihlaXW', '', 0),
(13, 'Erika Ross', '123Bri', 5489, NULL, '123@gmail.com', '$2a$08$Di28qdHyT2UUBvDrc4F8P.26UG.Tv94WzYOdpybPxdoCQRbYqjFyC', '1747845930552.jpg', 0),
(14, 'brian nicolas damer', 'damer1990', 35323956, NULL, 'bnd@gmail.com', '$2a$08$DGOovQOHy0p1BtfABbVEculik9GRIOKeGtH9VtlIAl2//wIli3ZY.', '', 1),
(15, 'alan', 'asdeer', 754721354, NULL, 'brier@gmail.com', '$2a$08$wDBsSMBurE.nYRclKCtEeOwrZUaVoGFiY33JQ5visSzfkqaCH09/2', '', 0);

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
-- Indices de la tabla `lentes`
--
ALTER TABLE `lentes`
  ADD PRIMARY KEY (`idLentes`),
  ADD KEY `lentes_ibfk_1` (`marca_id`);

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
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accesorios`
--
ALTER TABLE `accesorios`
  MODIFY `idAccesorios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `camaras`
--
ALTER TABLE `camaras`
  MODIFY `idCamaras` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `fotografos`
--
ALTER TABLE `fotografos`
  MODIFY `idFotografo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
-- AUTO_INCREMENT de la tabla `lentes`
--
ALTER TABLE `lentes`
  MODIFY `idLentes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `idMarcas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  MODIFY `idResenas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `tecnicas`
--
ALTER TABLE `tecnicas`
  MODIFY `idTecnica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
-- Filtros para la tabla `lentes`
--
ALTER TABLE `lentes`
  ADD CONSTRAINT `lentes_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`idMarcas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD CONSTRAINT `fk_lentes_resenas` FOREIGN KEY (`fkLentes`) REFERENCES `lentes` (`idLentes`),
  ADD CONSTRAINT `fk_reseñas_accesorios` FOREIGN KEY (`fkAccesorios`) REFERENCES `accesorios` (`idAccesorios`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reseñas_camaras` FOREIGN KEY (`fkCamaras`) REFERENCES `camaras` (`idCamaras`) ON DELETE CASCADE,
  ADD CONSTRAINT `reseñas_ibfk_1` FOREIGN KEY (`fkUsuarioResenas`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
