-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-10-2024 a las 20:19:20
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
  `fkReseñas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(13, 'Sony A7 III', 'Mirrorless', 'Full-frame', 24.20, 100, 51200, 3, 2000.00, NULL);

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
(9, 'Sony FE 70-200mm f/4 G OSS', 'Zoom', 0.00, 0.00, 70.0, 3, 1500.00, NULL);

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
(3, 'Sony', 'Japón', '1946');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reseñas`
--

CREATE TABLE `reseñas` (
  `idReseñas` int(11) NOT NULL,
  `fkUsuarioReseñas` int(11) NOT NULL,
  `comentarioReseñas` varchar(500) DEFAULT NULL,
  `fechaComentarioReseñas` date NOT NULL,
  `imagenReseñas` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `passwordUsuario` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreCompletoUsuario`, `aliasUsuario`, `DniUsuario`, `ultimoLogeoUsuario`, `emailUsuario`, `passwordUsuario`) VALUES
(1, 'Juan Carlos López', 'jcl01', 12345678, '2024-10-18 14:30:00', 'jcl@gmail.com', '$2a$08$sgL5uP69/CDuETtLE6hDOux0xu1NwovDIVETmfCNKNodeM6nuWk0a'),
(2, 'María Fernández', 'mari22', 87654321, NULL, 'mf@gmail.com', '$2a$08$aC7vbJSl3H.MGrsT4WlyJeSBmCjoW5RJVGHRH/dpbfyy0DsDbfeuO'),
(3, 'Guadalupe García', 'lupe_g', 11223344, '2024-10-17 09:15:00', 'gg@gmail.com', '$2a$08$pmPtsCLCcFA8IBkwi.xcr.Izi6dITuwZFX6kdafgq.ybD8X.m.soa'),
(4, 'Pedro Sánchez', 'pedro.87', 22334455, NULL, 'ps@gmail.com', '$2a$08$TXAZS1ZFYng/.BvtkSXrHuCcEyaYRy0YL/yYvCtu3oGbCBE/ZFMFC'),
(5, 'Ana Martínez', 'ana_m', 33445566, '2024-10-19 08:00:00', 'am@gmail.com', '$2a$08$KGVvKNJw9VGjXPh8Pg25nu9AjmWQ1NWF319zhrLzVTzVP2xnObCku');

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
  MODIFY `idAccesorios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `camaras`
--
ALTER TABLE `camaras`
  MODIFY `idCamaras` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `lentes`
--
ALTER TABLE `lentes`
  MODIFY `idLentes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `idMarcas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
