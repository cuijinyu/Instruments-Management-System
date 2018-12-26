CREATE TABLE User(
	uid VARCHAR(128) PRIMARY KEY,
	nickname VARCHAR(64) NOT NULL,
	account VARCHAR(32) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	createtime DATETIME,
	updatetime DATETIME
);

CREATE TABLE Privilege(
	uid VARCHAR(128) PRIMARY KEY,
	userpro TINYINT,
	courtpro TINYINT,
	provpro TINYINT,
	casepro TINYINT,
	docpro TINYINT,
	locpro TINYINT,
	FOREIGN KEY (uid) REFERENCES User(uid)
);

CREATE TABLE Log(
	logid VARCHAR(128) PRIMARY KEY,
	optype VARCHAR(32) NOT NULL,
	uid VARCHAR(128) REFERENCES User(uid),
	oldcontent TEXT NOT NULL,
	newcontent TEXT NOT NULL,
	createtime DATETIME,
	updatetime DATETIME
);

CREATE TABLE Local(
	locid VARCHAR(128) PRIMARY KEY,
	locname VARCHAR(255) UNIQUE NOT NULL,
	createtime DATETIME,
	updatetime DATETIME,
	createuid VARCHAR(128),
	updateuid VARCHAR(128),
	FOREIGN KEY (createuid) REFERENCES User(uid),
	FOREIGN KEY (updateuid) REFERENCES User(uid),
);
CREATE VIEW localUserView
AS
SELECT locname, locid
FROM Local;

CREATE TABLE Court(
	courtid VARCHAR(128) PRIMARY KEY,
	courtname CHAR(128) UNIQUE NOT NULL,
	createtime DATETIME,
	updatetime DATETIME,
	createuid VARCHAR(128),
	updateuid VARCHAR(128),
	FOREIGN KEY (createuid) REFERENCES User(uid),
	FOREIGN KEY (updateuid) REFERENCES User(uid)
);
CREATE VIEW courtUserView
AS
SELECT courtname, courtid
FROM Court;

CREATE TABLE Provision(
	provid VARCHAR(128) PRIMARY KEY,
	ptype CHAR(128) NOT NULL,
	article TEXT NOT NULL,
	createtime DATETIME,
	updatetime DATETIME,
	createuid VARCHAR(128),
	updateuid VARCHAR(128),
	FOREIGN KEY (createuid) REFERENCES User(uid),
	FOREIGN KEY (updateuid) REFERENCES User(uid)	
);
CREATE VIEW provisionUserView
AS
SELECT ptype, article, provid
FROM Provision;

CREATE TABLE LegalCase(
	caseid VARCHAR(128) PRIMARY KEY,
	causes VARCHAR(255) NOT NULL,
	ctype CHAR(64) NOT NULL,
	content TEXT NOT NULL,
	createtime DATETIME,
	updatetime DATETIME,
	createuid VARCHAR(128),
	updateuid VARCHAR(128),
	FOREIGN KEY (createuid) REFERENCES User(uid),
	FOREIGN KEY (updateuid) REFERENCES User(uid)	
);
CREATE VIEW legalcaseUserView
AS
SELECT causes, ctype, content, caseid
FROM LegalCase;

CREATE TABLE Document(
	docid VARCHAR(128) PRIMARY KEY,
	dname VARCHAR(255) NOT NULL,
	courtproceed CHAR(32) NOT NULL,
	dtype CHAR(32) NOT NULL,
	resotime DATETIME NOT NULL,
	abstract TEXT NOT NULL,
	ispublic TINYINT,
	unpubreason TEXT,
	createtime DATETIME,
	updatetime DATETIME,
	createuid VARCHAR(128),
	updateuid VARCHAR(128),
	FOREIGN KEY (createuid) REFERENCES User(uid),
	FOREIGN KEY (updateuid) REFERENCES User(uid)	
);
CREATE VIEW documentUserView
AS
SELECT dname, courtproceed, dtype, resotime, abstract, ispublic, unpubreason, docid
FROM Document;

