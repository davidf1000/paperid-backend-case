-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: finances
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `date` varchar(255) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `accountId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8a10ed6ef3d19b1aed1b60a2884` (`accountId`),
  CONSTRAINT `FK_8a10ed6ef3d19b1aed1b60a2884` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES ('038a0fea-d32c-4169-a288-3c0117af5ebd','Nemu duit','nemu duit dijalan',150000,'2022-09-05T17:32:28Z',1,'bf37532c-a489-4cae-b86b-c1d50eeaa7b6'),('1034d1db-8927-486d-8c2e-29cee22b9068','isi ulang galon','beli di depot',-50000,'2022-08-15T17:32:28Z',1,'48f12879-a24f-427c-91eb-8a597cb1283b'),('507a2695-1b78-4252-88ea-e6d0379975e7','beli makan','beli makan di gojek',-50000,'2022-07-15T17:32:28Z',1,'e0681ec3-ddef-4877-b536-0400a67c9217'),('6fd67d9d-9d05-461b-a08d-53a9d34cc8a6','bayar PAM','Bayar air lewat transfer',-400000,'2022-08-05T17:32:28Z',1,'bf37532c-a489-4cae-b86b-c1d50eeaa7b6'),('9db6c320-d3c0-45a2-8c3c-c73162cc2cd8','Reimburse dari teman','reimburse proyek',1000000,'2022-08-15T17:32:28Z',1,'e0681ec3-ddef-4877-b536-0400a67c9217'),('b3bbd864-a1ef-473e-aa31-cc0f61687b5e','bayar listrik','bayar listrik kosan',-100000,'2022-08-05T17:32:28Z',1,'bf37532c-a489-4cae-b86b-c1d50eeaa7b6'),('bdc222da-0db4-4499-9c43-0db0ca2a6fe6','uang kembalian','kembalian dari teman',10000,'2022-08-15T17:32:28Z',1,'48f12879-a24f-427c-91eb-8a597cb1283b'),('e88230ca-e1d1-4e20-91ac-7148f956b8eb','Gajian','gajian kerja',4500000,'2022-09-05T17:32:28Z',1,'bf37532c-a489-4cae-b86b-c1d50eeaa7b6'),('f4083317-fe32-4361-8b6e-accf5f44af5e','belanja online','beli beli online',-300000,'2022-08-21T17:32:28Z',1,'e0681ec3-ddef-4877-b536-0400a67c9217'),('fd624e3f-3a2e-41b4-a23c-1fab8c38e219','uang kembalian','kembalian dari teman',10000,'2022-08-15T17:32:28Z',0,'48f12879-a24f-427c-91eb-8a597cb1283b');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-05  6:46:11
