-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-10-2024 a las 01:45:19
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
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `accesorios`
--

INSERT INTO `accesorios` (`id`, `nombre`, `descripcion`, `tipo`, `precio`) VALUES
(1, 'Trípode Profesional', 'Trípode de aluminio para cámaras DSLR', 'Trípode', 150.00),
(2, 'Flash Externo', 'Flash de alta potencia para fotografía profesional', 'Flash', 300.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camaras`
--

CREATE TABLE `camaras` (
  `id` int(11) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `sensor` varchar(50) DEFAULT NULL,
  `resolucion_mp` decimal(5,2) DEFAULT NULL,
  `iso_min` int(11) DEFAULT NULL,
  `iso_max` int(11) DEFAULT NULL,
  `marca_id` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `camaras`
--

INSERT INTO `camaras` (`id`, `modelo`, `tipo`, `sensor`, `resolucion_mp`, `iso_min`, `iso_max`, `marca_id`, `precio`) VALUES
(1, 'D7500', 'DSLR', 'APS-C', 20.90, 100, 51200, 1, 1200.00),
(2, 'Canon EOS R5', 'Mirrorless', 'Full-Frame', 45.00, 100, 102400, 2, 3899.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lentes`
--

CREATE TABLE `lentes` (
  `id` int(11) NOT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `apertura_min` decimal(4,2) DEFAULT NULL,
  `apertura_max` decimal(4,2) DEFAULT NULL,
  `distancia_focal_mm` decimal(5,1) DEFAULT NULL,
  `marca_id` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lentes`
--

INSERT INTO `lentes` (`id`, `modelo`, `tipo`, `apertura_min`, `apertura_max`, `distancia_focal_mm`, `marca_id`, `precio`) VALUES
(1, 'Nikkor 50mm f/1.8G', 'Prime', 1.80, 16.00, 50.0, 1, 220.00),
(3, 'Nikkor 50mm f/1.8G', 'Prime', 1.80, 16.00, 50.0, 1, 220.00),
(4, 'Canon RF 24-70mm f/2.8L', 'Zoom', 2.80, 22.00, 24.0, 2, 2299.00),
(5, 'Tokina 11-20 2.8 II', 'Angular Zoom', 2.80, 22.00, 11.0, 2, 500.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `pais_origen` varchar(100) DEFAULT NULL,
  `fecha_fundacion` year(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id`, `nombre`, `pais_origen`, `fecha_fundacion`) VALUES
(1, 'Nikon', 'Japón', '1917'),
(2, 'Canon', 'Japón', '1937'),
(3, 'Sony', 'Japón', '1946'),
(4, 'Nikon', 'Japón', '1917'),
(5, 'Canon', 'Japón', '1937'),
(6, 'Sony', 'Japón', '1946');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accesorios`
--
ALTER TABLE `accesorios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `camaras`
--
ALTER TABLE `camaras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `marca_id` (`marca_id`);

--
-- Indices de la tabla `lentes`
--
ALTER TABLE `lentes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accesorios`
--
ALTER TABLE `accesorios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `camaras`
--
ALTER TABLE `camaras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `lentes`
--
ALTER TABLE `lentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `camaras`
--
ALTER TABLE `camaras`
  ADD CONSTRAINT `camaras_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`id`);

--
-- Filtros para la tabla `lentes`
--
ALTER TABLE `lentes`
  ADD CONSTRAINT `lentes_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
