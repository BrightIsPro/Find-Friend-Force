-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for project_wormbutterfly
CREATE DATABASE IF NOT EXISTS `project_wormbutterfly` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `project_wormbutterfly`;

-- Dumping structure for table project_wormbutterfly.friendship
CREATE TABLE IF NOT EXISTS `friendship` (
  `friendship_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  PRIMARY KEY (`friendship_id`),
  KEY `user_friendship` (`user_id`),
  CONSTRAINT `user_friendship` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table project_wormbutterfly.friendship: ~0 rows (approximately)

-- Dumping structure for table project_wormbutterfly.party
CREATE TABLE IF NOT EXISTS `party` (
  `party_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `party_name` varchar(50) DEFAULT 'noname',
  PRIMARY KEY (`party_id`),
  KEY `user_id1` (`user_id`),
  CONSTRAINT `user_id1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table project_wormbutterfly.party: ~0 rows (approximately)

-- Dumping structure for table project_wormbutterfly.streaming_room
CREATE TABLE IF NOT EXISTS `streaming_room` (
  `streaming_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `streaming_name` varchar(50) DEFAULT 'Noname',
  PRIMARY KEY (`streaming_id`) USING BTREE,
  KEY `user_id0` (`user_id`),
  CONSTRAINT `user_id0` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table project_wormbutterfly.streaming_room: ~1 rows (approximately)
REPLACE INTO `streaming_room` (`streaming_id`, `user_id`, `streaming_name`) VALUES
	(1, 1, 'Rov ตึงๆ'),
	(2, 2, 'Dancin');

-- Dumping structure for table project_wormbutterfly.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `name_profile` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `amount_hours` time DEFAULT '00:00:00',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2147483648 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table project_wormbutterfly.users: ~2 rows (approximately)
REPLACE INTO `users` (`user_id`, `name_profile`, `username`, `password`, `email`, `profile_picture`, `amount_hours`) VALUES
	(1, 'kingo', 'asdwe122', 'asdwe122', 'kingo', '1111', '00:00:00'),
	(2, 'dsadad', 'asdad', 'asdada', 'asdada', 'ddsa', '04:00:00');

-- Dumping structure for table project_wormbutterfly.users_party
CREATE TABLE IF NOT EXISTS `users_party` (
  `party_id` int(10) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  KEY `users_party` (`user_id`),
  KEY `party_users` (`party_id`),
  CONSTRAINT `party_users` FOREIGN KEY (`party_id`) REFERENCES `party` (`party_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `users_party` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table project_wormbutterfly.users_party: ~0 rows (approximately)

-- Dumping structure for table project_wormbutterfly.users_streaming_room
CREATE TABLE IF NOT EXISTS `users_streaming_room` (
  `streaming_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `amount_watcher` int(10) DEFAULT 0,
  KEY `user_streaming_room` (`user_id`,`streaming_id`) USING BTREE,
  KEY `streaming_room_user` (`streaming_id`),
  CONSTRAINT `streaming_room_user` FOREIGN KEY (`streaming_id`) REFERENCES `streaming_room` (`streaming_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `user_streaming_room` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table project_wormbutterfly.users_streaming_room: ~2 rows (approximately)
REPLACE INTO `users_streaming_room` (`streaming_id`, `user_id`, `amount_watcher`) VALUES
	(2, 2, 900),
	(1, 1, 3900);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
