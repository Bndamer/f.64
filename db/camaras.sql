-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-10-2024 a las 22:11:51
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
  `fkReseñas` int(11) NOT NULL
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
  `aperturaMaxLantes` decimal(4,2) DEFAULT NULL,
  `distanciaFocalLentes` decimal(5,1) DEFAULT NULL,
  `marca_id` int(11) DEFAULT NULL,
  `precioLentes` decimal(10,2) DEFAULT NULL,
  `fkReseñas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(4, 'Nikon', 'Japón', '1917'),
(5, 'Canon', 'Japón', '1937'),
(6, 'Sony', 'Japón', '1946');

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
  `DniUsuario` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `idCamaras` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `lentes`
--
ALTER TABLE `lentes`
  MODIFY `idLentes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `idMarcas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