CREATE TABLE Docdetail(
	detailid VARCHAR(128) PRIMARY KEY,
	rowtext LONGTEXT NOT NULL,
	truth TEXT NOT NULL,
	result TEXT NOT NULL,
	plaintiff CHAR(32) NOT NULL,
	defendant CHAR(32) NOT NULL,
	judge CHAR(32) NOT NULL
);
CREATE VIEW docdetailUserView
AS
SELECT rowtext, truth, result, plaintiff, defendant, judge, detailid
FROM Docdetail;

CREATE TABLE LC(
	locid VARCHAR(128),
	courtid VARCHAR(128),
	PRIMARY KEY (locid, courtid),
	FOREIGN KEY (locid) REFERENCES Local(locid),
	FOREIGN KEY (courtid) REFERENCES Court(courtid)
);

CREATE TABLE CD(
	courtid VARCHAR(128),
	docid VARCHAR(128),
	PRIMARY KEY (courtid, docid),
	FOREIGN KEY (courtid) REFERENCES Court(courtid),
	FOREIGN KEY (docid) REFERENCES Document(docid)
);

CREATE TABLE CLC(
	courtid VARCHAR(128),
	caseid VARCHAR(128),
	PRIMARY KEY (courtid, caseid),
	FOREIGN KEY (courtid) REFERENCES Court(courtid),
	FOREIGN KEY (caseid) REFERENCES LegalCase(docid)
);

CREATE TABLE LCD(
	caseid VARCHAR(128),
	docid VARCHAR(128),
	PRIMARY KEY (caseid, docid),
	FOREIGN KEY (caseid) REFERENCES LegalCase(caseid),
 	FOREIGN KEY (docid) REFERENCES Document(docid)
);

CREATE TABLE DP(
	docid VARCHAR(128),
	provid VARCHAR(128),
	PRIMARY KEY (docid, provid),
	FOREIGN KEY (docid) REFERENCES Document(docid),
	FOREIGN KEY (provid) REFERENCES Provision(provid)
);

CREATE TABLE DD(
	docid VARCHAR(128),
	detailid VARCHAR(128),
	FOREIGN KEY (docid) REFERENCES Document(docid),
	FOREIGN KEY (detailid) REFERENCES Docdetail(detailid)
);

DELIMITER $
CREATE TRIGGER log_insert BEFORE INSERT ON Log FOR EACH ROW
BEGIN
   set new.createtime = now(), new.updatetime = now();
END
$ DELIMITER ;

DELIMITER $
CREATE TRIGGER log_update BEFORE UPDATE ON Log FOR EACH ROW
BEGIN
   set new.updatetime = now();
END
$ DELIMITER ;

DELIMITER $
CREATE TRIGGER user_insert BEFORE INSERT ON User FOR EACH ROW
BEGIN
   set new.uid = UUID(), new.createtime = now();
END
$ DELIMITER ;

DELIMITER $
CREATE TRIGGER user_update BEFORE UPDATE ON User FOR EACH ROW
BEGIN
   set new.updatetime = now();
END
$ DELIMITER ;

DELIMITER $
CREATE TRIGGER local_insert BEFORE INSERT ON Local FOR EACH ROW
BEGIN
   new.createtime = now();
END
$ DELIMITER ;

DELIMITER $
CREATE TRIGGER local_update BEFORE UPDATE ON Local FOR EACH ROW
BEGIN
   set new.updatetime = now();
END
$ DELIMITER ;

DELIMITER $
CREATE TRIGGER court_insert BEFORE INSERT ON Court FOR EACH ROW
BEGIN
   new.createtime = now();
END
$ DELIMITER ;

DELIMITER $
CREATE TRIGGER court_update BEFORE UPDATE ON Court FOR EACH ROW
BEGIN
   set new.updatetime = now();
END
$ DELIMITER;

DELIMITER $
CREATE TRIGGER provision_insert BEFORE INSERT ON Provision FOR EACH ROW
BEGIN
	set new.createtime = now(), new.updatetime = now();
END
$ DELIMITER;

DELIMITER $
CREATE TRIGGER provision_update BEFORE UPDATE ON Provision FOR EACH ROW
BEGIN
	set new.updatetime = now();
END
$ DELIMITER;

