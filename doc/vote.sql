-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.6.24-log


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema vote
--

CREATE DATABASE IF NOT EXISTS vote;
USE vote;

--
-- Definition of table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`id`,`password`,`name`) VALUES 
 ('admin','admin','admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;


--
-- Definition of table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
CREATE TABLE `audit_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operatorId` int(11) DEFAULT NULL,
  `operator_name` varchar(64) DEFAULT NULL,
  `operator_time` varchar(64) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `memo` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `audit_log`
--

/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;


--
-- Definition of table `avoid_unit`
--

DROP TABLE IF EXISTS `avoid_unit`;
CREATE TABLE `avoid_unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `unit_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `avoid_unit`
--

/*!40000 ALTER TABLE `avoid_unit` DISABLE KEYS */;
/*!40000 ALTER TABLE `avoid_unit` ENABLE KEYS */;


--
-- Definition of table `choose`
--

DROP TABLE IF EXISTS `choose`;
CREATE TABLE `choose` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) DEFAULT NULL,
  `notice_way` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `expert_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `choose`
--

/*!40000 ALTER TABLE `choose` DISABLE KEYS */;
/*!40000 ALTER TABLE `choose` ENABLE KEYS */;


--
-- Definition of table `config`
--

DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `sval` longtext,
  `ival` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `config`
--

/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` (`id`,`name`,`sval`,`ival`) VALUES 
 (1,'SystemStatus',NULL,0);
/*!40000 ALTER TABLE `config` ENABLE KEYS */;


--
-- Definition of table `expert`
--

DROP TABLE IF EXISTS `expert`;
CREATE TABLE `expert` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `gender` varchar(8) DEFAULT NULL,
  `title` varchar(64) DEFAULT NULL,
  `idsn` varchar(64) DEFAULT NULL,
  `city` varchar(64) DEFAULT NULL,
  `tel` varchar(32) DEFAULT NULL,
  `admission` varchar(32) DEFAULT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `expert`
--

/*!40000 ALTER TABLE `expert` DISABLE KEYS */;
INSERT INTO `expert` (`id`,`name`,`gender`,`title`,`idsn`,`city`,`tel`,`admission`,`unit_id`,`status`) VALUES 
 (1,'梁松阳','男',NULL,'220302196903080628','长春','13944406213','2016-01-12',1,1),
 (2,'张桂新','男',NULL,'220182198003161713','长春','15567081988','2016-01-22',2,1);
/*!40000 ALTER TABLE `expert` ENABLE KEYS */;


--
-- Definition of table `expert_major_type`
--

DROP TABLE IF EXISTS `expert_major_type`;
CREATE TABLE `expert_major_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expert_id` int(11) DEFAULT NULL,
  `major_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `expert_major_type`
--

/*!40000 ALTER TABLE `expert_major_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `expert_major_type` ENABLE KEYS */;


--
-- Definition of table `major_type`
--

DROP TABLE IF EXISTS `major_type`;
CREATE TABLE `major_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `memo` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `major_type`
--

/*!40000 ALTER TABLE `major_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `major_type` ENABLE KEYS */;


--
-- Definition of table `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `sn` varchar(64) DEFAULT NULL,
  `bid_address` varchar(128) DEFAULT NULL,
  `gathering_address` varchar(128) DEFAULT NULL,
  `bid_unit` varchar(128) DEFAULT NULL,
  `supervise_unit` varchar(128) DEFAULT NULL,
  `proxy_org` varchar(128) DEFAULT NULL,
  `expert_count` int(11) DEFAULT NULL,
  `choose_time` varchar(64) DEFAULT NULL,
  `bid_time` varchar(64) DEFAULT NULL,
  `choose_user` varchar(16) DEFAULT NULL,
  `supervise_user` varchar(16) DEFAULT NULL,
  `staff` varchar(16) DEFAULT NULL,
  `operator` varchar(16) DEFAULT NULL,
  `memo` varchar(128) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project`
--

/*!40000 ALTER TABLE `project` DISABLE KEYS */;
/*!40000 ALTER TABLE `project` ENABLE KEYS */;


--
-- Definition of table `project_major_type`
--

DROP TABLE IF EXISTS `project_major_type`;
CREATE TABLE `project_major_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `major_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_major_type`
--

/*!40000 ALTER TABLE `project_major_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_major_type` ENABLE KEYS */;


--
-- Definition of table `test_c3p0`
--

DROP TABLE IF EXISTS `test_c3p0`;
CREATE TABLE `test_c3p0` (
  `a` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `test_c3p0`
--

/*!40000 ALTER TABLE `test_c3p0` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_c3p0` ENABLE KEYS */;


--
-- Definition of table `unit`
--

DROP TABLE IF EXISTS `unit`;
CREATE TABLE `unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `memo` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `unit`
--

/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
