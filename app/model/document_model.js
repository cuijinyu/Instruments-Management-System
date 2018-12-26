const Query = require('../db/mysql');
const Util = require('../util/index');

module.exports = {
    async addDocument (document) {
        try {
            let {
                dname,
                courtproceed,
                dtype,
                resotime,
                abstract,
                ispublic,
                unpubreason,
                createuid,
                updateuid,
                rowtext,
                truth,
                result,
                plaintiff,
                defendant,
                judge
            } = document;
            let docuuid = Util.createUUID();
            let detailuuid = Util.createUUID();
            let court = await Query('SELECT courtid FROM Court WHERE courtname = ?', courtproceed);
            let courtid = court[0].courtid;
            let res = await Query('INSERT INTO Document(docid, dname, courtproceed, dtype, resotime, abstract, ispublic, unpubreason, createuid, updateuid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', docuuid, dname, courtproceed, dtype, resotime, abstract, ispublic, unpubreason, createuid, updateuid);
            let detail_res = await Query('INSERT INTO Docdetail(detailid, rowtext, truth, result, plaintiff, defendant, judge) VALUES (?, ?, ?, ?, ?, ?, ?)', detailuuid, rowtext, truth, result, plaintiff, defendant, judge);
            let dd_res = await Query('INSERT INTO DD(docid, detailid) VALUES(?, ?)', docuuid, detailuuid);
            let cd_res = await Query('INSERT INTO CD(courtid, docid) VALUES (?, ?)', courtid, docuuid);
            if (res.affectedRows > 0 &&
                detail_res.affectedRows > 0 &&
                dd_res.affectedRows > 0 &&
                cd_res.affectedRows > 0) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return {
                err:e
            }
        }
    },

    async deleteSpecialDocument (docuuid) {
        try {
            let detail = await Query('SELECT detailid FROM DD WHERE docid = ?', docuuid);
            let detailid = detail[0].detailid;
            let dd_res = await Query('DELETE FROM DD WHERE docid=?', docuuid);
            let cd_res = await Query('DELETE FROM CD WHERE docid=?', docuuid);
            let lcd_res = await Query('DELETE FROM LCD WHERE docid=?', docuuid);
            let dp_res = await Query('DELETE FROM DP WHERE docid=?', docuuid);
            let document_res = await Query('DELETE FROM Document WHERE docid=?', docuuid);
            let docDetail_res = await Query('DELETE FROM Docdetail WHERE detailid=?', detailid);
            if (dd_res.affectedRows > 0 &&
                cd_res.affectedRows > 0 &&
                lcd_res.affectedRows > 0 &&
                dp_res.affectedRows > 0 &&
                document_res.affectedRows > 0 &&
                docDetail_res.affectedRows > 0) {
                    return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            return {
                err:e
            }
        }
    },

    async fetchSpecificDocument (docuuid) {
        try {
            let detailid = await Query('SELECT detailid FROM DD WHERE docuuid = ?', docuuid);
            let detail = await Query('SELECT * FROM docdetailUserView WHERE detailid = ?', detailid);
            return detail;
        } catch (e) {
            return {
                err:e
            }
        }
    },

    async fetchDocumentLists () {
        try {
            let documentLists = await Query('SELECT * FROM documentUserView');
            return documentLists;
        } catch (e) {
            return {
                err:e
            }
        }
    },

    async updateSpecificDocDetail (document) {
        try {
            let { 
                detailid,
                rowtext,
                truth,
                result,
                plaintiff,
                defendant,
                judge
             } = document;
            let res = await Query(`UPDATE Docdetail SET rowtext = ?,
                                                       truth = ?,
                                                       result = ?,
                                                       plaintiff = ?,
                                                       defendant = ?,
                                                       judge = ? 
                                                       WHERE detailid = ?`,
                                rowtext, truth, result, plaintiff, defendant, judge
                                );
            if (res.affectedRows > 0) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            return {
                err:e
            }
        }     
    }
}