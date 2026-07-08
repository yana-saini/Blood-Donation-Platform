-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2026 at 04:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blood_donation_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `type`, `is_read`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'New blood request (O+) from a patient', 'request', 0, '2026-07-05 11:48:25', '2026-07-05 11:48:25'),
(2, 2, 'Your blood request was accepted', 'accepted', 0, '2026-07-05 11:53:37', '2026-07-05 11:53:37'),
(3, 4, 'New blood request (O+) from a patient', 'request', 0, '2026-07-06 05:25:17', '2026-07-06 05:25:17'),
(4, 1, 'New blood request (O+) from a patient', 'request', 0, '2026-07-06 05:25:40', '2026-07-06 05:25:40'),
(5, 5, 'Your blood request was accepted', 'accepted', 0, '2026-07-06 05:29:18', '2026-07-06 05:29:18'),
(6, 1, 'New blood request (O+) from a patient', 'request', 0, '2026-07-06 05:42:03', '2026-07-06 05:42:03'),
(7, 1, 'New blood request (O+) from a patient', 'request', 0, '2026-07-06 07:42:42', '2026-07-06 07:42:42'),
(8, 2, 'New blood request (O+) from a patient', 'request', 0, '2026-07-06 07:49:43', '2026-07-06 07:49:43'),
(9, 4, 'Your blood request was accepted', 'accepted', 0, '2026-07-06 07:50:17', '2026-07-06 07:50:17');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `donor_id` int(11) DEFAULT NULL,
  `blood_group` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL,
  `message` text DEFAULT NULL,
  `status` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `patient_id`, `donor_id`, `blood_group`, `message`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 'O+', 'i need urgent', 'accepted', '2026-07-05 11:48:25', '2026-07-05 11:53:37'),
(2, 5, 4, 'O+', 'urgent need', 'accepted', '2026-07-06 05:25:17', '2026-07-06 05:29:18'),
(3, 5, 1, 'O+', '', 'pending', '2026-07-06 05:25:40', '2026-07-06 05:25:40'),
(4, 4, 1, 'O+', 'please help', 'pending', '2026-07-06 05:42:03', '2026-07-06 05:42:03'),
(5, 2, 1, 'O+', 'i need urgent ', 'pending', '2026-07-06 07:42:42', '2026-07-06 07:42:42'),
(6, 4, 2, 'O+', 'urgent', 'accepted', '2026-07-06 07:49:43', '2026-07-06 07:50:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `blood_group` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `role` enum('donor','patient','admin') NOT NULL DEFAULT 'patient',
  `availability` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `blood_group`, `city`, `role`, `availability`, `createdAt`, `updatedAt`) VALUES
(1, 'Test Donor', 'donor1@test.com', '$2a$10$Rkcg6PUsRX9g0seBfCkgUeBWrzAt2Po5ke5F9Zp0WRR0IJab4MEm.', '9876543210', 'O+', 'Mumbai', 'donor', 1, '2026-07-05 10:22:17', '2026-07-05 10:22:17'),
(2, 'Yana Saini ', 'yana123@gmail.com', '$2a$10$1F.Q9cCoPSgcHf.Pc88LPejjHq42OH80uGrdzdHPGzRv9J86RJg4S', '6203002285', 'O+', 'mandi', 'patient', 1, '2026-07-05 11:15:19', '2026-07-08 12:32:48'),
(3, 'Admin User', 'admin@test.com', '$2a$10$1GGErBP1tRR1DSheajSeDeoo3m0y7iWHylivtuAQ5n5XrBMfzDeE6', NULL, NULL, NULL, 'admin', 1, '2026-07-05 11:58:08', '2026-07-05 11:58:08'),
(4, 'Nikita Saini', 'ns27@gmail.com', '$2a$10$ZqK1xZd6/ab1qdZt3dgqKOGoMJta5A/NpsBKr7hIyYIxvJ.RvNw8u', '1234567890', 'O+', 'Mohali', 'patient', 1, '2026-07-06 05:21:25', '2026-07-08 12:35:30'),
(5, 'Priyanshu', 'priyanshu29@gmail.com', '$2a$10$cNSWWJCO3cw68YwnOQ/PYeVfeGYZVPHrkhaKd1xT6fkdSy/R9M/O2', '1234567890', 'O+', 'Mohali', 'patient', 1, '2026-07-06 05:24:50', '2026-07-06 05:24:50'),
(6, 'Shelly', 'shelly1234@gmail.com', '$2a$10$RXYAiKWxGSUdD/Qx0VeDm.bu6ZeIEpn/iaJIMFZ57ma/Ipy3jBFAm', '6203002285', 'AB+', 'Delhi', 'donor', 1, '2026-07-06 07:47:37', '2026-07-06 07:47:37'),
(7, 'priyanka', 'priyanka@gmail.com', '$2a$10$sVJQAbpds41Umk7Rfv8gtO1pjqnu8D/mw8IO2qnI/eXsEkqPG1cga', '6203062285', 'B+', 'Sunder Nagar', 'patient', 1, '2026-07-06 08:07:59', '2026-07-06 08:07:59'),
(8, 'yannaaaa', 'yanasaini2007@gmail.com', '$2a$10$kavCwbJ8DugXCx/BwHv0aeTz1QYbfNAzNtJBlXvDoCKNIPuCHXjYm', '6203002289', 'B+', 'mandi', 'donor', 1, '2026-07-07 05:03:23', '2026-07-07 05:03:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `donor_id` (`donor_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`donor_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
