-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 29-08-2025 a las 19:31:27
-- Versión del servidor: 10.6.23-MariaDB
-- Versión de PHP: 8.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `megashop_hdm`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adm_bitacora`
--

CREATE TABLE `adm_bitacora` (
  `id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) DEFAULT NULL,
  `tipo` varchar(60) NOT NULL,
  `modulo` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `ip` varchar(64) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `adm_bitacora`
--

INSERT INTO `adm_bitacora` (`id`, `usuario_id`, `tipo`, `modulo`, `descripcion`, `ip`, `user_agent`, `created_at`) VALUES
(1, 1, 'LOGIN', 'Seguridad', 'Inicio de sesión exitoso.', '192.168.1.100', NULL, '2025-08-27 09:07:50'),
(2, 3, 'CREACION', 'Ventas', 'Se creó el presupuesto P-2023-001.', '200.5.10.15', NULL, '2025-08-27 09:07:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alm_almacenes`
--

CREATE TABLE `alm_almacenes` (
  `id` bigint(20) NOT NULL,
  `clave` varchar(30) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `direccion` varchar(300) DEFAULT NULL,
  `tipo` enum('PRINCIPAL','SUCURSAL','BODEGA','TRANSITO') NOT NULL DEFAULT 'PRINCIPAL',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `alm_almacenes`
--

INSERT INTO `alm_almacenes` (`id`, `clave`, `nombre`, `direccion`, `tipo`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ALM-CEN', 'Almacén Central', NULL, 'PRINCIPAL', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(2, 'BOD-TEC', 'Bodega de Técnicos', NULL, 'BODEGA', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alm_coordenada`
--

CREATE TABLE `alm_coordenada` (
  `id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  `almacen_id` bigint(20) NOT NULL,
  `seccion_id` bigint(20) DEFAULT NULL,
  `codigo_coordenada` varchar(80) NOT NULL,
  `visible` tinyint(1) NOT NULL,
  `fecha_alta` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_caducidad` date DEFAULT NULL,
  `cantidad` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `alm_coordenada`
--

INSERT INTO `alm_coordenada` (`id`, `producto_id`, `almacen_id`, `seccion_id`, `codigo_coordenada`, `visible`, `fecha_alta`, `fecha_caducidad`, `cantidad`) VALUES
(1, 1, 1, 1, 'LOTE-PANT-2308-01', 1, '2025-08-27 09:07:50', NULL, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alm_secciones`
--

CREATE TABLE `alm_secciones` (
  `id` bigint(20) NOT NULL,
  `almacen_id` bigint(20) NOT NULL,
  `clave` varchar(30) NOT NULL,
  `nombre` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `alm_secciones`
--

INSERT INTO `alm_secciones` (`id`, `almacen_id`, `clave`, `nombre`) VALUES
(1, 1, 'A1', 'Anaquel A1 - Pantallas'),
(2, 1, 'A2', 'Anaquel A2 - Baterías'),
(3, 2, 'T1', 'Cajón Técnico 1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alm_traslados`
--

CREATE TABLE `alm_traslados` (
  `id` bigint(20) NOT NULL,
  `folio` varchar(30) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `almacen_origen_id` bigint(20) NOT NULL,
  `almacen_destino_id` bigint(20) NOT NULL,
  `estado` enum('BORRADOR','EN_TRANSITO','RECIBIDO','CANCELADO') NOT NULL DEFAULT 'BORRADOR',
  `creado_por` bigint(20) DEFAULT NULL,
  `recibido_por` bigint(20) DEFAULT NULL,
  `notas` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `alm_traslados`
--

INSERT INTO `alm_traslados` (`id`, `folio`, `fecha`, `almacen_origen_id`, `almacen_destino_id`, `estado`, `creado_por`, `recibido_por`, `notas`) VALUES
(1, 'TRAS-001', '2025-08-27 09:07:50', 1, 2, 'EN_TRANSITO', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alm_traslados_det`
--

CREATE TABLE `alm_traslados_det` (
  `id` bigint(20) NOT NULL,
  `traslado_id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  `lote_id` bigint(20) DEFAULT NULL,
  `cantidad` decimal(12,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `alm_traslados_det`
--

INSERT INTO `alm_traslados_det` (`id`, `traslado_id`, `producto_id`, `lote_id`, `cantidad`) VALUES
(1, 1, 2, NULL, 5.0000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_categorias_producto`
--

CREATE TABLE `cat_categorias_producto` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `tipo` enum('EQUIPO','REFACCION','ACCESORIO','HERRAMIENTA','SERVICIO') NOT NULL DEFAULT 'REFACCION',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat_categorias_producto`
--

INSERT INTO `cat_categorias_producto` (`id`, `nombre`, `tipo`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Pantallas', 'REFACCION', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(2, 'Baterías', 'REFACCION', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(3, 'Cables USB-C', 'ACCESORIO', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(4, 'Mano de Obra', 'SERVICIO', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(5, 'Smartphones', 'EQUIPO', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(6, 'Herramientas de Precisión', 'HERRAMIENTA', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_herramientas`
--

CREATE TABLE `cat_herramientas` (
  `id` bigint(20) NOT NULL,
  `sku` varchar(80) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `requiere_calibracion` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  `asignada_empleado_id` int(11) DEFAULT NULL,
  `estado` enum('DISPONIBLE','VENDIDO','ASIGNADO','EN_SERVICIO','BAJA') NOT NULL DEFAULT 'DISPONIBLE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat_herramientas`
--

INSERT INTO `cat_herramientas` (`id`, `sku`, `nombre`, `descripcion`, `requiere_calibracion`, `created_at`, `updated_at`, `deleted_at`, `asignada_empleado_id`, `estado`) VALUES
(1, 'HER-001', 'Kit de desarmadores de precisión iFixit', NULL, 0, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL, NULL, 'DISPONIBLE'),
(2, 'HER-002', 'Estación de calor para soldadura', NULL, 1, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL, NULL, 'DISPONIBLE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_manuales`
--

CREATE TABLE `cat_manuales` (
  `id` bigint(20) NOT NULL,
  `producto_id` bigint(20) DEFAULT NULL,
  `titulo` varchar(200) NOT NULL,
  `url_pdf` varchar(500) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat_manuales`
--

INSERT INTO `cat_manuales` (`id`, `producto_id`, `titulo`, `url_pdf`, `descripcion`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Guía de Reemplazo de Pantalla iPhone 14 Pro', 'https://manuales.taller.com/pant_ip14p.pdf', NULL, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_marcas`
--

CREATE TABLE `cat_marcas` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `pais_origen` varchar(120) DEFAULT NULL,
  `sitio_web` varchar(255) DEFAULT NULL,
  `marca_tipo` enum('E','C','','') NOT NULL DEFAULT 'E',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat_marcas`
--

INSERT INTO `cat_marcas` (`id`, `nombre`, `pais_origen`, `sitio_web`, `marca_tipo`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Apple', 'EE.UU.', NULL, 'E', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(2, 'Samsung', 'Corea del Sur', NULL, 'E', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(3, 'Xiaomi', 'China', NULL, 'E', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(4, 'Motorola', 'EE.UU.', NULL, 'E', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(5, 'OPPO', 'China', 'https://www.oppo.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(6, 'vivo', 'China', 'https://www.vivo.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(7, 'Huawei', 'China', 'https://www.huawei.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(8, 'Honor', 'China', 'https://www.honor.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(9, 'OnePlus', 'China', 'https://www.oneplus.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(10, 'Google Pixel', 'EE.UU.', 'https://store.google.com/category/phones', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(11, 'Sony Xperia', 'Japón', 'https://www.sony.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(12, 'ASUS', 'Taiwán', 'https://www.asus.com/phones/', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(13, 'ZTE', 'China', 'https://www.zte.com.cn', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(14, 'TCL', 'China', 'https://www.tcl.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(15, 'Alcatel', 'Francia/China', 'https://www.alcatelmobile.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(16, 'realme', 'China', 'https://www.realme.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(17, 'Infinix', 'China', 'https://www.infinixmobility.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(18, 'TECNO', 'China', 'https://www.tecno-mobile.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(19, 'Meizu', 'China', 'https://www.meizu.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(20, 'Lenovo', 'China', 'https://www.lenovo.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(21, 'Nokia (HMD)', 'Finlandia', 'https://www.hmd.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(22, 'HMD', 'Finlandia', 'https://www.hmd.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(23, 'Sharp Aquos', 'Japón', 'https://global.sharp/products/', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(24, 'Kyocera', 'Japón', 'https://www.kyocera.co.jp', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(25, 'Fairphone', 'Países Bajos', 'https://www.fairphone.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(26, 'Nothing', 'Reino Unido', 'https://nothing.tech', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(27, 'Ulefone', 'China', 'https://www.ulefone.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(28, 'DOOGEE', 'China', 'https://www.doogee.cc', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(29, 'Oukitel', 'China', 'https://www.oukitel.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(30, 'AGM', 'China', 'https://www.agmmobile.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(31, 'nubia', 'China', 'https://www.nubia.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(32, 'RedMagic', 'China', 'https://na.redmagic.gg', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(33, 'iQOO', 'China', 'https://www.iqoo.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(34, 'POCO', 'China', 'https://www.po.co', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(35, 'itel', 'China', 'https://www.itel-life.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(36, 'Energizer', 'Francia', 'https://www.energizeyourdevice.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(37, 'BLU', 'EE.UU.', 'https://www.bluproducts.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(38, 'Wiko', 'Francia/China', 'https://www.wikomobile.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(39, 'Coolpad', 'China', 'https://www.coolpad.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(40, 'Hisense', 'China', 'https://www.hisense.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(41, 'Panasonic', 'Japón', 'https://www.panasonic.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(42, 'Lanix', 'México', 'https://www.lanix.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(43, 'M4 (M4Tel)', 'México', 'https://www.m4tel.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(44, 'Zuum', 'México', 'https://www.zuum.mx', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(45, 'Verykool', 'EE.UU./LatAm', 'https://www.verykool.net', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(46, 'YEZZ', 'EE.UU./LatAm', 'https://www.yezz.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(47, 'Avvio', 'Colombia', 'https://www.avviomobile.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(48, 'BGH', 'Argentina', 'https://www.bgh.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(49, 'Noblex', 'Argentina', 'https://www.noblex.com.ar', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(50, 'Multilaser', 'Brasil', 'https://www.multilaser.com.br', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(51, 'Positivo', 'Brasil', 'https://www.positivotecnologia.com.br', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(52, 'Quantum (Brasil)', 'Brasil', 'https://www.meuquantum.com.br', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(53, 'Micromax', 'India', 'https://www.micromaxinfo.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(54, 'Lava', 'India', 'https://www.lavamobiles.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(55, 'Karbonn', 'India', 'https://www.karbonnmobiles.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(56, 'Intex', 'India', 'https://www.intex.in', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(57, 'LG (discontinuado)', 'Corea del Sur', 'https://www.lg.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(58, 'BlackBerry (histórico)', 'Canadá', 'https://www.blackberry.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(59, 'BQ (histórico)', 'España', 'https://www.bq.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(60, 'Palm (histórico)', 'EE.UU.', 'https://palm.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(61, 'Acer (histórico)', 'Taiwán', 'https://www.acer.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(62, 'HP (histórico)', 'EE.UU.', 'https://www.hp.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(63, 'Philips (histórico)', 'Países Bajos', 'https://www.philips.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(64, 'Siemens (histórico)', 'Alemania', 'https://www.siemens.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(65, 'Sagem (histórico)', 'Francia', 'https://www.sagem.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(66, 'Vsmart (histórico)', 'Vietnam', 'https://www.vsmart.net', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(67, 'Gionee', 'China', 'http://www.gionee.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(68, 'Elephone', 'China', 'https://www.elephone.hk', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(69, 'CUBOT', 'China', 'https://www.cubot.net', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(70, 'UMIDIGI', 'China', 'https://www.umidigi.com', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(71, 'HOMTOM', 'China', 'http://www.homtom.cc', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(72, 'Blackview', 'China', 'https://www.blackview.hk', 'E', '2025-08-29 16:31:32', '2025-08-29 16:31:32', NULL),
(73, 'Qualcomm', 'EE.UU.', 'https://www.qualcomm.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(74, 'MediaTek', 'Taiwán', 'https://www.mediatek.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(75, 'Apple Silicon', 'EE.UU.', 'https://www.apple.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(76, 'Samsung Exynos', 'Corea del Sur', 'https://semiconductor.samsung.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(77, 'HiSilicon (Kirin)', 'China', 'https://www.hisilicon.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(78, 'UNISOC', 'China', 'https://www.unisoc.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(79, 'Rockchip', 'China', 'https://www.rock-chips.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(80, 'Broadcom', 'EE.UU.', 'https://www.broadcom.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(81, 'Marvell', 'EE.UU.', 'https://www.marvell.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(82, 'Intel (módem histórico)', 'EE.UU.', 'https://www.intel.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(83, 'Qorvo', 'EE.UU.', 'https://www.qorvo.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(84, 'Skyworks', 'EE.UU.', 'https://www.skyworksinc.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(85, 'Murata', 'Japón', 'https://corporate.murata.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(86, 'NXP', 'Países Bajos', 'https://www.nxp.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(87, 'STMicroelectronics', 'Suiza/Francia', 'https://www.st.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(88, 'Texas Instruments', 'EE.UU.', 'https://www.ti.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(89, 'Cirrus Logic', 'EE.UU.', 'https://www.cirrus.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(90, 'Realtek', 'Taiwán', 'https://www.realtek.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(91, 'Samsung Display', 'Corea del Sur', 'https://www.samsungdisplay.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(92, 'LG Display', 'Corea del Sur', 'https://www.lgdisplay.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(93, 'BOE', 'China', 'https://www.boe.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(94, 'Tianma', 'China', 'https://www.tianma.cn', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(95, 'AUO', 'Taiwán', 'https://www.auo.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(96, 'Innolux', 'Taiwán', 'https://www.innolux.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(97, 'Japan Display Inc. (JDI)', 'Japón', 'https://www.j-display.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(98, 'Sharp Displays', 'Japón', 'https://global.sharp/products/', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(99, 'Visionox', 'China', 'https://www.visionox.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(100, 'CSOT (TCL China Star)', 'China', 'https://www.tclcsot.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(101, 'Corning (Gorilla Glass)', 'EE.UU.', 'https://www.corning.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(102, 'SCHOTT', 'Alemania', 'https://www.schott.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(103, 'AGC (Asahi Glass)', 'Japón', 'https://www.agc.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(104, 'Nippon Electric Glass (NEG)', 'Japón', 'https://www.neg.co.jp', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(105, 'Sony Semiconductor (IMX)', 'Japón', 'https://www.sony-semicon.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(106, 'Samsung ISOCELL', 'Corea del Sur', 'https://semiconductor.samsung.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(107, 'OmniVision', 'EE.UU./China', 'https://www.ovt.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(108, 'onsemi (Aptina)', 'EE.UU.', 'https://www.onsemi.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(109, 'SK hynix (sensores)', 'Corea del Sur', 'https://www.skhynix.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(110, 'Sunny Optical', 'China', 'http://www.sunnyoptical.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(111, 'O-Film', 'China', 'http://en.o-film.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(112, 'Largan Precision (lentes)', 'Taiwán', 'https://www.largan.com.tw', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(113, 'Genius Electronic Optical', 'Taiwán', 'https://www.genius.com.tw', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(114, 'AAC Optics', 'China', 'https://www.aactechnologies.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(115, 'Samsung Memory', 'Corea del Sur', 'https://semiconductor.samsung.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(116, 'SK hynix', 'Corea del Sur', 'https://www.skhynix.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(117, 'Micron', 'EE.UU.', 'https://www.micron.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(118, 'Kioxia (Toshiba)', 'Japón', 'https://www.kioxia.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(119, 'Western Digital / SanDisk', 'EE.UU.', 'https://www.westerndigital.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(120, 'ATL (Amperex Tech)', 'China', 'https://www.atlbattery.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(121, 'BYD Battery', 'China', 'https://www.byd.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(122, 'Sunwoda', 'China', 'https://www.sunwoda.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(123, 'LG Energy Solution', 'Corea del Sur', 'https://www.lgensol.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(124, 'Samsung SDI', 'Corea del Sur', 'https://www.samsungsdi.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(125, 'Panasonic Energy', 'Japón', 'https://www.panasonic.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(126, 'Desay Battery', 'China', 'http://www.desay.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(127, 'Simplo', 'Taiwán', 'https://www.simplo.com.tw', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(128, 'Coslight', 'China', 'http://en.coslight.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(129, 'SCUD', 'China', 'http://www.scudgroup.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(130, 'Goodix', 'China', 'https://www.goodix.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(131, 'Egis Technology', 'Taiwán', 'https://www.egistec.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(132, 'Synaptics', 'EE.UU.', 'https://www.synaptics.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(133, 'GIS (General Interface Solution)', 'Taiwán', 'https://www.gis.com.tw', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(134, 'TPK', 'Taiwán', 'https://www.tpky.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(135, 'AAC Technologies', 'China', 'https://www.aactechnologies.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(136, 'Goertek', 'China', 'https://www.goertek.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(137, 'Knowles', 'EE.UU.', 'https://www.knowles.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(138, 'Foxconn (Hon Hai)', 'Taiwán', 'https://www.honhai.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(139, 'Pegatron', 'Taiwán', 'https://www.pegatroncorp.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(140, 'Wistron', 'Taiwán', 'https://www.wistron.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(141, 'Compal', 'Taiwán', 'https://www.compal.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(142, 'Flex', 'EE.UU.', 'https://flex.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(143, 'BYD Electronics', 'China', 'https://www.bydelectronics.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(144, 'Catcher Technology', 'Taiwán', 'http://www.catcher.com.tw', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(145, 'Luxshare-ICT', 'China', 'https://www.luxshare-ict.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(146, 'Foxlink', 'Taiwán', 'https://www.foxlink.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(147, 'Molex', 'EE.UU.', 'https://www.molex.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(148, 'Amphenol', 'EE.UU.', 'https://www.amphenol.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(149, 'TE Connectivity', 'Suiza', 'https://www.te.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(150, 'JAE', 'Japón', 'https://www.jae.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(151, 'u-blox (GNSS)', 'Suiza', 'https://www.u-blox.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(152, '3M (adhesivos/películas)', 'EE.UU.', 'https://www.3m.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(153, 'Shin-Etsu (silicona térmica)', 'Japón', 'https://www.shinetsu.co.jp', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(154, 'Nidec (motores hápticos)', 'Japón', 'https://www.nidec.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(155, 'Everlight (LED)', 'Taiwán', 'https://www.everlight.com', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL),
(156, 'Holitech (módulos)', 'China', 'http://www.holitech.net', 'E', '2025-08-29 16:35:17', '2025-08-29 16:35:17', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_modelos`
--

CREATE TABLE `cat_modelos` (
  `id` bigint(20) NOT NULL,
  `marca_id` bigint(20) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `anio` smallint(6) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat_modelos`
--

INSERT INTO `cat_modelos` (`id`, `marca_id`, `nombre`, `anio`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'iPhone 14 Pro', 2022, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(2, 1, 'iPhone 15 Pro Max', 2023, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(3, 2, 'Galaxy S23 Ultra', 2023, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(4, 3, 'Redmi Note 12', 2023, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_productos`
--

CREATE TABLE `cat_productos` (
  `id` bigint(20) NOT NULL,
  `sku` varchar(80) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `categoria_id` bigint(20) NOT NULL,
  `marca_id` bigint(20) DEFAULT NULL,
  `modelo_id` bigint(20) DEFAULT NULL,
  `version_id` bigint(20) DEFAULT NULL,
  `unidad` varchar(20) NOT NULL DEFAULT 'PZA',
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `es_serie` tinyint(1) NOT NULL DEFAULT 0,
  `precio_lista` decimal(12,2) NOT NULL DEFAULT 0.00,
  `costo_promedio` decimal(12,4) NOT NULL DEFAULT 0.0000,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat_productos`
--

INSERT INTO `cat_productos` (`id`, `sku`, `nombre`, `descripcion`, `categoria_id`, `marca_id`, `modelo_id`, `version_id`, `unidad`, `activo`, `es_serie`, `precio_lista`, `costo_promedio`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'PANT-IP14P', 'Pantalla OLED para iPhone 14 Pro', NULL, 1, 1, 1, NULL, 'PZA', 1, 0, 4500.00, 2800.0000, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(2, 'BAT-S23U', 'Batería para Samsung S23 Ultra', NULL, 2, 2, 3, NULL, 'PZA', 1, 0, 1200.00, 650.0000, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(3, 'CABLE-USBC-1M', 'Cable de Carga Rápida USB-C 1m', NULL, 3, NULL, NULL, NULL, 'PZA', 1, 0, 350.00, 150.0000, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(4, 'SERV-DIAG', 'Servicio de Diagnóstico General', NULL, 4, NULL, NULL, NULL, 'PZA', 1, 0, 250.00, 0.0000, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(5, 'EQ-IP15PM-512', 'Apple iPhone 15 Pro Max 512GB', NULL, 5, 1, 2, NULL, 'PZA', 1, 1, 28999.00, 24500.0000, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_productos_atributos`
--

CREATE TABLE `cat_productos_atributos` (
  `id` int(10) UNSIGNED NOT NULL,
  `sku` varchar(30) NOT NULL,
  `atributo_1` varchar(255) DEFAULT NULL,
  `atributo_2` varchar(255) DEFAULT NULL,
  `atributo_3` varchar(255) DEFAULT NULL,
  `atributo_4` varchar(255) DEFAULT NULL,
  `atributo_5` varchar(255) DEFAULT NULL,
  `atributo_6` varchar(255) DEFAULT NULL,
  `atributo_7` varchar(255) DEFAULT NULL,
  `atributo_8` varchar(255) DEFAULT NULL,
  `atributo_9` varchar(255) DEFAULT NULL,
  `atributo_10` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_productos_series`
--

CREATE TABLE `cat_productos_series` (
  `id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  `numero_serie` varchar(120) NOT NULL,
  `estado` enum('DISPONIBLE','VENDIDO','ASIGNADO','EN_SERVICIO','BAJA') NOT NULL DEFAULT 'DISPONIBLE',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat_productos_series`
--

INSERT INTO `cat_productos_series` (`id`, `producto_id`, `numero_serie`, `estado`, `created_at`) VALUES
(1, 5, 'SN-APPLE-IP15-001', 'DISPONIBLE', '2025-08-27 09:07:50'),
(2, 5, 'SN-APPLE-IP15-002', 'DISPONIBLE', '2025-08-27 09:07:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_versiones`
--

CREATE TABLE `cat_versiones` (
  `id` bigint(20) NOT NULL,
  `modelo_id` bigint(20) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `notas` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cat_versiones`
--

INSERT INTO `cat_versiones` (`id`, `modelo_id`, `nombre`, `notas`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, '256GB', NULL, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(2, 2, '512GB', NULL, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(3, 3, '1TB', NULL, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cli_clientes`
--

CREATE TABLE `cli_clientes` (
  `id` bigint(20) NOT NULL,
  `tipo_id` bigint(20) NOT NULL,
  `razon_social` varchar(200) NOT NULL,
  `rfc` varchar(20) DEFAULT NULL,
  `curp` varchar(18) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `telefono` varchar(40) DEFAULT NULL,
  `whatsapp` varchar(40) DEFAULT NULL,
  `direccion` varchar(300) DEFAULT NULL,
  `ciudad` varchar(120) DEFAULT NULL,
  `estado` varchar(120) DEFAULT NULL,
  `pais` varchar(120) DEFAULT 'México',
  `cp` varchar(10) DEFAULT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cli_clientes`
--

INSERT INTO `cli_clientes` (`id`, `tipo_id`, `razon_social`, `rfc`, `curp`, `email`, `telefono`, `whatsapp`, `direccion`, `ciudad`, `estado`, `pais`, `cp`, `fecha_registro`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Carlos Sánchez López', 'SALC850315H00', NULL, 'carlos.sanchez@email.com', '5587654321', NULL, NULL, NULL, NULL, 'México', NULL, '2025-08-27 09:07:50', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(2, 2, 'Oficina Creativa SA de CV', 'OCR120520XYZ', NULL, 'contacto@oficinacreativa.com', '5512345678', NULL, NULL, NULL, NULL, 'México', NULL, '2025-08-27 09:07:50', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cli_contactos`
--

CREATE TABLE `cli_contactos` (
  `id` bigint(20) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `telefono` varchar(40) DEFAULT NULL,
  `puesto` varchar(120) DEFAULT NULL,
  `principal` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cli_contactos`
--

INSERT INTO `cli_contactos` (`id`, `cliente_id`, `nombre`, `email`, `telefono`, `puesto`, `principal`) VALUES
(1, 2, 'Laura Méndez', 'laura.mendez@oficinacreativa.com', NULL, 'Gerente de Compras', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cli_tipos`
--

CREATE TABLE `cli_tipos` (
  `id` bigint(20) NOT NULL,
  `clave` enum('FINAL','EMPRESA') NOT NULL,
  `etiqueta` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cli_tipos`
--

INSERT INTO `cli_tipos` (`id`, `clave`, `etiqueta`) VALUES
(1, 'FINAL', 'Cliente Final'),
(2, 'EMPRESA', 'Cliente Corporativo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comm_avisos`
--

CREATE TABLE `comm_avisos` (
  `id` bigint(20) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `mensaje` text NOT NULL,
  `prioridad` enum('BAJA','MEDIA','ALTA','CRITICA') NOT NULL DEFAULT 'BAJA',
  `publico` tinyint(1) NOT NULL DEFAULT 0,
  `creado_por` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `comm_avisos`
--

INSERT INTO `comm_avisos` (`id`, `titulo`, `mensaje`, `prioridad`, `publico`, `creado_por`, `created_at`) VALUES
(1, 'Mantenimiento Programado del Sistema', 'El sistema estará en mantenimiento este sábado de 2 a 4 am.', 'ALTA', 1, 1, '2025-08-27 09:07:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comm_avisos_destinatarios`
--

CREATE TABLE `comm_avisos_destinatarios` (
  `id` bigint(20) NOT NULL,
  `aviso_id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  `leido_en` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `comm_avisos_destinatarios`
--

INSERT INTO `comm_avisos_destinatarios` (`id`, `aviso_id`, `usuario_id`, `leido_en`) VALUES
(1, 1, 2, NULL),
(2, 1, 3, NULL),
(3, 1, 4, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comm_solicitudes`
--

CREATE TABLE `comm_solicitudes` (
  `id` bigint(20) NOT NULL,
  `folio` varchar(30) NOT NULL,
  `solicitante_id` bigint(20) NOT NULL,
  `asignado_id` bigint(20) DEFAULT NULL,
  `categoria` varchar(100) NOT NULL,
  `asunto` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` enum('ABIERTA','EN_PROGRESO','EN_ESPERA','CERRADA','CANCELADA') NOT NULL DEFAULT 'ABIERTA',
  `prioridad` enum('BAJA','MEDIA','ALTA','CRITICA') NOT NULL DEFAULT 'BAJA',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `comm_solicitudes`
--

INSERT INTO `comm_solicitudes` (`id`, `folio`, `solicitante_id`, `asignado_id`, `categoria`, `asunto`, `descripcion`, `estado`, `prioridad`, `created_at`, `updated_at`) VALUES
(1, 'SOL-INT-001', 3, 1, 'TI', 'Problema con la impresora de tickets', NULL, 'ABIERTA', 'BAJA', '2025-08-27 09:07:50', '2025-08-27 09:07:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `com_ele_comprobantes`
--

CREATE TABLE `com_ele_comprobantes` (
  `id` bigint(20) NOT NULL,
  `tipo` enum('FACTURA','NOTA_CREDITO','NOTA_CARGO','RECIBO','OTRO') NOT NULL,
  `uuid` char(36) DEFAULT NULL,
  `folio` varchar(30) DEFAULT NULL,
  `fecha_emision` datetime NOT NULL DEFAULT current_timestamp(),
  `receptor_rfc` varchar(20) DEFAULT NULL,
  `emisor_rfc` varchar(20) DEFAULT NULL,
  `total` decimal(14,2) DEFAULT NULL,
  `xml_url` varchar(500) DEFAULT NULL,
  `pdf_url` varchar(500) DEFAULT NULL,
  `venta_id` bigint(20) DEFAULT NULL,
  `orden_compra_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `com_ele_comprobantes`
--

INSERT INTO `com_ele_comprobantes` (`id`, `tipo`, `uuid`, `folio`, `fecha_emision`, `receptor_rfc`, `emisor_rfc`, `total`, `xml_url`, `pdf_url`, `venta_id`, `orden_compra_id`) VALUES
(1, 'FACTURA', '9d8a0bd9-8357-11f0-82f5-bc2411c7cfcb', NULL, '2025-08-27 09:07:50', NULL, NULL, 1682.00, NULL, NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `com_ordenes_compra`
--

CREATE TABLE `com_ordenes_compra` (
  `id` bigint(20) NOT NULL,
  `folio` varchar(30) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `proveedor_id` bigint(20) NOT NULL,
  `estado` enum('BORRADOR','ENVIADA','PARCIAL','RECIBIDA','CANCELADA') NOT NULL DEFAULT 'BORRADOR',
  `finalidad` enum('VENTA','PEDIDO','USO INTERNO','REPARACION') NOT NULL,
  `srv_folio` varchar(30) NOT NULL,
  `moneda` varchar(10) NOT NULL DEFAULT 'MXN',
  `tipo_cambio` decimal(12,6) NOT NULL DEFAULT 1.000000,
  `subtotal` decimal(14,2) NOT NULL DEFAULT 0.00,
  `impuestos` decimal(14,2) NOT NULL DEFAULT 0.00,
  `total` decimal(14,2) NOT NULL DEFAULT 0.00,
  `notas` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `com_ordenes_compra`
--

INSERT INTO `com_ordenes_compra` (`id`, `folio`, `fecha`, `proveedor_id`, `estado`, `finalidad`, `srv_folio`, `moneda`, `tipo_cambio`, `subtotal`, `impuestos`, `total`, `notas`) VALUES
(1, 'OC-001', '2025-08-27 09:07:50', 1, 'RECIBIDA', 'VENTA', '', 'MXN', 1.000000, 14000.00, 2240.00, 16240.00, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `com_ordenes_compra_det`
--

CREATE TABLE `com_ordenes_compra_det` (
  `id` bigint(20) NOT NULL,
  `orden_compra_id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  `cantidad` decimal(12,4) NOT NULL,
  `precio_unitario` decimal(12,4) NOT NULL,
  `descuento_pct` decimal(5,2) DEFAULT 0.00,
  `impuestos_pct` decimal(5,2) DEFAULT 0.00,
  `codigo_coordenada` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `com_ordenes_compra_det`
--

INSERT INTO `com_ordenes_compra_det` (`id`, `orden_compra_id`, `producto_id`, `cantidad`, `precio_unitario`, `descuento_pct`, `impuestos_pct`, `codigo_coordenada`) VALUES
(1, 1, 1, 5.0000, 2800.0000, 0.00, 0.00, '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `com_requisiciones`
--

CREATE TABLE `com_requisiciones` (
  `id` bigint(20) NOT NULL,
  `folio` varchar(30) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `solicitante_id` bigint(20) NOT NULL,
  `estado` enum('BORRADOR','ENVIADA','APROBADA','RECHAZADA','CERRADA') NOT NULL DEFAULT 'BORRADOR',
  `notas` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `com_requisiciones`
--

INSERT INTO `com_requisiciones` (`id`, `folio`, `fecha`, `solicitante_id`, `estado`, `notas`) VALUES
(1, 'REQ-001', '2025-08-27 09:07:50', 2, 'APROBADA', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `com_requisiciones_det`
--

CREATE TABLE `com_requisiciones_det` (
  `id` bigint(20) NOT NULL,
  `requisicion_id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  `cantidad` decimal(12,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `com_requisiciones_det`
--

INSERT INTO `com_requisiciones_det` (`id`, `requisicion_id`, `producto_id`, `cantidad`) VALUES
(1, 1, 1, 5.0000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conv_convenios`
--

CREATE TABLE `conv_convenios` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `cliente_id` bigint(20) DEFAULT NULL,
  `proveedor_id` bigint(20) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `descuento_pct` decimal(5,2) DEFAULT 0.00,
  `condiciones` text DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `conv_convenios`
--

INSERT INTO `conv_convenios` (`id`, `nombre`, `descripcion`, `cliente_id`, `proveedor_id`, `fecha_inicio`, `fecha_fin`, `descuento_pct`, `condiciones`, `activo`) VALUES
(1, 'Descuento Corporativo Oficina Creativa', NULL, 2, NULL, '2023-01-01', NULL, 15.00, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_actividades`
--

CREATE TABLE `crm_actividades` (
  `id` bigint(20) NOT NULL,
  `oportunidad_id` bigint(20) DEFAULT NULL,
  `cliente_id` bigint(20) DEFAULT NULL,
  `tipo` enum('LLAMADA','REUNION','EMAIL','WHATSAPP','OTRO') NOT NULL,
  `asunto` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `programada_el` datetime DEFAULT NULL,
  `realizada_el` datetime DEFAULT NULL,
  `realizado_por` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `crm_actividades`
--

INSERT INTO `crm_actividades` (`id`, `oportunidad_id`, `cliente_id`, `tipo`, `asunto`, `descripcion`, `programada_el`, `realizada_el`, `realizado_por`) VALUES
(1, 1, NULL, 'LLAMADA', 'Llamada de seguimiento a propuesta', NULL, '2023-09-01 10:00:00', NULL, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_campanas`
--

CREATE TABLE `crm_campanas` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `canal` enum('EMAIL','SMS','WHATSAPP','FACEBOOK','INSTAGRAM','TIKTOK','OTRO') NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `presupuesto` decimal(14,2) DEFAULT 0.00,
  `objetivo` varchar(255) DEFAULT NULL,
  `notas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `crm_campanas`
--

INSERT INTO `crm_campanas` (`id`, `nombre`, `canal`, `fecha_inicio`, `fecha_fin`, `presupuesto`, `objetivo`, `notas`) VALUES
(1, 'Promo Regreso a Clases', 'EMAIL', '2023-08-15', '2023-09-05', 0.00, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_campanas_segmentos`
--

CREATE TABLE `crm_campanas_segmentos` (
  `id` bigint(20) NOT NULL,
  `campana_id` bigint(20) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `criterio` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_envios`
--

CREATE TABLE `crm_envios` (
  `id` bigint(20) NOT NULL,
  `campana_id` bigint(20) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  `medio` enum('EMAIL','SMS','WHATSAPP','OTRO') NOT NULL,
  `enviado_el` datetime DEFAULT NULL,
  `abierto` tinyint(1) DEFAULT 0,
  `clics` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_etapas_oportunidad`
--

CREATE TABLE `crm_etapas_oportunidad` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `orden` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `crm_etapas_oportunidad`
--

INSERT INTO `crm_etapas_oportunidad` (`id`, `nombre`, `orden`) VALUES
(1, 'Prospecto', 10),
(2, 'Contactado', 20),
(3, 'Propuesta Enviada', 30),
(4, 'Ganada', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_lealtad_clientes`
--

CREATE TABLE `crm_lealtad_clientes` (
  `id` bigint(20) NOT NULL,
  `programa_id` bigint(20) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  `puntos` decimal(14,4) NOT NULL DEFAULT 0.0000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `crm_lealtad_clientes`
--

INSERT INTO `crm_lealtad_clientes` (`id`, `programa_id`, `cliente_id`, `puntos`) VALUES
(1, 1, 1, 1682.0000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_lealtad_movimientos`
--

CREATE TABLE `crm_lealtad_movimientos` (
  `id` bigint(20) NOT NULL,
  `lealtad_id` bigint(20) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `tipo` enum('ACUMULACION','REDENCION','AJUSTE') NOT NULL,
  `puntos` decimal(14,4) NOT NULL,
  `referencia` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `crm_lealtad_movimientos`
--

INSERT INTO `crm_lealtad_movimientos` (`id`, `lealtad_id`, `fecha`, `tipo`, `puntos`, `referencia`) VALUES
(1, 1, '2025-08-27 09:07:50', 'ACUMULACION', 1682.0000, 'VTA-001');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_lealtad_programas`
--

CREATE TABLE `crm_lealtad_programas` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `puntos_por_peso` decimal(8,4) DEFAULT 0.0000,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `crm_lealtad_programas`
--

INSERT INTO `crm_lealtad_programas` (`id`, `nombre`, `descripcion`, `puntos_por_peso`, `activo`) VALUES
(1, 'Taller Puntos', NULL, 1.0000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_oportunidades`
--

CREATE TABLE `crm_oportunidades` (
  `id` bigint(20) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `valor_estimado` decimal(14,2) DEFAULT 0.00,
  `probabilidad` decimal(5,2) DEFAULT 0.00,
  `etapa_id` bigint(20) NOT NULL,
  `fecha_cierre_esperada` date DEFAULT NULL,
  `responsable_id` bigint(20) DEFAULT NULL,
  `notas` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `crm_oportunidades`
--

INSERT INTO `crm_oportunidades` (`id`, `cliente_id`, `nombre`, `valor_estimado`, `probabilidad`, `etapa_id`, `fecha_cierre_esperada`, `responsable_id`, `notas`, `created_at`, `updated_at`) VALUES
(1, 2, 'Renovación de 10 equipos para Oficina Creativa', 150000.00, 0.00, 3, NULL, 3, NULL, '2025-08-27 09:07:50', '2025-08-27 09:07:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_promociones`
--

CREATE TABLE `crm_promociones` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `tipo` enum('DESCUENTO_PORCENTAJE','DESCUENTO_FIJO','2X1','ENVIO_GRATIS','OTRO') NOT NULL,
  `valor` decimal(12,4) NOT NULL DEFAULT 0.0000,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `crm_promociones`
--

INSERT INTO `crm_promociones` (`id`, `nombre`, `descripcion`, `tipo`, `valor`, `fecha_inicio`, `fecha_fin`, `activo`) VALUES
(1, '15% en Accesorios', NULL, 'DESCUENTO_PORCENTAJE', 15.0000, '2023-08-15', '2023-09-05', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_promociones_productos`
--

CREATE TABLE `crm_promociones_productos` (
  `id` bigint(20) NOT NULL,
  `promocion_id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_tickets`
--

CREATE TABLE `crm_tickets` (
  `id` bigint(20) NOT NULL,
  `folio` varchar(30) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  `asunto` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` enum('ABIERTO','EN_PROCESO','EN_ESPERA','RESUELTO','CERRADO') NOT NULL DEFAULT 'ABIERTO',
  `prioridad` enum('BAJA','MEDIA','ALTA','CRITICA') NOT NULL DEFAULT 'BAJA',
  `canal` enum('WEB','APP','WHATSAPP','TELEFONO','EMAIL','OTRO') NOT NULL DEFAULT 'WEB',
  `creado_el` datetime NOT NULL DEFAULT current_timestamp(),
  `asignado_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `crm_tickets`
--

INSERT INTO `crm_tickets` (`id`, `folio`, `cliente_id`, `asunto`, `descripcion`, `estado`, `prioridad`, `canal`, `creado_el`, `asignado_id`) VALUES
(1, 'TICK-001', 1, 'Mi equipo reparado sigue fallando', NULL, 'ABIERTO', 'BAJA', 'WEB', '2025-08-27 09:07:50', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_tickets_mensajes`
--

CREATE TABLE `crm_tickets_mensajes` (
  `id` bigint(20) NOT NULL,
  `ticket_id` bigint(20) NOT NULL,
  `autor_tipo` enum('CLIENTE','AGENTE') NOT NULL,
  `autor_id` bigint(20) DEFAULT NULL,
  `mensaje` text NOT NULL,
  `enviado_el` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `crm_tickets_mensajes`
--

INSERT INTO `crm_tickets_mensajes` (`id`, `ticket_id`, `autor_tipo`, `autor_id`, `mensaje`, `enviado_el`) VALUES
(1, 1, 'CLIENTE', 1, 'Hola, recogí mi teléfono ayer pero la pantalla parpadea.', '2025-08-27 09:07:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crm_whatsapp_mensajes`
--

CREATE TABLE `crm_whatsapp_mensajes` (
  `id` bigint(20) NOT NULL,
  `cliente_id` bigint(20) DEFAULT NULL,
  `numero` varchar(40) NOT NULL,
  `direccion` enum('ENTRANTE','SALIENTE') NOT NULL,
  `mensaje` text NOT NULL,
  `enviado_el` datetime NOT NULL DEFAULT current_timestamp(),
  `usuario_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `crm_whatsapp_mensajes`
--

INSERT INTO `crm_whatsapp_mensajes` (`id`, `cliente_id`, `numero`, `direccion`, `mensaje`, `enviado_el`, `usuario_id`) VALUES
(1, 1, '5587654321', 'ENTRANTE', 'Hola, ¿ya estará lista mi reparación?', '2025-08-27 09:07:50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dev_devoluciones`
--

CREATE TABLE `dev_devoluciones` (
  `id` bigint(20) NOT NULL,
  `folio` varchar(30) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `tipo` enum('A_PROVEEDOR','DE_CLIENTE') NOT NULL,
  `proveedor_id` bigint(20) DEFAULT NULL,
  `cliente_id` bigint(20) DEFAULT NULL,
  `motivo` varchar(255) NOT NULL,
  `estado` enum('BORRADOR','ENVIADA','CERRADA','CANCELADA') NOT NULL DEFAULT 'BORRADOR'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `dev_devoluciones`
--

INSERT INTO `dev_devoluciones` (`id`, `folio`, `fecha`, `tipo`, `proveedor_id`, `cliente_id`, `motivo`, `estado`) VALUES
(1, 'DEV-P-001', '2025-08-27 09:07:50', 'A_PROVEEDOR', 1, NULL, 'Una pantalla llegó con defecto de fábrica.', 'BORRADOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dev_devoluciones_det`
--

CREATE TABLE `dev_devoluciones_det` (
  `id` bigint(20) NOT NULL,
  `devolucion_id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  `cantidad` decimal(12,4) NOT NULL,
  `precio_unitario` decimal(12,4) NOT NULL DEFAULT 0.0000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `dev_devoluciones_det`
--

INSERT INTO `dev_devoluciones_det` (`id`, `devolucion_id`, `producto_id`, `cantidad`, `precio_unitario`) VALUES
(1, 1, 1, 1.0000, 0.0000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `emp_asistencias`
--

CREATE TABLE `emp_asistencias` (
  `id` bigint(20) NOT NULL,
  `empleado_id` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `hora_entrada` time DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  `notas` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `emp_asistencias`
--

INSERT INTO `emp_asistencias` (`id`, `empleado_id`, `fecha`, `hora_entrada`, `hora_salida`, `notas`) VALUES
(1, 1, '2025-08-27', '09:01:15', '18:30:05', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `emp_empleados`
--

CREATE TABLE `emp_empleados` (
  `id` bigint(20) NOT NULL,
  `codigo` varchar(30) DEFAULT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellido_p` varchar(150) NOT NULL,
  `apellido_m` varchar(150) DEFAULT NULL,
  `curp` varchar(18) DEFAULT NULL,
  `rfc` varchar(13) DEFAULT NULL,
  `nss` varchar(15) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `puesto` varchar(120) DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `fecha_baja` date DEFAULT NULL,
  `salario_diario` decimal(10,2) DEFAULT 0.00,
  `usuario_id` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `emp_empleados`
--

INSERT INTO `emp_empleados` (`id`, `codigo`, `nombre`, `apellido_p`, `apellido_m`, `curp`, `rfc`, `nss`, `email`, `telefono`, `puesto`, `fecha_ingreso`, `fecha_baja`, `salario_diario`, `usuario_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'TEC-001', 'Juan', 'Pérez', NULL, NULL, NULL, NULL, NULL, NULL, 'Técnico Senior', '2022-01-15', NULL, 500.00, 2, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(2, 'VEN-001', 'Ana', 'García', NULL, NULL, NULL, NULL, NULL, NULL, 'Ejecutiva de Ventas', '2022-03-01', NULL, 450.00, 3, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(3, 'GER-001', 'Luisa', 'Hernández', NULL, NULL, NULL, NULL, NULL, NULL, 'Gerente de Sucursal', '2021-11-20', NULL, 800.00, 4, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `emp_incapacidades_permisos`
--

CREATE TABLE `emp_incapacidades_permisos` (
  `id` bigint(20) NOT NULL,
  `empleado_id` bigint(20) NOT NULL,
  `tipo` enum('INCAPACIDAD','PERMISO') NOT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `comprobante_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `emp_incapacidades_permisos`
--

INSERT INTO `emp_incapacidades_permisos` (`id`, `empleado_id`, `tipo`, `motivo`, `fecha_inicio`, `fecha_fin`, `comprobante_url`) VALUES
(1, 2, 'PERMISO', 'Cita médica', '2025-08-27', '2025-08-27', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `emp_nominas`
--

CREATE TABLE `emp_nominas` (
  `id` bigint(20) NOT NULL,
  `empleado_id` bigint(20) NOT NULL,
  `periodo_del` date NOT NULL,
  `periodo_al` date NOT NULL,
  `percepciones` decimal(12,2) NOT NULL DEFAULT 0.00,
  `deducciones` decimal(12,2) NOT NULL DEFAULT 0.00,
  `neto` decimal(12,2) NOT NULL DEFAULT 0.00,
  `pagado_en` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `emp_nominas`
--

INSERT INTO `emp_nominas` (`id`, `empleado_id`, `periodo_del`, `periodo_al`, `percepciones`, `deducciones`, `neto`, `pagado_en`) VALUES
(1, 3, '2023-08-01', '2023-08-15', 12000.00, 1800.00, 10200.00, '2023-08-15 10:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `emp_vacaciones`
--

CREATE TABLE `emp_vacaciones` (
  `id` bigint(20) NOT NULL,
  `empleado_id` bigint(20) NOT NULL,
  `periodo_inicio` date NOT NULL,
  `periodo_fin` date NOT NULL,
  `dias` int(11) NOT NULL,
  `estado` enum('SOLICITADA','APROBADA','RECHAZADA','GOZADA') NOT NULL DEFAULT 'SOLICITADA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `emp_vacaciones`
--

INSERT INTO `emp_vacaciones` (`id`, `empleado_id`, `periodo_inicio`, `periodo_fin`, `dias`, `estado`) VALUES
(1, 1, '2023-12-20', '2023-12-27', 5, 'APROBADA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fin_cuentas_contables`
--

CREATE TABLE `fin_cuentas_contables` (
  `id` bigint(20) NOT NULL,
  `codigo` varchar(30) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `naturaleza` enum('DEUDORA','ACREEDORA') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `fin_cuentas_contables`
--

INSERT INTO `fin_cuentas_contables` (`id`, `codigo`, `nombre`, `naturaleza`) VALUES
(1, '112-001', 'Bancos Nacionales', 'DEUDORA'),
(2, '401-001', 'Venta de Servicios', 'ACREEDORA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fin_cxc`
--

CREATE TABLE `fin_cxc` (
  `id` bigint(20) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  `venta_id` bigint(20) NOT NULL,
  `fecha_emision` date NOT NULL,
  `fecha_venc` date DEFAULT NULL,
  `saldo` decimal(14,2) NOT NULL,
  `estado` enum('ABIERTA','PARCIAL','CERRADA','VENCIDA') NOT NULL DEFAULT 'ABIERTA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `fin_cxc`
--

INSERT INTO `fin_cxc` (`id`, `cliente_id`, `venta_id`, `fecha_emision`, `fecha_venc`, `saldo`, `estado`) VALUES
(1, 2, 1, '2025-08-27', '2025-08-27', 0.00, 'CERRADA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fin_cxp`
--

CREATE TABLE `fin_cxp` (
  `id` bigint(20) NOT NULL,
  `proveedor_id` bigint(20) NOT NULL,
  `orden_compra_id` bigint(20) NOT NULL,
  `fecha_emision` date NOT NULL,
  `fecha_venc` date DEFAULT NULL,
  `saldo` decimal(14,2) NOT NULL,
  `estado` enum('ABIERTA','PARCIAL','CERRADA','VENCIDA') NOT NULL DEFAULT 'ABIERTA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `fin_cxp`
--

INSERT INTO `fin_cxp` (`id`, `proveedor_id`, `orden_compra_id`, `fecha_emision`, `fecha_venc`, `saldo`, `estado`) VALUES
(1, 1, 1, '2023-08-10', '2023-09-09', 16240.00, 'ABIERTA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fin_gastos`
--

CREATE TABLE `fin_gastos` (
  `id` bigint(20) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `categoria` varchar(120) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `monto` decimal(14,2) NOT NULL,
  `pagado_con` enum('CAJA','BANCO','TARJETA','OTRO') NOT NULL DEFAULT 'CAJA',
  `comprobante_url` varchar(500) DEFAULT NULL,
  `usuario_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `fin_gastos`
--

INSERT INTO `fin_gastos` (`id`, `fecha`, `categoria`, `descripcion`, `monto`, `pagado_con`, `comprobante_url`, `usuario_id`) VALUES
(1, '2025-08-27 09:07:50', 'Servicios', 'Pago de servicio de Internet mensual', 800.00, 'BANCO', NULL, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fin_pagos`
--

CREATE TABLE `fin_pagos` (
  `id` bigint(20) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `cliente_id` bigint(20) DEFAULT NULL,
  `proveedor_id` bigint(20) DEFAULT NULL,
  `venta_id` bigint(20) DEFAULT NULL,
  `orden_compra_id` bigint(20) DEFAULT NULL,
  `metodo` enum('EFECTIVO','TARJETA','TRANSFERENCIA','MERCADO_PAGO','PAYPAL','OTRO') NOT NULL,
  `referencia` varchar(120) DEFAULT NULL,
  `monto` decimal(14,2) NOT NULL,
  `es_anticipo` tinyint(1) NOT NULL DEFAULT 0,
  `notas` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `fin_pagos`
--

INSERT INTO `fin_pagos` (`id`, `fecha`, `cliente_id`, `proveedor_id`, `venta_id`, `orden_compra_id`, `metodo`, `referencia`, `monto`, `es_anticipo`, `notas`) VALUES
(1, '2025-08-27 09:07:50', 2, NULL, 1, NULL, 'TARJETA', NULL, 1682.00, 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fin_polizas`
--

CREATE TABLE `fin_polizas` (
  `id` bigint(20) NOT NULL,
  `folio` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `tipo` enum('INGRESO','EGRESO','DIARIO') NOT NULL,
  `concepto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `fin_polizas`
--

INSERT INTO `fin_polizas` (`id`, `folio`, `fecha`, `tipo`, `concepto`) VALUES
(1, 'PI-001', '2025-08-27', 'INGRESO', 'Pago de Venta VTA-001');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fin_polizas_mov`
--

CREATE TABLE `fin_polizas_mov` (
  `id` bigint(20) NOT NULL,
  `poliza_id` bigint(20) NOT NULL,
  `cuenta_id` bigint(20) NOT NULL,
  `tipo` enum('DEBE','HABER') NOT NULL,
  `monto` decimal(14,2) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `fin_polizas_mov`
--

INSERT INTO `fin_polizas_mov` (`id`, `poliza_id`, `cuenta_id`, `tipo`, `monto`, `descripcion`) VALUES
(1, 1, 1, 'DEBE', 1682.00, NULL),
(2, 1, 2, 'HABER', 1682.00, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inv_ajustes`
--

CREATE TABLE `inv_ajustes` (
  `id` bigint(20) NOT NULL,
  `folio` varchar(30) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `motivo` varchar(200) NOT NULL,
  `usuario_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `inv_ajustes`
--

INSERT INTO `inv_ajustes` (`id`, `folio`, `fecha`, `motivo`, `usuario_id`) VALUES
(1, 'AJ-001', '2025-08-27 09:07:50', 'Conteo físico inicial', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inv_ajustes_det`
--

CREATE TABLE `inv_ajustes_det` (
  `id` bigint(20) NOT NULL,
  `ajuste_id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  `lote_id` bigint(20) DEFAULT NULL,
  `almacen_id` bigint(20) NOT NULL,
  `cantidad` decimal(12,4) NOT NULL,
  `tipo` enum('POSITIVO','NEGATIVO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `inv_ajustes_det`
--

INSERT INTO `inv_ajustes_det` (`id`, `ajuste_id`, `producto_id`, `lote_id`, `almacen_id`, `cantidad`, `tipo`) VALUES
(1, 1, 3, NULL, 1, 50.0000, 'POSITIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inv_movimientos`
--

CREATE TABLE `inv_movimientos` (
  `id` bigint(20) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `tipo` enum('ENTRADA','SALIDA','AJUSTE_POSITIVO','AJUSTE_NEGATIVO','TRASLADO_SALIDA','TRASLADO_ENTRADA','DEVOLUCION_ENTRADA','DEVOLUCION_SALIDA') NOT NULL,
  `referencia` varchar(60) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  `coordenada_id` bigint(20) DEFAULT NULL,
  `almacen_id` bigint(20) NOT NULL,
  `seccion_id` bigint(20) DEFAULT NULL,
  `cantidad` decimal(12,4) NOT NULL,
  `costo_unit` decimal(12,4) NOT NULL DEFAULT 0.0000,
  `usuario_id` bigint(20) DEFAULT NULL,
  `notas` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `inv_movimientos`
--

INSERT INTO `inv_movimientos` (`id`, `fecha`, `tipo`, `referencia`, `producto_id`, `coordenada_id`, `almacen_id`, `seccion_id`, `cantidad`, `costo_unit`, `usuario_id`, `notas`) VALUES
(1, '2025-08-27 09:07:50', 'ENTRADA', 'COMPRA-001', 1, 1, 1, 1, 10.0000, 2800.0000, 1, NULL),
(2, '2025-08-27 09:07:50', 'ENTRADA', 'COMPRA-001', 2, NULL, 1, 2, 20.0000, 650.0000, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_recepciones`
--

CREATE TABLE `log_recepciones` (
  `id` bigint(20) NOT NULL,
  `folio` varchar(30) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `orden_compra_id` bigint(20) DEFAULT NULL,
  `proveedor_id` bigint(20) NOT NULL,
  `almacen_id` bigint(20) NOT NULL,
  `estado` enum('BORRADOR','PARCIAL','COMPLETA','CANCELADA') NOT NULL DEFAULT 'BORRADOR'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `log_recepciones`
--

INSERT INTO `log_recepciones` (`id`, `folio`, `fecha`, `orden_compra_id`, `proveedor_id`, `almacen_id`, `estado`) VALUES
(1, 'REC-001', '2025-08-27 09:07:50', 1, 1, 1, 'COMPLETA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_recepciones_det`
--

CREATE TABLE `log_recepciones_det` (
  `id` bigint(20) NOT NULL,
  `recepcion_id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  `lote_id` bigint(20) DEFAULT NULL,
  `cantidad` decimal(12,4) NOT NULL,
  `costo_unitario` decimal(12,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `log_recepciones_det`
--

INSERT INTO `log_recepciones_det` (`id`, `recepcion_id`, `producto_id`, `lote_id`, `cantidad`, `costo_unitario`) VALUES
(1, 1, 1, NULL, 5.0000, 2800.0000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prv_contactos`
--

CREATE TABLE `prv_contactos` (
  `id` bigint(20) NOT NULL,
  `proveedor_id` bigint(20) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `telefono` varchar(40) DEFAULT NULL,
  `puesto` varchar(120) DEFAULT NULL,
  `principal` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `prv_contactos`
--

INSERT INTO `prv_contactos` (`id`, `proveedor_id`, `nombre`, `email`, `telefono`, `puesto`, `principal`) VALUES
(1, 1, 'Roberto Jiménez', 'r.jimenez@refaccionesmoviles.com', NULL, 'Ejecutivo de Cuenta', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prv_proveedores`
--

CREATE TABLE `prv_proveedores` (
  `id` bigint(20) NOT NULL,
  `razon_social` varchar(200) NOT NULL,
  `rfc` varchar(20) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `telefono` varchar(40) DEFAULT NULL,
  `whatsapp` varchar(40) DEFAULT NULL,
  `direccion` varchar(300) DEFAULT NULL,
  `ciudad` varchar(120) DEFAULT NULL,
  `estado` varchar(120) DEFAULT NULL,
  `pais` varchar(120) DEFAULT 'México',
  `cp` varchar(10) DEFAULT NULL,
  `dias_credito` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `prv_proveedores`
--

INSERT INTO `prv_proveedores` (`id`, `razon_social`, `rfc`, `email`, `telefono`, `whatsapp`, `direccion`, `ciudad`, `estado`, `pais`, `cp`, `dias_credito`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Refacciones Móviles del Centro S.A.', 'RMC010101ABC', NULL, NULL, NULL, NULL, NULL, NULL, 'México', NULL, 30, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(2, 'Accesorios Tech de México', 'ATM020202DEF', NULL, NULL, NULL, NULL, NULL, NULL, 'México', NULL, 15, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rn_reglas`
--

CREATE TABLE `rn_reglas` (
  `id` bigint(20) NOT NULL,
  `ambito` enum('ALMACEN','ADMINISTRACION','TECNICAS') NOT NULL,
  `clave` varchar(120) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `valor_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`valor_json`)),
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `rn_reglas`
--

INSERT INTO `rn_reglas` (`id`, `ambito`, `clave`, `descripcion`, `valor_json`, `activo`, `created_at`, `updated_at`) VALUES
(1, 'ALMACEN', 'stock.minimo.pantallas', 'Stock mínimo para todas las pantallas', '{\"tipo\": \"cantidad\", \"valor\": 5}', 1, '2025-08-27 09:07:50', '2025-08-27 09:07:50'),
(2, '', 'ventas.limite_descuento', 'Límite de descuento para agentes de ventas', '{\"rol_id\": 3, \"limite_pct\": 10.00}', 1, '2025-08-27 09:07:50', '2025-08-27 09:07:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seg_permisos`
--

CREATE TABLE `seg_permisos` (
  `id` bigint(20) NOT NULL,
  `clave` varchar(150) NOT NULL,
  `modulo` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `seg_permisos`
--

INSERT INTO `seg_permisos` (`id`, `clave`, `modulo`, `descripcion`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'usuarios.gestionar', 'Seguridad', 'Permite crear, editar y eliminar usuarios.', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(2, 'ventas.crear', 'Ventas', 'Permite crear nuevas ventas y presupuestos.', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(3, 'servicios.diagnosticar', 'Servicios', 'Permite registrar diagnósticos en órdenes.', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(4, 'inventario.ajustar', 'Inventario', 'Permite realizar ajustes manuales de stock.', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(5, 'reportes.ver_todos', 'Reportes', 'Permite visualizar todos los reportes.', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(6, 'compras.aprobar', 'Compras', 'Permite aprobar órdenes de compra.', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(7, 'inventario.ver_exis_tot', 'Inventario', 'Poder ver las existencias de todos los almacenes, sin importar ninguna otra restricción.', '2025-08-29 16:07:40', '2025-08-29 16:08:09', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seg_roles`
--

CREATE TABLE `seg_roles` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `seg_roles`
--

INSERT INTO `seg_roles` (`id`, `nombre`, `descripcion`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Administrador', 'Acceso total al sistema.', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(2, 'Técnico', 'Acceso a órdenes de servicio e inventario de refacciones.', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(3, 'Ventas', 'Acceso a clientes, presupuestos y ventas.', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(4, 'Gerente', 'Acceso a reportes y supervisión de personal.', '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seg_rol_permiso`
--

CREATE TABLE `seg_rol_permiso` (
  `id` bigint(20) NOT NULL,
  `rol_id` bigint(20) NOT NULL,
  `permiso_id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `seg_rol_permiso`
--

INSERT INTO `seg_rol_permiso` (`id`, `rol_id`, `permiso_id`, `created_at`) VALUES
(1, 1, 1, '2025-08-27 09:07:50'),
(2, 1, 2, '2025-08-27 09:07:50'),
(3, 1, 3, '2025-08-27 09:07:50'),
(4, 1, 4, '2025-08-27 09:07:50'),
(5, 1, 5, '2025-08-27 09:07:50'),
(6, 1, 6, '2025-08-27 09:07:50'),
(7, 2, 3, '2025-08-27 09:07:50'),
(8, 2, 4, '2025-08-27 09:07:50'),
(13, 1, 7, '2025-08-29 16:13:04'),
(14, 3, 2, '2025-08-29 18:33:45'),
(15, 3, 7, '2025-08-29 18:33:45'),
(16, 4, 2, '2025-08-29 18:34:19'),
(17, 4, 5, '2025-08-29 18:34:19'),
(18, 4, 6, '2025-08-29 18:34:19'),
(19, 4, 7, '2025-08-29 18:34:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seg_tokens_api`
--

CREATE TABLE `seg_tokens_api` (
  `id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  `token_hash` char(64) NOT NULL,
  `vence_el` datetime DEFAULT NULL,
  `creado_el` datetime NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `seg_tokens_api`
--

INSERT INTO `seg_tokens_api` (`id`, `usuario_id`, `token_hash`, `vence_el`, `creado_el`, `activo`) VALUES
(1, 1, 'a88da611b469b451ab4dbe95d24eb31bb7afbbc134b576fd9739998e29f43f6c', '2025-12-31 23:59:59', '2025-08-27 09:07:50', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seg_usuarios`
--

CREATE TABLE `seg_usuarios` (
  `id` bigint(20) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `pin` int(4) NOT NULL DEFAULT 1234,
  `forzar_cambio_pwd` tinyint(1) NOT NULL,
  `forzar_cambio_pin` tinyint(1) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellido_p` varchar(150) DEFAULT NULL,
  `apellido_m` varchar(150) DEFAULT NULL,
  `avatar_url` varchar(500) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `ultimo_acceso` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `seg_usuarios`
--

INSERT INTO `seg_usuarios` (`id`, `username`, `email`, `telefono`, `password_hash`, `pin`, `forzar_cambio_pwd`, `forzar_cambio_pin`, `nombre`, `apellido_p`, `apellido_m`, `avatar_url`, `activo`, `ultimo_acceso`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'admin', 'admin@hdm.com', '5510000001', 'password123', 1234, 0, 0, 'Admin', 'Global', NULL, NULL, 1, NULL, '2025-08-27 09:07:50', '2025-08-29 13:43:45', NULL),
(2, 'j.perez', 'juan.perez@taller.com', '5510000002', '$2b$10$E.M9j./F6.KM2s3i/90oLe0Io.9muVnFk5vup9g0W.B.cK.2o2O/q', 1234, 0, 0, 'Juan', 'Pérez', NULL, NULL, 1, NULL, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(3, 'a.garcia', 'ana.garcia@taller.com', '5510000003', '$2b$10$E.M9j./F6.KM2s3i/90oLe0Io.9muVnFk5vup9g0W.B.cK.2o2O/q', 1234, 0, 0, 'Ana', 'García', NULL, NULL, 1, NULL, '2025-08-27 09:07:50', '2025-08-27 09:07:50', NULL),
(4, 'l.hernandez', 'luisa.hernandez@taller.com.mx', '5510000004', '$2b$10$E.M9j./F6.KM2s3i/90oLe0Io.9muVnFk5vup9g0W.B.cK.2o2O/q', 9999, 0, 0, 'Luisa', 'Hernández', NULL, NULL, 1, NULL, '2025-08-27 09:07:50', '2025-08-29 15:25:43', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seg_usuario_rol`
--

CREATE TABLE `seg_usuario_rol` (
  `id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  `rol_id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `seg_usuario_rol`
--

INSERT INTO `seg_usuario_rol` (`id`, `usuario_id`, `rol_id`, `created_at`) VALUES
(1, 1, 1, '2025-08-27 09:07:50'),
(2, 2, 2, '2025-08-27 09:07:50'),
(3, 3, 3, '2025-08-27 09:07:50'),
(4, 4, 4, '2025-08-27 09:07:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `srv_equipos`
--

CREATE TABLE `srv_equipos` (
  `id` bigint(20) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  `marca_id` bigint(20) DEFAULT NULL,
  `modelo_id` bigint(20) DEFAULT NULL,
  `version_id` bigint(20) DEFAULT NULL,
  `imei` varchar(50) DEFAULT NULL,
  `numero_serie` varchar(120) DEFAULT NULL,
  `color` varchar(80) DEFAULT NULL,
  `accesorios` varchar(255) DEFAULT NULL,
  `condicion` varchar(255) DEFAULT NULL,
  `notas` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `srv_equipos`
--

INSERT INTO `srv_equipos` (`id`, `cliente_id`, `marca_id`, `modelo_id`, `version_id`, `imei`, `numero_serie`, `color`, `accesorios`, `condicion`, `notas`, `created_at`) VALUES
(1, 1, 1, 1, NULL, '123456789012345', NULL, NULL, NULL, 'Pantalla estrellada. No enciende.', NULL, '2025-08-27 09:07:50'),
(2, 2, 2, 3, NULL, '543210987654321', NULL, NULL, NULL, 'Batería con baja duración.', NULL, '2025-08-27 09:07:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `srv_ordenes`
--

CREATE TABLE `srv_ordenes` (
  `id` bigint(20) NOT NULL,
  `folio` varchar(30) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `cliente_id` bigint(20) NOT NULL,
  `equipo_id` bigint(20) NOT NULL,
  `diagnostico_ini` varchar(255) DEFAULT NULL,
  `estado` enum('RECEPCION','DIAGNOSTICO','AUTORIZACION','EN_REPARACION','PRUEBAS','LISTO','ENTREGADO','CANCELADO') NOT NULL DEFAULT 'RECEPCION',
  `prioridad` enum('BAJA','MEDIA','ALTA','CRITICA') NOT NULL DEFAULT 'MEDIA',
  `tecnico_id` bigint(20) DEFAULT NULL,
  `fecha_promesa` date DEFAULT NULL,
  `notas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `srv_ordenes`
--

INSERT INTO `srv_ordenes` (`id`, `folio`, `fecha`, `cliente_id`, `equipo_id`, `diagnostico_ini`, `estado`, `prioridad`, `tecnico_id`, `fecha_promesa`, `notas`) VALUES
(1, 'OS-001', '2025-08-27 09:07:50', 1, 1, 'Cliente reporta caída', 'DIAGNOSTICO', 'MEDIA', 1, NULL, NULL),
(2, 'OS-002', '2025-08-27 09:07:50', 2, 2, 'Batería se descarga rápido', 'EN_REPARACION', 'MEDIA', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `srv_ordenes_materiales`
--

CREATE TABLE `srv_ordenes_materiales` (
  `id` bigint(20) NOT NULL,
  `orden_id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  `cantidad` decimal(12,4) NOT NULL,
  `costo_unitario` decimal(12,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `srv_ordenes_materiales`
--

INSERT INTO `srv_ordenes_materiales` (`id`, `orden_id`, `producto_id`, `cantidad`, `costo_unitario`) VALUES
(1, 2, 2, 1.0000, 650.0000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `srv_ordenes_trabajos`
--

CREATE TABLE `srv_ordenes_trabajos` (
  `id` bigint(20) NOT NULL,
  `orden_id` bigint(20) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `horas_estimadas` decimal(8,2) DEFAULT 0.00,
  `horas_reales` decimal(8,2) DEFAULT 0.00,
  `mano_obra` decimal(12,2) DEFAULT 0.00,
  `estado` enum('PENDIENTE','EN_PROCESO','COMPLETADO','CANCELADO') NOT NULL DEFAULT 'PENDIENTE',
  `tecnico_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `srv_ordenes_trabajos`
--

INSERT INTO `srv_ordenes_trabajos` (`id`, `orden_id`, `descripcion`, `horas_estimadas`, `horas_reales`, `mano_obra`, `estado`, `tecnico_id`) VALUES
(1, 2, 'Reemplazo de batería', 0.00, 0.00, 250.00, 'PENDIENTE', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ven_presupuestos`
--

CREATE TABLE `ven_presupuestos` (
  `id` bigint(20) NOT NULL,
  `folio` varchar(30) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `cliente_id` bigint(20) NOT NULL,
  `moneda` varchar(10) NOT NULL DEFAULT 'MXN',
  `tipo_cambio` decimal(12,6) NOT NULL DEFAULT 1.000000,
  `subtotal` decimal(14,2) NOT NULL DEFAULT 0.00,
  `impuestos` decimal(14,2) NOT NULL DEFAULT 0.00,
  `total` decimal(14,2) NOT NULL DEFAULT 0.00,
  `estado` enum('BORRADOR','ENVIADO','ACEPTADO','RECHAZADO','VENCIDO') NOT NULL DEFAULT 'BORRADOR',
  `vigencia_al` date DEFAULT NULL,
  `notas` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `ven_presupuestos`
--

INSERT INTO `ven_presupuestos` (`id`, `folio`, `fecha`, `cliente_id`, `moneda`, `tipo_cambio`, `subtotal`, `impuestos`, `total`, `estado`, `vigencia_al`, `notas`) VALUES
(1, 'PRE-001', '2025-08-27 09:07:50', 1, 'MXN', 1.000000, 0.00, 0.00, 5000.00, 'ACEPTADO', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ven_presupuestos_det`
--

CREATE TABLE `ven_presupuestos_det` (
  `id` bigint(20) NOT NULL,
  `presupuesto_id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `cantidad` decimal(12,4) NOT NULL,
  `precio_unitario` decimal(12,4) NOT NULL,
  `descuento_pct` decimal(5,2) DEFAULT 0.00,
  `impuestos_pct` decimal(5,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `ven_presupuestos_det`
--

INSERT INTO `ven_presupuestos_det` (`id`, `presupuesto_id`, `producto_id`, `descripcion`, `cantidad`, `precio_unitario`, `descuento_pct`, `impuestos_pct`) VALUES
(1, 1, 1, 'Cambio de pantalla iPhone 14 Pro', 1.0000, 4500.0000, 0.00, 0.00),
(2, 1, 4, 'Mano de obra especializada', 1.0000, 500.0000, 0.00, 0.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ven_ventas`
--

CREATE TABLE `ven_ventas` (
  `id` bigint(20) NOT NULL,
  `folio` varchar(30) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `cliente_id` bigint(20) NOT NULL,
  `orden_id` bigint(20) DEFAULT NULL,
  `moneda` varchar(10) NOT NULL DEFAULT 'MXN',
  `tipo_cambio` decimal(12,6) NOT NULL DEFAULT 1.000000,
  `subtotal` decimal(14,2) NOT NULL DEFAULT 0.00,
  `impuestos` decimal(14,2) NOT NULL DEFAULT 0.00,
  `total` decimal(14,2) NOT NULL DEFAULT 0.00,
  `estado` enum('BORRADOR','PAGADA','PARCIAL','CANCELADA') NOT NULL DEFAULT 'BORRADOR',
  `notas` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `ven_ventas`
--

INSERT INTO `ven_ventas` (`id`, `folio`, `fecha`, `cliente_id`, `orden_id`, `moneda`, `tipo_cambio`, `subtotal`, `impuestos`, `total`, `estado`, `notas`) VALUES
(1, 'VTA-001', '2025-08-27 09:07:50', 2, 2, 'MXN', 1.000000, 1450.00, 232.00, 1682.00, 'PAGADA', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ven_ventas_det`
--

CREATE TABLE `ven_ventas_det` (
  `id` bigint(20) NOT NULL,
  `venta_id` bigint(20) NOT NULL,
  `producto_id` bigint(20) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `cantidad` decimal(12,4) NOT NULL,
  `precio_unitario` decimal(12,4) NOT NULL,
  `descuento_pct` decimal(5,2) DEFAULT 0.00,
  `impuestos_pct` decimal(5,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `ven_ventas_det`
--

INSERT INTO `ven_ventas_det` (`id`, `venta_id`, `producto_id`, `descripcion`, `cantidad`, `precio_unitario`, `descuento_pct`, `impuestos_pct`) VALUES
(1, 1, 2, 'Batería para Samsung S23 Ultra', 1.0000, 1200.0000, 0.00, 0.00),
(2, 1, NULL, 'Mano de obra por cambio de batería', 1.0000, 250.0000, 0.00, 0.00);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vw_cxc_resumen`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vw_cxc_resumen` (
`cliente_id` bigint(20)
,`razon_social` varchar(200)
,`saldo_abierto` decimal(36,2)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vw_cxp_resumen`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vw_cxp_resumen` (
`proveedor_id` bigint(20)
,`razon_social` varchar(200)
,`saldo_abierto` decimal(36,2)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vw_inventario_actual`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vw_inventario_actual` (
`producto_id` bigint(20)
,`sku` varchar(80)
,`nombre` varchar(200)
,`almacen_id` bigint(20)
,`almacen_nombre` varchar(150)
,`stock` decimal(35,4)
);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adm_bitacora`
--
ALTER TABLE `adm_bitacora`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_bitacora_usuario` (`usuario_id`);

--
-- Indices de la tabla `alm_almacenes`
--
ALTER TABLE `alm_almacenes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clave` (`clave`);

--
-- Indices de la tabla `alm_coordenada`
--
ALTER TABLE `alm_coordenada`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_lote` (`producto_id`,`almacen_id`,`codigo_coordenada`),
  ADD KEY `fk_lote_almacen` (`almacen_id`),
  ADD KEY `fk_lote_seccion` (`seccion_id`);

--
-- Indices de la tabla `alm_secciones`
--
ALTER TABLE `alm_secciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_seccion` (`almacen_id`,`clave`);

--
-- Indices de la tabla `alm_traslados`
--
ALTER TABLE `alm_traslados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `folio` (`folio`),
  ADD KEY `fk_tr_origen` (`almacen_origen_id`),
  ADD KEY `fk_tr_destino` (`almacen_destino_id`),
  ADD KEY `fk_tr_creado` (`creado_por`),
  ADD KEY `fk_tr_recib` (`recibido_por`);

--
-- Indices de la tabla `alm_traslados_det`
--
ALTER TABLE `alm_traslados_det`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_trd_tr` (`traslado_id`),
  ADD KEY `fk_trd_prod` (`producto_id`),
  ADD KEY `fk_trd_lote` (`lote_id`);

--
-- Indices de la tabla `cat_categorias_producto`
--
ALTER TABLE `cat_categorias_producto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `cat_herramientas`
--
ALTER TABLE `cat_herramientas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`sku`);

--
-- Indices de la tabla `cat_manuales`
--
ALTER TABLE `cat_manuales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_manual_producto` (`producto_id`);

--
-- Indices de la tabla `cat_marcas`
--
ALTER TABLE `cat_marcas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `cat_modelos`
--
ALTER TABLE `cat_modelos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_marca_modelo` (`marca_id`,`nombre`,`anio`);

--
-- Indices de la tabla `cat_productos`
--
ALTER TABLE `cat_productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `fk_prod_categoria` (`categoria_id`),
  ADD KEY `fk_prod_marca` (`marca_id`),
  ADD KEY `fk_prod_modelo` (`modelo_id`),
  ADD KEY `fk_prod_version` (`version_id`),
  ADD KEY `idx_cat_productos_nombre` (`nombre`);

--
-- Indices de la tabla `cat_productos_atributos`
--
ALTER TABLE `cat_productos_atributos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_sku` (`sku`);

--
-- Indices de la tabla `cat_productos_series`
--
ALTER TABLE `cat_productos_series`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_serie` (`numero_serie`),
  ADD KEY `fk_series_producto` (`producto_id`);

--
-- Indices de la tabla `cat_versiones`
--
ALTER TABLE `cat_versiones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_modelo_version` (`modelo_id`,`nombre`);

--
-- Indices de la tabla `cli_clientes`
--
ALTER TABLE `cli_clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cliente_tipo` (`tipo_id`),
  ADD KEY `idx_cli_clientes_busqueda` (`razon_social`,`email`,`telefono`);

--
-- Indices de la tabla `cli_contactos`
--
ALTER TABLE `cli_contactos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_contacto_cliente` (`cliente_id`);

--
-- Indices de la tabla `cli_tipos`
--
ALTER TABLE `cli_tipos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clave` (`clave`),
  ADD UNIQUE KEY `etiqueta` (`etiqueta`);

--
-- Indices de la tabla `comm_avisos`
--
ALTER TABLE `comm_avisos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_avisos_usuario` (`creado_por`);

--
-- Indices de la tabla `comm_avisos_destinatarios`
--
ALTER TABLE `comm_avisos_destinatarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_avisodest_aviso` (`aviso_id`),
  ADD KEY `fk_avisodest_usuario` (`usuario_id`);

--
-- Indices de la tabla `comm_solicitudes`
--
ALTER TABLE `comm_solicitudes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `folio` (`folio`),
  ADD KEY `fk_solicitudes_sol` (`solicitante_id`),
  ADD KEY `fk_solicitudes_asig` (`asignado_id`);

--
-- Indices de la tabla `com_ele_comprobantes`
--
ALTER TABLE `com_ele_comprobantes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `fk_ce_venta` (`venta_id`),
  ADD KEY `fk_ce_oc` (`orden_compra_id`);

--
-- Indices de la tabla `com_ordenes_compra`
--
ALTER TABLE `com_ordenes_compra`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `folio` (`folio`),
  ADD KEY `fk_oc_proveedor` (`proveedor_id`),
  ADD KEY `USO` (`finalidad`),
  ADD KEY `srv_folio` (`srv_folio`);

--
-- Indices de la tabla `com_ordenes_compra_det`
--
ALTER TABLE `com_ordenes_compra_det`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ocdet_oc` (`orden_compra_id`),
  ADD KEY `fk_ocdet_prod` (`producto_id`),
  ADD KEY `coordenada_id` (`codigo_coordenada`),
  ADD KEY `codigo_coordenada` (`codigo_coordenada`);

--
-- Indices de la tabla `com_requisiciones`
--
ALTER TABLE `com_requisiciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `folio` (`folio`),
  ADD KEY `fk_req_usuario` (`solicitante_id`);

--
-- Indices de la tabla `com_requisiciones_det`
--
ALTER TABLE `com_requisiciones_det`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reqdet_req` (`requisicion_id`),
  ADD KEY `fk_reqdet_prod` (`producto_id`);

--
-- Indices de la tabla `conv_convenios`
--
ALTER TABLE `conv_convenios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_conv_cliente` (`cliente_id`),
  ADD KEY `fk_conv_proveedor` (`proveedor_id`);

--
-- Indices de la tabla `crm_actividades`
--
ALTER TABLE `crm_actividades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_act_opp` (`oportunidad_id`),
  ADD KEY `fk_act_cli` (`cliente_id`),
  ADD KEY `fk_act_user` (`realizado_por`);

--
-- Indices de la tabla `crm_campanas`
--
ALTER TABLE `crm_campanas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `crm_campanas_segmentos`
--
ALTER TABLE `crm_campanas_segmentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_camp_seg` (`campana_id`);

--
-- Indices de la tabla `crm_envios`
--
ALTER TABLE `crm_envios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_envio_camp` (`campana_id`),
  ADD KEY `fk_envio_cli` (`cliente_id`);

--
-- Indices de la tabla `crm_etapas_oportunidad`
--
ALTER TABLE `crm_etapas_oportunidad`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `crm_lealtad_clientes`
--
ALTER TABLE `crm_lealtad_clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_lealtad_cli` (`programa_id`,`cliente_id`),
  ADD KEY `fk_lp_cliente` (`cliente_id`);

--
-- Indices de la tabla `crm_lealtad_movimientos`
--
ALTER TABLE `crm_lealtad_movimientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_lmov_lealtad` (`lealtad_id`);

--
-- Indices de la tabla `crm_lealtad_programas`
--
ALTER TABLE `crm_lealtad_programas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `crm_oportunidades`
--
ALTER TABLE `crm_oportunidades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_opp_cliente` (`cliente_id`),
  ADD KEY `fk_opp_etapa` (`etapa_id`),
  ADD KEY `fk_opp_responsable` (`responsable_id`);

--
-- Indices de la tabla `crm_promociones`
--
ALTER TABLE `crm_promociones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `crm_promociones_productos`
--
ALTER TABLE `crm_promociones_productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ppromo_promo` (`promocion_id`),
  ADD KEY `fk_ppromo_prod` (`producto_id`);

--
-- Indices de la tabla `crm_tickets`
--
ALTER TABLE `crm_tickets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `folio` (`folio`),
  ADD KEY `fk_tick_cliente` (`cliente_id`),
  ADD KEY `fk_tick_asign` (`asignado_id`);

--
-- Indices de la tabla `crm_tickets_mensajes`
--
ALTER TABLE `crm_tickets_mensajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tmsg_ticket` (`ticket_id`);

--
-- Indices de la tabla `crm_whatsapp_mensajes`
--
ALTER TABLE `crm_whatsapp_mensajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_w_cli` (`cliente_id`),
  ADD KEY `fk_w_user` (`usuario_id`);

--
-- Indices de la tabla `dev_devoluciones`
--
ALTER TABLE `dev_devoluciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `folio` (`folio`),
  ADD KEY `fk_dev_prv` (`proveedor_id`),
  ADD KEY `fk_dev_cli` (`cliente_id`);

--
-- Indices de la tabla `dev_devoluciones_det`
--
ALTER TABLE `dev_devoluciones_det`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_devdet_dev` (`devolucion_id`),
  ADD KEY `fk_devdet_prod` (`producto_id`);

--
-- Indices de la tabla `emp_asistencias`
--
ALTER TABLE `emp_asistencias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_asistencia` (`empleado_id`,`fecha`);

--
-- Indices de la tabla `emp_empleados`
--
ALTER TABLE `emp_empleados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD KEY `fk_empleado_usuario` (`usuario_id`);

--
-- Indices de la tabla `emp_incapacidades_permisos`
--
ALTER TABLE `emp_incapacidades_permisos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_incapacidad_empleado` (`empleado_id`);

--
-- Indices de la tabla `emp_nominas`
--
ALTER TABLE `emp_nominas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_nomina_empleado` (`empleado_id`);

--
-- Indices de la tabla `emp_vacaciones`
--
ALTER TABLE `emp_vacaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vacaciones_empleado` (`empleado_id`);

--
-- Indices de la tabla `fin_cuentas_contables`
--
ALTER TABLE `fin_cuentas_contables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `fin_cxc`
--
ALTER TABLE `fin_cxc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cxc_cliente` (`cliente_id`),
  ADD KEY `fk_cxc_venta` (`venta_id`);

--
-- Indices de la tabla `fin_cxp`
--
ALTER TABLE `fin_cxp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cxp_prv` (`proveedor_id`),
  ADD KEY `fk_cxp_oc` (`orden_compra_id`);

--
-- Indices de la tabla `fin_gastos`
--
ALTER TABLE `fin_gastos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_gasto_usuario` (`usuario_id`);

--
-- Indices de la tabla `fin_pagos`
--
ALTER TABLE `fin_pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pago_cli` (`cliente_id`),
  ADD KEY `fk_pago_prv` (`proveedor_id`),
  ADD KEY `fk_pago_ven` (`venta_id`),
  ADD KEY `fk_pago_oc` (`orden_compra_id`);

--
-- Indices de la tabla `fin_polizas`
--
ALTER TABLE `fin_polizas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `folio` (`folio`);

--
-- Indices de la tabla `fin_polizas_mov`
--
ALTER TABLE `fin_polizas_mov`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_polmov_poliza` (`poliza_id`),
  ADD KEY `fk_polmov_cuenta` (`cuenta_id`);

--
-- Indices de la tabla `inv_ajustes`
--
ALTER TABLE `inv_ajustes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `folio` (`folio`),
  ADD KEY `fk_ajuste_usuario` (`usuario_id`);

--
-- Indices de la tabla `inv_ajustes_det`
--
ALTER TABLE `inv_ajustes_det`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ajdet_aj` (`ajuste_id`),
  ADD KEY `fk_ajdet_prod` (`producto_id`),
  ADD KEY `fk_ajdet_lote` (`lote_id`),
  ADD KEY `fk_ajdet_alm` (`almacen_id`);

--
-- Indices de la tabla `inv_movimientos`
--
ALTER TABLE `inv_movimientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_kardex_lote` (`coordenada_id`),
  ADD KEY `fk_kardex_almacen` (`almacen_id`),
  ADD KEY `fk_kardex_seccion` (`seccion_id`),
  ADD KEY `fk_kardex_usuario` (`usuario_id`),
  ADD KEY `idx_kardex_prod_fecha` (`producto_id`,`fecha`);

--
-- Indices de la tabla `log_recepciones`
--
ALTER TABLE `log_recepciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `folio` (`folio`),
  ADD KEY `fk_rec_oc` (`orden_compra_id`),
  ADD KEY `fk_rec_prv` (`proveedor_id`),
  ADD KEY `fk_rec_alm` (`almacen_id`);

--
-- Indices de la tabla `log_recepciones_det`
--
ALTER TABLE `log_recepciones_det`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_recdet_rec` (`recepcion_id`),
  ADD KEY `fk_recdet_prod` (`producto_id`),
  ADD KEY `fk_recdet_lote` (`lote_id`);

--
-- Indices de la tabla `prv_contactos`
--
ALTER TABLE `prv_contactos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_prv_contacto` (`proveedor_id`);

--
-- Indices de la tabla `prv_proveedores`
--
ALTER TABLE `prv_proveedores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_prv_proveedores_busqueda` (`razon_social`,`email`,`telefono`);

--
-- Indices de la tabla `rn_reglas`
--
ALTER TABLE `rn_reglas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clave` (`clave`);

--
-- Indices de la tabla `seg_permisos`
--
ALTER TABLE `seg_permisos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clave` (`clave`);

--
-- Indices de la tabla `seg_roles`
--
ALTER TABLE `seg_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `seg_rol_permiso`
--
ALTER TABLE `seg_rol_permiso`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_rol_permiso` (`rol_id`,`permiso_id`),
  ADD KEY `fk_rol_permiso_permiso` (`permiso_id`);

--
-- Indices de la tabla `seg_tokens_api`
--
ALTER TABLE `seg_tokens_api`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_hash` (`token_hash`),
  ADD KEY `fk_tokens_usuario` (`usuario_id`);

--
-- Indices de la tabla `seg_usuarios`
--
ALTER TABLE `seg_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `pin` (`pin`);

--
-- Indices de la tabla `seg_usuario_rol`
--
ALTER TABLE `seg_usuario_rol`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_usuario_rol` (`usuario_id`,`rol_id`),
  ADD KEY `fk_usuario_rol_rol` (`rol_id`);

--
-- Indices de la tabla `srv_equipos`
--
ALTER TABLE `srv_equipos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_eq_cliente` (`cliente_id`),
  ADD KEY `fk_eq_marca` (`marca_id`),
  ADD KEY `fk_eq_modelo` (`modelo_id`),
  ADD KEY `fk_eq_version` (`version_id`);

--
-- Indices de la tabla `srv_ordenes`
--
ALTER TABLE `srv_ordenes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `folio` (`folio`),
  ADD KEY `fk_os_cliente` (`cliente_id`),
  ADD KEY `fk_os_equipo` (`equipo_id`),
  ADD KEY `fk_os_tecnico` (`tecnico_id`);

--
-- Indices de la tabla `srv_ordenes_materiales`
--
ALTER TABLE `srv_ordenes_materiales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_osm_os` (`orden_id`),
  ADD KEY `fk_osm_prod` (`producto_id`);

--
-- Indices de la tabla `srv_ordenes_trabajos`
--
ALTER TABLE `srv_ordenes_trabajos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ost_os` (`orden_id`),
  ADD KEY `fk_ost_tecn` (`tecnico_id`);

--
-- Indices de la tabla `ven_presupuestos`
--
ALTER TABLE `ven_presupuestos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `folio` (`folio`),
  ADD KEY `fk_pres_cliente` (`cliente_id`);

--
-- Indices de la tabla `ven_presupuestos_det`
--
ALTER TABLE `ven_presupuestos_det`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_predet_pre` (`presupuesto_id`),
  ADD KEY `fk_predet_prod` (`producto_id`);

--
-- Indices de la tabla `ven_ventas`
--
ALTER TABLE `ven_ventas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `folio` (`folio`),
  ADD KEY `fk_ven_cliente` (`cliente_id`),
  ADD KEY `fk_ven_os` (`orden_id`);

--
-- Indices de la tabla `ven_ventas_det`
--
ALTER TABLE `ven_ventas_det`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vdet_v` (`venta_id`),
  ADD KEY `fk_vdet_prod` (`producto_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adm_bitacora`
--
ALTER TABLE `adm_bitacora`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `alm_almacenes`
--
ALTER TABLE `alm_almacenes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `alm_coordenada`
--
ALTER TABLE `alm_coordenada`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `alm_secciones`
--
ALTER TABLE `alm_secciones`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `alm_traslados`
--
ALTER TABLE `alm_traslados`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `alm_traslados_det`
--
ALTER TABLE `alm_traslados_det`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cat_categorias_producto`
--
ALTER TABLE `cat_categorias_producto`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cat_herramientas`
--
ALTER TABLE `cat_herramientas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cat_manuales`
--
ALTER TABLE `cat_manuales`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cat_marcas`
--
ALTER TABLE `cat_marcas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT de la tabla `cat_modelos`
--
ALTER TABLE `cat_modelos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cat_productos`
--
ALTER TABLE `cat_productos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cat_productos_atributos`
--
ALTER TABLE `cat_productos_atributos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cat_productos_series`
--
ALTER TABLE `cat_productos_series`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cat_versiones`
--
ALTER TABLE `cat_versiones`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cli_clientes`
--
ALTER TABLE `cli_clientes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cli_contactos`
--
ALTER TABLE `cli_contactos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cli_tipos`
--
ALTER TABLE `cli_tipos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `comm_avisos`
--
ALTER TABLE `comm_avisos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `comm_avisos_destinatarios`
--
ALTER TABLE `comm_avisos_destinatarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `comm_solicitudes`
--
ALTER TABLE `comm_solicitudes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `com_ele_comprobantes`
--
ALTER TABLE `com_ele_comprobantes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `com_ordenes_compra`
--
ALTER TABLE `com_ordenes_compra`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `com_ordenes_compra_det`
--
ALTER TABLE `com_ordenes_compra_det`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `com_requisiciones`
--
ALTER TABLE `com_requisiciones`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `com_requisiciones_det`
--
ALTER TABLE `com_requisiciones_det`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `conv_convenios`
--
ALTER TABLE `conv_convenios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `crm_actividades`
--
ALTER TABLE `crm_actividades`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `crm_campanas`
--
ALTER TABLE `crm_campanas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `crm_campanas_segmentos`
--
ALTER TABLE `crm_campanas_segmentos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `crm_envios`
--
ALTER TABLE `crm_envios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `crm_etapas_oportunidad`
--
ALTER TABLE `crm_etapas_oportunidad`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `crm_lealtad_clientes`
--
ALTER TABLE `crm_lealtad_clientes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `crm_lealtad_movimientos`
--
ALTER TABLE `crm_lealtad_movimientos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `crm_lealtad_programas`
--
ALTER TABLE `crm_lealtad_programas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `crm_oportunidades`
--
ALTER TABLE `crm_oportunidades`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `crm_promociones`
--
ALTER TABLE `crm_promociones`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `crm_promociones_productos`
--
ALTER TABLE `crm_promociones_productos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `crm_tickets`
--
ALTER TABLE `crm_tickets`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `crm_tickets_mensajes`
--
ALTER TABLE `crm_tickets_mensajes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `crm_whatsapp_mensajes`
--
ALTER TABLE `crm_whatsapp_mensajes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `dev_devoluciones`
--
ALTER TABLE `dev_devoluciones`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `dev_devoluciones_det`
--
ALTER TABLE `dev_devoluciones_det`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `emp_asistencias`
--
ALTER TABLE `emp_asistencias`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `emp_empleados`
--
ALTER TABLE `emp_empleados`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `emp_incapacidades_permisos`
--
ALTER TABLE `emp_incapacidades_permisos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `emp_nominas`
--
ALTER TABLE `emp_nominas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `emp_vacaciones`
--
ALTER TABLE `emp_vacaciones`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `fin_cuentas_contables`
--
ALTER TABLE `fin_cuentas_contables`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `fin_cxc`
--
ALTER TABLE `fin_cxc`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `fin_cxp`
--
ALTER TABLE `fin_cxp`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `fin_gastos`
--
ALTER TABLE `fin_gastos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `fin_pagos`
--
ALTER TABLE `fin_pagos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `fin_polizas`
--
ALTER TABLE `fin_polizas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `fin_polizas_mov`
--
ALTER TABLE `fin_polizas_mov`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `inv_ajustes`
--
ALTER TABLE `inv_ajustes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `inv_ajustes_det`
--
ALTER TABLE `inv_ajustes_det`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `inv_movimientos`
--
ALTER TABLE `inv_movimientos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `log_recepciones`
--
ALTER TABLE `log_recepciones`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `log_recepciones_det`
--
ALTER TABLE `log_recepciones_det`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `prv_contactos`
--
ALTER TABLE `prv_contactos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `prv_proveedores`
--
ALTER TABLE `prv_proveedores`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `rn_reglas`
--
ALTER TABLE `rn_reglas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `seg_permisos`
--
ALTER TABLE `seg_permisos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `seg_roles`
--
ALTER TABLE `seg_roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `seg_rol_permiso`
--
ALTER TABLE `seg_rol_permiso`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `seg_tokens_api`
--
ALTER TABLE `seg_tokens_api`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `seg_usuarios`
--
ALTER TABLE `seg_usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `seg_usuario_rol`
--
ALTER TABLE `seg_usuario_rol`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `srv_equipos`
--
ALTER TABLE `srv_equipos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `srv_ordenes`
--
ALTER TABLE `srv_ordenes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `srv_ordenes_materiales`
--
ALTER TABLE `srv_ordenes_materiales`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `srv_ordenes_trabajos`
--
ALTER TABLE `srv_ordenes_trabajos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ven_presupuestos`
--
ALTER TABLE `ven_presupuestos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ven_presupuestos_det`
--
ALTER TABLE `ven_presupuestos_det`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ven_ventas`
--
ALTER TABLE `ven_ventas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ven_ventas_det`
--
ALTER TABLE `ven_ventas_det`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- --------------------------------------------------------

--
-- Estructura para la vista `vw_cxc_resumen`
--
DROP TABLE IF EXISTS `vw_cxc_resumen`;

CREATE ALGORITHM=UNDEFINED DEFINER=`megashop`@`localhost` SQL SECURITY DEFINER VIEW `vw_cxc_resumen`  AS SELECT `c`.`id` AS `cliente_id`, `c`.`razon_social` AS `razon_social`, sum(case when `x`.`estado` in ('ABIERTA','PARCIAL','VENCIDA') then `x`.`saldo` else 0 end) AS `saldo_abierto` FROM (`cli_clientes` `c` left join `fin_cxc` `x` on(`x`.`cliente_id` = `c`.`id`)) GROUP BY `c`.`id`, `c`.`razon_social` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vw_cxp_resumen`
--
DROP TABLE IF EXISTS `vw_cxp_resumen`;

CREATE ALGORITHM=UNDEFINED DEFINER=`megashop`@`localhost` SQL SECURITY DEFINER VIEW `vw_cxp_resumen`  AS SELECT `p`.`id` AS `proveedor_id`, `p`.`razon_social` AS `razon_social`, sum(case when `x`.`estado` in ('ABIERTA','PARCIAL','VENCIDA') then `x`.`saldo` else 0 end) AS `saldo_abierto` FROM (`prv_proveedores` `p` left join `fin_cxp` `x` on(`x`.`proveedor_id` = `p`.`id`)) GROUP BY `p`.`id`, `p`.`razon_social` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vw_inventario_actual`
--
DROP TABLE IF EXISTS `vw_inventario_actual`;

CREATE ALGORITHM=UNDEFINED DEFINER=`megashop`@`localhost` SQL SECURITY DEFINER VIEW `vw_inventario_actual`  AS SELECT `p`.`id` AS `producto_id`, `p`.`sku` AS `sku`, `p`.`nombre` AS `nombre`, `a`.`id` AS `almacen_id`, `a`.`nombre` AS `almacen_nombre`, sum(case when `m`.`tipo` in ('ENTRADA','AJUSTE_POSITIVO','TRASLADO_ENTRADA','DEVOLUCION_ENTRADA') then `m`.`cantidad` else 0 end) - sum(case when `m`.`tipo` in ('SALIDA','AJUSTE_NEGATIVO','TRASLADO_SALIDA','DEVOLUCION_SALIDA') then `m`.`cantidad` else 0 end) AS `stock` FROM ((`cat_productos` `p` join `inv_movimientos` `m` on(`m`.`producto_id` = `p`.`id`)) join `alm_almacenes` `a` on(`a`.`id` = `m`.`almacen_id`)) GROUP BY `p`.`id`, `a`.`id` ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adm_bitacora`
--
ALTER TABLE `adm_bitacora`
  ADD CONSTRAINT `fk_bitacora_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `alm_coordenada`
--
ALTER TABLE `alm_coordenada`
  ADD CONSTRAINT `fk_lote_almacen` FOREIGN KEY (`almacen_id`) REFERENCES `alm_almacenes` (`id`),
  ADD CONSTRAINT `fk_lote_producto` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`),
  ADD CONSTRAINT `fk_lote_seccion` FOREIGN KEY (`seccion_id`) REFERENCES `alm_secciones` (`id`);

--
-- Filtros para la tabla `alm_secciones`
--
ALTER TABLE `alm_secciones`
  ADD CONSTRAINT `fk_seccion_almacen` FOREIGN KEY (`almacen_id`) REFERENCES `alm_almacenes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `alm_traslados`
--
ALTER TABLE `alm_traslados`
  ADD CONSTRAINT `fk_tr_creado` FOREIGN KEY (`creado_por`) REFERENCES `seg_usuarios` (`id`),
  ADD CONSTRAINT `fk_tr_destino` FOREIGN KEY (`almacen_destino_id`) REFERENCES `alm_almacenes` (`id`),
  ADD CONSTRAINT `fk_tr_origen` FOREIGN KEY (`almacen_origen_id`) REFERENCES `alm_almacenes` (`id`),
  ADD CONSTRAINT `fk_tr_recib` FOREIGN KEY (`recibido_por`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `alm_traslados_det`
--
ALTER TABLE `alm_traslados_det`
  ADD CONSTRAINT `fk_trd_lote` FOREIGN KEY (`lote_id`) REFERENCES `alm_coordenada` (`id`),
  ADD CONSTRAINT `fk_trd_prod` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`),
  ADD CONSTRAINT `fk_trd_tr` FOREIGN KEY (`traslado_id`) REFERENCES `alm_traslados` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `cat_manuales`
--
ALTER TABLE `cat_manuales`
  ADD CONSTRAINT `fk_manual_producto` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`);

--
-- Filtros para la tabla `cat_modelos`
--
ALTER TABLE `cat_modelos`
  ADD CONSTRAINT `fk_modelo_marca` FOREIGN KEY (`marca_id`) REFERENCES `cat_marcas` (`id`);

--
-- Filtros para la tabla `cat_productos`
--
ALTER TABLE `cat_productos`
  ADD CONSTRAINT `fk_prod_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `cat_categorias_producto` (`id`),
  ADD CONSTRAINT `fk_prod_marca` FOREIGN KEY (`marca_id`) REFERENCES `cat_marcas` (`id`),
  ADD CONSTRAINT `fk_prod_modelo` FOREIGN KEY (`modelo_id`) REFERENCES `cat_modelos` (`id`),
  ADD CONSTRAINT `fk_prod_version` FOREIGN KEY (`version_id`) REFERENCES `cat_versiones` (`id`);

--
-- Filtros para la tabla `cat_productos_series`
--
ALTER TABLE `cat_productos_series`
  ADD CONSTRAINT `fk_series_producto` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`);

--
-- Filtros para la tabla `cat_versiones`
--
ALTER TABLE `cat_versiones`
  ADD CONSTRAINT `fk_version_modelo` FOREIGN KEY (`modelo_id`) REFERENCES `cat_modelos` (`id`);

--
-- Filtros para la tabla `cli_clientes`
--
ALTER TABLE `cli_clientes`
  ADD CONSTRAINT `fk_cliente_tipo` FOREIGN KEY (`tipo_id`) REFERENCES `cli_tipos` (`id`);

--
-- Filtros para la tabla `cli_contactos`
--
ALTER TABLE `cli_contactos`
  ADD CONSTRAINT `fk_contacto_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `comm_avisos`
--
ALTER TABLE `comm_avisos`
  ADD CONSTRAINT `fk_avisos_usuario` FOREIGN KEY (`creado_por`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `comm_avisos_destinatarios`
--
ALTER TABLE `comm_avisos_destinatarios`
  ADD CONSTRAINT `fk_avisodest_aviso` FOREIGN KEY (`aviso_id`) REFERENCES `comm_avisos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_avisodest_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `comm_solicitudes`
--
ALTER TABLE `comm_solicitudes`
  ADD CONSTRAINT `fk_solicitudes_asig` FOREIGN KEY (`asignado_id`) REFERENCES `seg_usuarios` (`id`),
  ADD CONSTRAINT `fk_solicitudes_sol` FOREIGN KEY (`solicitante_id`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `com_ele_comprobantes`
--
ALTER TABLE `com_ele_comprobantes`
  ADD CONSTRAINT `fk_ce_oc` FOREIGN KEY (`orden_compra_id`) REFERENCES `com_ordenes_compra` (`id`),
  ADD CONSTRAINT `fk_ce_venta` FOREIGN KEY (`venta_id`) REFERENCES `ven_ventas` (`id`);

--
-- Filtros para la tabla `com_ordenes_compra`
--
ALTER TABLE `com_ordenes_compra`
  ADD CONSTRAINT `fk_oc_proveedor` FOREIGN KEY (`proveedor_id`) REFERENCES `prv_proveedores` (`id`);

--
-- Filtros para la tabla `com_ordenes_compra_det`
--
ALTER TABLE `com_ordenes_compra_det`
  ADD CONSTRAINT `fk_ocdet_oc` FOREIGN KEY (`orden_compra_id`) REFERENCES `com_ordenes_compra` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ocdet_prod` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`);

--
-- Filtros para la tabla `com_requisiciones`
--
ALTER TABLE `com_requisiciones`
  ADD CONSTRAINT `fk_req_usuario` FOREIGN KEY (`solicitante_id`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `com_requisiciones_det`
--
ALTER TABLE `com_requisiciones_det`
  ADD CONSTRAINT `fk_reqdet_prod` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`),
  ADD CONSTRAINT `fk_reqdet_req` FOREIGN KEY (`requisicion_id`) REFERENCES `com_requisiciones` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `conv_convenios`
--
ALTER TABLE `conv_convenios`
  ADD CONSTRAINT `fk_conv_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`),
  ADD CONSTRAINT `fk_conv_proveedor` FOREIGN KEY (`proveedor_id`) REFERENCES `prv_proveedores` (`id`);

--
-- Filtros para la tabla `crm_actividades`
--
ALTER TABLE `crm_actividades`
  ADD CONSTRAINT `fk_act_cli` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`),
  ADD CONSTRAINT `fk_act_opp` FOREIGN KEY (`oportunidad_id`) REFERENCES `crm_oportunidades` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_act_user` FOREIGN KEY (`realizado_por`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `crm_campanas_segmentos`
--
ALTER TABLE `crm_campanas_segmentos`
  ADD CONSTRAINT `fk_camp_seg` FOREIGN KEY (`campana_id`) REFERENCES `crm_campanas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `crm_envios`
--
ALTER TABLE `crm_envios`
  ADD CONSTRAINT `fk_envio_camp` FOREIGN KEY (`campana_id`) REFERENCES `crm_campanas` (`id`),
  ADD CONSTRAINT `fk_envio_cli` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`);

--
-- Filtros para la tabla `crm_lealtad_clientes`
--
ALTER TABLE `crm_lealtad_clientes`
  ADD CONSTRAINT `fk_lp_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`),
  ADD CONSTRAINT `fk_lp_programa` FOREIGN KEY (`programa_id`) REFERENCES `crm_lealtad_programas` (`id`);

--
-- Filtros para la tabla `crm_lealtad_movimientos`
--
ALTER TABLE `crm_lealtad_movimientos`
  ADD CONSTRAINT `fk_lmov_lealtad` FOREIGN KEY (`lealtad_id`) REFERENCES `crm_lealtad_clientes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `crm_oportunidades`
--
ALTER TABLE `crm_oportunidades`
  ADD CONSTRAINT `fk_opp_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`),
  ADD CONSTRAINT `fk_opp_etapa` FOREIGN KEY (`etapa_id`) REFERENCES `crm_etapas_oportunidad` (`id`),
  ADD CONSTRAINT `fk_opp_responsable` FOREIGN KEY (`responsable_id`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `crm_promociones_productos`
--
ALTER TABLE `crm_promociones_productos`
  ADD CONSTRAINT `fk_ppromo_prod` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`),
  ADD CONSTRAINT `fk_ppromo_promo` FOREIGN KEY (`promocion_id`) REFERENCES `crm_promociones` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `crm_tickets`
--
ALTER TABLE `crm_tickets`
  ADD CONSTRAINT `fk_tick_asign` FOREIGN KEY (`asignado_id`) REFERENCES `seg_usuarios` (`id`),
  ADD CONSTRAINT `fk_tick_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`);

--
-- Filtros para la tabla `crm_tickets_mensajes`
--
ALTER TABLE `crm_tickets_mensajes`
  ADD CONSTRAINT `fk_tmsg_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `crm_tickets` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `crm_whatsapp_mensajes`
--
ALTER TABLE `crm_whatsapp_mensajes`
  ADD CONSTRAINT `fk_w_cli` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`),
  ADD CONSTRAINT `fk_w_user` FOREIGN KEY (`usuario_id`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `dev_devoluciones`
--
ALTER TABLE `dev_devoluciones`
  ADD CONSTRAINT `fk_dev_cli` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`),
  ADD CONSTRAINT `fk_dev_prv` FOREIGN KEY (`proveedor_id`) REFERENCES `prv_proveedores` (`id`);

--
-- Filtros para la tabla `dev_devoluciones_det`
--
ALTER TABLE `dev_devoluciones_det`
  ADD CONSTRAINT `fk_devdet_dev` FOREIGN KEY (`devolucion_id`) REFERENCES `dev_devoluciones` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_devdet_prod` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`);

--
-- Filtros para la tabla `emp_asistencias`
--
ALTER TABLE `emp_asistencias`
  ADD CONSTRAINT `fk_asistencia_empleado` FOREIGN KEY (`empleado_id`) REFERENCES `emp_empleados` (`id`);

--
-- Filtros para la tabla `emp_empleados`
--
ALTER TABLE `emp_empleados`
  ADD CONSTRAINT `fk_empleado_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `emp_incapacidades_permisos`
--
ALTER TABLE `emp_incapacidades_permisos`
  ADD CONSTRAINT `fk_incapacidad_empleado` FOREIGN KEY (`empleado_id`) REFERENCES `emp_empleados` (`id`);

--
-- Filtros para la tabla `emp_nominas`
--
ALTER TABLE `emp_nominas`
  ADD CONSTRAINT `fk_nomina_empleado` FOREIGN KEY (`empleado_id`) REFERENCES `emp_empleados` (`id`);

--
-- Filtros para la tabla `emp_vacaciones`
--
ALTER TABLE `emp_vacaciones`
  ADD CONSTRAINT `fk_vacaciones_empleado` FOREIGN KEY (`empleado_id`) REFERENCES `emp_empleados` (`id`);

--
-- Filtros para la tabla `fin_cxc`
--
ALTER TABLE `fin_cxc`
  ADD CONSTRAINT `fk_cxc_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`),
  ADD CONSTRAINT `fk_cxc_venta` FOREIGN KEY (`venta_id`) REFERENCES `ven_ventas` (`id`);

--
-- Filtros para la tabla `fin_cxp`
--
ALTER TABLE `fin_cxp`
  ADD CONSTRAINT `fk_cxp_oc` FOREIGN KEY (`orden_compra_id`) REFERENCES `com_ordenes_compra` (`id`),
  ADD CONSTRAINT `fk_cxp_prv` FOREIGN KEY (`proveedor_id`) REFERENCES `prv_proveedores` (`id`);

--
-- Filtros para la tabla `fin_gastos`
--
ALTER TABLE `fin_gastos`
  ADD CONSTRAINT `fk_gasto_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `fin_pagos`
--
ALTER TABLE `fin_pagos`
  ADD CONSTRAINT `fk_pago_cli` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`),
  ADD CONSTRAINT `fk_pago_oc` FOREIGN KEY (`orden_compra_id`) REFERENCES `com_ordenes_compra` (`id`),
  ADD CONSTRAINT `fk_pago_prv` FOREIGN KEY (`proveedor_id`) REFERENCES `prv_proveedores` (`id`),
  ADD CONSTRAINT `fk_pago_ven` FOREIGN KEY (`venta_id`) REFERENCES `ven_ventas` (`id`);

--
-- Filtros para la tabla `fin_polizas_mov`
--
ALTER TABLE `fin_polizas_mov`
  ADD CONSTRAINT `fk_polmov_cuenta` FOREIGN KEY (`cuenta_id`) REFERENCES `fin_cuentas_contables` (`id`),
  ADD CONSTRAINT `fk_polmov_poliza` FOREIGN KEY (`poliza_id`) REFERENCES `fin_polizas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `inv_ajustes`
--
ALTER TABLE `inv_ajustes`
  ADD CONSTRAINT `fk_ajuste_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `inv_ajustes_det`
--
ALTER TABLE `inv_ajustes_det`
  ADD CONSTRAINT `fk_ajdet_aj` FOREIGN KEY (`ajuste_id`) REFERENCES `inv_ajustes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ajdet_alm` FOREIGN KEY (`almacen_id`) REFERENCES `alm_almacenes` (`id`),
  ADD CONSTRAINT `fk_ajdet_lote` FOREIGN KEY (`lote_id`) REFERENCES `alm_coordenada` (`id`),
  ADD CONSTRAINT `fk_ajdet_prod` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`);

--
-- Filtros para la tabla `inv_movimientos`
--
ALTER TABLE `inv_movimientos`
  ADD CONSTRAINT `fk_kardex_almacen` FOREIGN KEY (`almacen_id`) REFERENCES `alm_almacenes` (`id`),
  ADD CONSTRAINT `fk_kardex_lote` FOREIGN KEY (`coordenada_id`) REFERENCES `alm_coordenada` (`id`),
  ADD CONSTRAINT `fk_kardex_producto` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`),
  ADD CONSTRAINT `fk_kardex_seccion` FOREIGN KEY (`seccion_id`) REFERENCES `alm_secciones` (`id`),
  ADD CONSTRAINT `fk_kardex_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `log_recepciones`
--
ALTER TABLE `log_recepciones`
  ADD CONSTRAINT `fk_rec_alm` FOREIGN KEY (`almacen_id`) REFERENCES `alm_almacenes` (`id`),
  ADD CONSTRAINT `fk_rec_oc` FOREIGN KEY (`orden_compra_id`) REFERENCES `com_ordenes_compra` (`id`),
  ADD CONSTRAINT `fk_rec_prv` FOREIGN KEY (`proveedor_id`) REFERENCES `prv_proveedores` (`id`);

--
-- Filtros para la tabla `log_recepciones_det`
--
ALTER TABLE `log_recepciones_det`
  ADD CONSTRAINT `fk_recdet_lote` FOREIGN KEY (`lote_id`) REFERENCES `alm_coordenada` (`id`),
  ADD CONSTRAINT `fk_recdet_prod` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`),
  ADD CONSTRAINT `fk_recdet_rec` FOREIGN KEY (`recepcion_id`) REFERENCES `log_recepciones` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `prv_contactos`
--
ALTER TABLE `prv_contactos`
  ADD CONSTRAINT `fk_prv_contacto` FOREIGN KEY (`proveedor_id`) REFERENCES `prv_proveedores` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `seg_rol_permiso`
--
ALTER TABLE `seg_rol_permiso`
  ADD CONSTRAINT `fk_rol_permiso_permiso` FOREIGN KEY (`permiso_id`) REFERENCES `seg_permisos` (`id`),
  ADD CONSTRAINT `fk_rol_permiso_rol` FOREIGN KEY (`rol_id`) REFERENCES `seg_roles` (`id`);

--
-- Filtros para la tabla `seg_tokens_api`
--
ALTER TABLE `seg_tokens_api`
  ADD CONSTRAINT `fk_tokens_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `seg_usuario_rol`
--
ALTER TABLE `seg_usuario_rol`
  ADD CONSTRAINT `fk_usuario_rol_rol` FOREIGN KEY (`rol_id`) REFERENCES `seg_roles` (`id`),
  ADD CONSTRAINT `fk_usuario_rol_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `seg_usuarios` (`id`);

--
-- Filtros para la tabla `srv_equipos`
--
ALTER TABLE `srv_equipos`
  ADD CONSTRAINT `fk_eq_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`),
  ADD CONSTRAINT `fk_eq_marca` FOREIGN KEY (`marca_id`) REFERENCES `cat_marcas` (`id`),
  ADD CONSTRAINT `fk_eq_modelo` FOREIGN KEY (`modelo_id`) REFERENCES `cat_modelos` (`id`),
  ADD CONSTRAINT `fk_eq_version` FOREIGN KEY (`version_id`) REFERENCES `cat_versiones` (`id`);

--
-- Filtros para la tabla `srv_ordenes`
--
ALTER TABLE `srv_ordenes`
  ADD CONSTRAINT `fk_os_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`),
  ADD CONSTRAINT `fk_os_equipo` FOREIGN KEY (`equipo_id`) REFERENCES `srv_equipos` (`id`),
  ADD CONSTRAINT `fk_os_tecnico` FOREIGN KEY (`tecnico_id`) REFERENCES `emp_empleados` (`id`);

--
-- Filtros para la tabla `srv_ordenes_materiales`
--
ALTER TABLE `srv_ordenes_materiales`
  ADD CONSTRAINT `fk_osm_os` FOREIGN KEY (`orden_id`) REFERENCES `srv_ordenes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_osm_prod` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`);

--
-- Filtros para la tabla `srv_ordenes_trabajos`
--
ALTER TABLE `srv_ordenes_trabajos`
  ADD CONSTRAINT `fk_ost_os` FOREIGN KEY (`orden_id`) REFERENCES `srv_ordenes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ost_tecn` FOREIGN KEY (`tecnico_id`) REFERENCES `emp_empleados` (`id`);

--
-- Filtros para la tabla `ven_presupuestos`
--
ALTER TABLE `ven_presupuestos`
  ADD CONSTRAINT `fk_pres_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`);

--
-- Filtros para la tabla `ven_presupuestos_det`
--
ALTER TABLE `ven_presupuestos_det`
  ADD CONSTRAINT `fk_predet_pre` FOREIGN KEY (`presupuesto_id`) REFERENCES `ven_presupuestos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_predet_prod` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`);

--
-- Filtros para la tabla `ven_ventas`
--
ALTER TABLE `ven_ventas`
  ADD CONSTRAINT `fk_ven_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cli_clientes` (`id`),
  ADD CONSTRAINT `fk_ven_os` FOREIGN KEY (`orden_id`) REFERENCES `srv_ordenes` (`id`);

--
-- Filtros para la tabla `ven_ventas_det`
--
ALTER TABLE `ven_ventas_det`
  ADD CONSTRAINT `fk_vdet_prod` FOREIGN KEY (`producto_id`) REFERENCES `cat_productos` (`id`),
  ADD CONSTRAINT `fk_vdet_v` FOREIGN KEY (`venta_id`) REFERENCES `ven_ventas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
