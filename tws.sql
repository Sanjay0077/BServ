-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220531.aadb8cc914
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2022 at 03:15 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tws`
--
CREATE DATABASE IF NOT EXISTS `tws` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tws`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'sanjay@gmail.com', '$2a$12$xK4oYmkUVQs3PGCPFpEK8ud/3CUqr1L/.k9ol2ROX6pNJ/K4Nzu7W');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(18, 'Sanjay S', 'sanjay@gmail.com', '$2a$12$vWkiVjJnNZTYLGwjqrCFCOXE/EIF0DPu54ts/ghICU/17KyGa0IlS'),
(19, 'jibin', 'jibinmadhu@gmail.com', '$2a$12$y.P7Vo1xLRsBNaBR4X3ftuvYp4xdeFM0jvrQlCcQIbNpFLjs69B/W');

-- --------------------------------------------------------

--
-- Table structure for table `u_details`
--

CREATE TABLE `u_details` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `contact_no` bigint(20) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `v_model` varchar(30) NOT NULL,
  `v_no` varchar(30) NOT NULL,
  `license_no` varchar(30) NOT NULL,
  `service_type` varchar(30) NOT NULL,
  `registered_date` datetime NOT NULL DEFAULT current_timestamp(),
  `delivery_date` date DEFAULT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `u_details`
--

INSERT INTO `u_details` (`id`, `name`, `email`, `contact_no`, `gender`, `v_model`, `v_no`, `license_no`, `service_type`, `registered_date`, `delivery_date`, `status`) VALUES
(35, 'Sanjay S', 'ssanjay0036@gmail.com', 8838614764, 'male', 'Herohonda', 'TN 33 TH 1234', 'TN23456789321', 'General Checkup', '2022-05-28 18:11:24', NULL, 'Pending'),
(37, 'JIBIN', 'jibinmadhu@gmail.com', 9876543210, 'male', 'Herohonda', 'TN 33 TH 1234', 'TN1234565432', 'General Checkup', '2022-05-30 19:01:12', '2022-06-02', 'Delivered');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `u_details`
--
ALTER TABLE `u_details`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `u_details`
--
ALTER TABLE `u_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