DELIMITER $
CREATE TRIGGER legalcase_insert BEFORE INSERT ON LegalCase FOR EACH ROW
BEGIN
	set new.createtime = now(), new.updatetime = now();
END
$ DELIMITER;

DELIMITER $
CREATE TRIGGER legalcase_update BEFORE UPDATE ON LegalCase FOR EACH ROW
BEGIN
	set new.updatetime = now();
END
$ DELIMITER;

DELIMITER $
CREATE TRIGGER document_insert BEFORE INSERT ON Document FOR EACH ROW
BEGIN
	set new.createtime = now(), new.updatetime = now();
END
$ DELIMITER;

DELIMITER $
CREATE TRIGGER document_update BEFORE UPDATE ON Document FOR EACH ROW
BEGIN
	set new.updatetime = now();
END
$ DELIMITER;

DELIMITER $
CREATE TRIGGER docdetail_insert BEFORE INSERT ON Docdetail FOR EACH ROW
BEGIN
	set new.createtime = now(), new.updatetime = now();
END
$ DELIMITER;

DELIMITER $
CREATE TRIGGER docdetail_update BEFORE UPDATE ON Docdetail FOR EACH ROW
BEGIN
	set new.updatetime = now();
END
$ DELIMITER;


## 文书的增删改
## 相关表：文书表、文书详情表，文书-文书详情表、法院-文书表、案件-文书表、文书-法条表、用户表

#  insert
INSERT INTO Document(docid, dname, courtproceed, dtype, resotime, abstract, ispublic, unpubreason, createuid, updateuid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
INSERT INTO Docdetail(detailid, rowtext, truth, result, plaintiff, defendant, judge) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
INSERT INTO DD(docid, detailid) VALUES(?, ?)
INSERT INTO CD(courtid, docid) VALUES (?, ?)
INSERT INTO LCD(caseid, docid) VALUES (?, ?)
INSERT INTO DP(docid, provid) VALUES (?, ?)
#  delete
DELETE FROM DD WHERE docid=?
DELETE FROM CD WHERE docid=?
DELETE FROM LCD WHERE docid=?
DELETE FROM DP WHERE docid=?
DELETE FROM Document WHERE docid=?
DELETE FROM Docdetail WHERE detailid=?
#  update
UPDATE Document SET ?=? WHERE docid=?

## 案件的增删改
## 相关表：案件表、法院-案件表、用户表
#  insert
INSERT INTO LegalCase(caseid, causes, ctype, content, createuid, updateuid) VALUES (?, ?, ?, ?, ?, ?)
INSERT INTO CLC(courtid, caseid) VALUES (?, ?)
#  delete
DELETE FROM CLC WHERE caseid=?
DELETE FROM LegalCase WHERE caseid=?
#  update
UPDATE LegalCase SET ?=? WHERE caseid=?

## 法条的增删改
## 相关表：法条表、用户表
#  insert
INSERT INTO Provision(provid, ptype, article, createuid, updateuid) VALUES (?, ?, ?, ?, ?)
#  delete
DELETE FROM Provision WHERE provid=?
#  update
UPDATE Provision SET ?=? WHERE provid=?

## 法院信息的增删改
## 相关表：法院表、地域-法院表、用户表
#  insert
INSERT INTO Court(courtid, courtname, createuid, updateuid);
INSERT INTO LC(locid, courtid) VALUES (?, ?)
#  delete
DELETE FROM LC WHERE courtid=?
DELETE FROM Court WHERE courtid=?
#  update
UPDATE Court SET ?=? WHERE courtid=?

## 地域信息的增删改
## 相关表：地域表、用户表
#  insert
INSERT INTO Local(locid, locname, createuid, updateuid) VALUES (?, ?)
#  delete
DELETE FROM Local WHERE locid=?
#  update
UPDATE Local SET ?=? WHERE locid=?

## 用户信息的增删改
## 相关表：用户表、权限表
#  insert
INSERT INTO User(nickname, account, password) VALUES (?, ?, ?);
#  delete
DELETE FROM User WHERE account=?;
#  update
UPDATE User SET ?=? WHERE account=?;