-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Máj 29. 17:48
-- Kiszolgáló verziója: 5.7.17
-- PHP verzió: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `villamos`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `highscore`
--

CREATE TABLE `highscore` (
  `name` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `score` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `inserted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `highscore`
--

INSERT INTO `highscore` (`name`, `score`, `inserted`) VALUES
('---', 0, '2023-05-29 10:25:23'),
('---', 0, '2023-05-29 10:25:28'),
('---', 0, '2023-05-29 10:25:33'),
('---', 0, '2023-05-29 10:25:36'),
('---', 0, '2023-05-29 10:25:40'),
('---', 0, '2023-05-29 10:25:42'),
('---', 0, '2023-05-29 10:25:43'),
('---', 0, '2023-05-29 10:25:44'),
('---', 0, '2023-05-29 10:25:45'),
('---', 0, '2023-05-29 10:25:52'),
('---', 0, '2023-05-29 10:25:55'),
('---', 0, '2023-05-29 10:26:03'),
('---', 0, '2023-05-29 10:26:43'),
('---', 0, '2023-05-29 10:26:46'),
('---', 0, '2023-05-29 12:46:34'),
('---', 0, '2023-05-29 14:17:39'),
('---', 0, '2023-05-29 15:31:33'),
('---', 0, '2023-05-29 15:41:54'),
('---', 0, '2023-05-29 15:44:35'),
('---', 0, '2023-05-29 15:44:35');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `highscore`
--
ALTER TABLE `highscore`
  ADD KEY `name` (`name`),
  ADD KEY `score` (`score`),
  ADD KEY `inserted` (`inserted`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
