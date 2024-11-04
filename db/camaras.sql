-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-11-2024 a las 21:19:44
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
  `fkReseñas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `accesorios`
--

INSERT INTO `accesorios` (`idAccesorios`, `nombreAccesorios`, `descripcionAccesorios`, `tipoAccesorios`, `precioAccesorios`, `fk_marcas`, `fkReseñas`) VALUES
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
  `fkReseñas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `camaras`
--

INSERT INTO `camaras` (`idCamaras`, `modeloCamaras`, `tipoCamaras`, `sensorCamaras`, `resolucionCamaras`, `isoMinCamaras`, `isoMaxCamaras`, `marca_id`, `precioCamaras`, `fkReseñas`) VALUES
(11, 'Nikon D7500', 'DSLR', 'APS-C', 20.90, 100, 51200, 1, 1200.00, NULL),
(12, 'Canon EOS R5', 'Mirrorless', 'Full-frame', 45.00, 100, 51200, 2, 3900.00, NULL),
(13, 'Sony A7 III', 'Mirrorless', 'Full-frame', 24.20, 100, 51200, 3, 2000.00, NULL),
(14, 'Nikon Z6 II', 'Mirrorless', 'Full Frame', 24.50, 100, 51200, 1, 2000.00, NULL),
(15, 'Canon EOS M50 Mark II', 'Mirrorless', 'APS-C', 24.10, 100, 25600, 2, 700.00, NULL),
(16, 'Nikon D5600', 'DSRL', 'APS-C', 14.00, 100, 25600, 3, 800.00, NULL),
(17, 'Nikon D850', 'DSLR', 'Full Frame', 45.70, 64, 25600, 1, 3000.00, NULL),
(18, 'Canon EOS 90D', 'DSLR', 'APS-C', 32.50, 100, 51200, 2, 1200.00, NULL),
(19, 'Sony A7R IV', 'Mirrorless', 'Full Frame', 61.00, 100, 32000, 3, 3500.00, NULL),
(20, 'Nikon Z7 II', 'Mirrorless', 'Full Frame', 45.70, 64, 25600, 1, 3000.00, NULL),
(21, 'Canon EOS Rebel T7', 'DSLR', 'APS-C', 24.10, 100, 6400, 2, 400.00, NULL),
(23, 'Nikon D3100', 'DSRL', 'APS-C', 14.00, 100, 5600, NULL, 300.00, NULL);

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
  `distanciaFocalLentes` decimal(5,1) DEFAULT NULL,
  `marca_id` int(11) DEFAULT NULL,
  `precioLentes` decimal(10,2) DEFAULT NULL,
  `fkReseñas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lentes`
--

INSERT INTO `lentes` (`idLentes`, `modeloLentes`, `tipoLentes`, `aperturaMinLentes`, `aperturaMaxLentes`, `distanciaFocalLentes`, `marca_id`, `precioLentes`, `fkReseñas`) VALUES
(7, 'Nikkor 24-70mm f/2.8', 'Zoom', 0.00, 0.00, 24.0, 1, 1800.00, NULL),
(8, 'Canon EF 50mm f/1.8 STM', 'Prime', 0.00, 0.00, 50.0, 2, 125.00, NULL),
(9, 'Sony FE 70-200mm f/4 G OSS', 'Zoom', 0.00, 0.00, 70.0, 3, 1500.00, NULL),
(10, 'Nikon AF-S 50mm f/1.8G', 'Prime', 1.80, 16.00, 50.0, 1, 200.00, NULL),
(11, 'Canon EF 24-70mm f/2.8L II USM', 'Zoom', 2.80, 22.00, 24.0, 2, 1600.00, NULL),
(12, 'Sony FE 85mm f/1.4 GM', 'Prime', 1.40, 16.00, 85.0, 3, 1800.00, NULL),
(13, 'Nikon AF-P DX 70-300mm f/4.5-6.3G', 'Zoom', 4.50, 22.00, 70.0, 1, 400.00, NULL),
(14, 'Nikon AF-S 17 - 55mm f/2.8G', 'Prime Zoom', 2.80, 22.00, 17.0, 1, 700.00, NULL),
(15, 'Sony E 16-55mm f/2.8 G', 'Zoom', 2.80, 22.00, 16.0, 3, 1400.00, NULL);

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
  `idReseñas` int(11) NOT NULL,
  `fkUsuarioReseñas` int(11) NOT NULL,
  `comentarioReseñas` varchar(500) DEFAULT NULL,
  `fechaComentarioReseñas` date NOT NULL,
  `imagenReseñas` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reseñas`
--

INSERT INTO `reseñas` (`idReseñas`, `fkUsuarioReseñas`, `comentarioReseñas`, `fechaComentarioReseñas`, `imagenReseñas`) VALUES
(1, 1, 'Excelente producto, muy recomendable.', '2024-11-01', NULL),
(2, 2, 'Buena calidad, pero el precio es un poco alto.', '2024-11-02', NULL),
(3, 3, 'Me encanta, ha superado mis expectativas.', '2024-11-03', NULL),
(4, 4, 'Funciona bien, aunque el manual es confuso.', '2024-11-04', NULL),
(5, 5, 'La calidad de los cristales es pobre,posee mucha aberracion cromatica.', '2024-11-22', NULL),
(6, 6, 'No lo recomendaría, tuvo varios problemas.', '2024-11-06', NULL),
(11, 1, 'Excelente calidad de imagen, los colores son vibrantes.', '2024-10-20', NULL),
(12, 2, 'El lente es un poco pesado, pero la nitidez es increíble.', '2024-10-21', NULL),
(13, 3, 'La cámara es compacta y fácil de usar, ideal para principiantes.', '2024-10-22', NULL),
(14, 4, 'Esperaba mejor rendimiento en situaciones de poca luz.', '2024-10-23', NULL),
(15, 5, 'La relación calidad-precio de este lente es insuperable.', '2024-10-24', NULL),
(16, 1, 'El sistema de enfoque es rápido y preciso.', '2024-10-25', NULL),
(17, 2, 'Buena calidad de construcción, aunque es algo caro.', '2024-10-26', NULL),
(18, 3, 'Ideal para grabar videos, estabilización excelente.', '2024-10-27', NULL),
(19, 4, 'La duración de la batería podría ser mejor.', '2024-10-28', NULL),
(20, 5, 'Muy versátil para fotografía de paisaje y retrato.', '2024-10-29', NULL);

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
  `img_usuarios` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreCompletoUsuario`, `aliasUsuario`, `DniUsuario`, `ultimoLogeoUsuario`, `emailUsuario`, `passwordUsuario`, `img_usuarios`) VALUES
(1, 'Juan Carlos Lopez', 'Juan_002', 25256485, '2024-10-18 14:30:00', 'jcl@gmail.com', '$2a$08$sgL5uP69/CDuETtLE6hDOux0xu1NwovDIVETmfCNKNodeM6nuWk0a', NULL),
(2, 'María Fernández', 'mari22', 87654321, NULL, 'mf@gmail.com', '$2a$08$aC7vbJSl3H.MGrsT4WlyJeSBmCjoW5RJVGHRH/dpbfyy0DsDbfeuO', NULL),
(3, 'Maria Eugenia', 'lupe_g', 11223344, '2024-10-17 09:15:00', 'gg@gmail.com', '$2a$08$pmPtsCLCcFA8IBkwi.xcr.Izi6dITuwZFX6kdafgq.ybD8X.m.soa', NULL),
(4, 'Pedro Sánchez', 'pedro.87', 22334455, NULL, 'ps@gmail.com', '$2a$08$TXAZS1ZFYng/.BvtkSXrHuCcEyaYRy0YL/yYvCtu3oGbCBE/ZFMFC', NULL),
(5, 'Ana Martínez', 'ana_m', 33445566, '2024-10-19 08:00:00', 'am@gmail.com', '$2a$08$KGVvKNJw9VGjXPh8Pg25nu9AjmWQ1NWF319zhrLzVTzVP2xnObCku', NULL),
(6, 'Jonatan Pérez', 'Jon56', 55448877, NULL, 'juan.perez@gmail.com', '$2a$08$s8PitjAWfAOzCeRRfZJGfOtlXblECauNnWttg64.MvbglXKVC0QN.', NULL),
(8, 'Anita Ross', 'A64', 5489, NULL, 'a@gmail.com', '$2a$08$RSx40gn8GE7iCYcdyEUI6e07HtafRUzvKddcYUlVMoQSry2UygVDG', '1730668934660.jpg'),
(9, 'Prueba 1122', 'Prueba', 448484, NULL, 'prueba@gmail.com', '$2a$08$kzObm8VQLUXrseRDnicHI.Fluy.mpavBfFQfNuJEpGLjpNY7BNq/C', ''),
(10, 'Erika Ross', '123eli', 5489, NULL, 'b@gmail.com', '$2a$08$lXADqdsiyNMozBcyQwmCcetD3ILZoSQX77XgNg39YFQeyxvbcBqke', '1730751498399.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accesorios`
--
ALTER TABLE `accesorios`
  ADD PRIMARY KEY (`idAccesorios`),
  ADD KEY `accesorios_ibfk_1` (`fk_marcas`) USING BTREE,
  ADD KEY `reseñas_ibfk_1` (`fkReseñas`);

--
-- Indices de la tabla `camaras`
--
ALTER TABLE `camaras`
  ADD PRIMARY KEY (`idCamaras`),
  ADD KEY `camaras_ibfk_1` (`marca_id`) USING BTREE,
  ADD KEY `reseñas_ibfk_2` (`fkReseñas`) USING BTREE;

--
-- Indices de la tabla `lentes`
--
ALTER TABLE `lentes`
  ADD PRIMARY KEY (`idLentes`),
  ADD KEY `lentes_ibfk_1` (`marca_id`),
  ADD KEY `reseñas_ibfk_1` (`fkReseñas`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`idMarcas`);

--
-- Indices de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD PRIMARY KEY (`idReseñas`),
  ADD KEY `reseñas_ibfk_1` (`fkUsuarioReseñas`);

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
-- AUTO_INCREMENT de la tabla `lentes`
--
ALTER TABLE `lentes`
  MODIFY `idLentes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `idMarcas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  MODIFY `idReseñas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accesorios`
--
ALTER TABLE `accesorios`
  ADD CONSTRAINT `accesorios_ibfk_1` FOREIGN KEY (`fk_marcas`) REFERENCES `marcas` (`idMarcas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reseñas_fk` FOREIGN KEY (`fkReseñas`) REFERENCES `reseñas` (`idReseñas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `camaras`
--
ALTER TABLE `camaras`
  ADD CONSTRAINT `camaras_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`idMarcas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reseñas_fk2` FOREIGN KEY (`fkReseñas`) REFERENCES `reseñas` (`idReseñas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `lentes`
--
ALTER TABLE `lentes`
  ADD CONSTRAINT `lentes_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`idMarcas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reseñas_fk3` FOREIGN KEY (`fkReseñas`) REFERENCES `reseñas` (`idReseñas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD CONSTRAINT `reseñas_ibfk_1` FOREIGN KEY (`fkUsuarioReseñas`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
