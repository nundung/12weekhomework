// Import
const router = require("express").Router();
const session = require("express-session");
const conn = require('../../database/connect/maria');

//Apis
//댓글 업로드
router.post("/:postidx", (req, res) => {
    const postIdx = req.params.postidx;
    const {content} = req.body;
    const uploadCommentResult = {
        "success": false,
        "message": ""
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.");
        const idx = req.session.user.idx;

        //db에 값 입력하기
        conn.query('INSERT INTO comment (post_idx, account_idx, content) VALUES (?, ?, ?)', [postIdx, idx, content], (err) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요")
            } 
            else {
                console.log("성공");
                uploadCommentResult.success = true;
                uploadCommentResult.message = "댓글이 업로드되었습니다.";
                res.send(uploadCommentResult)
            }
        });
    }
    catch (e) {
        uploadCommentResult.message = e.message;
        res.status(400).send(uploadCommentResult);
    }
})

//댓글 수정
router.put("/:commentid", (req, res) => {
    const {commentContent} = req.body
    const editCommentResult = {
        "success": false,
        "message": ""
    }
})

//댓글 삭제
router.delete("/:commentid", (req, res) => {
    const {commentId} = req.body
    const deleteCommentResult = {
        "success": false,
        "message": ""
    }
})

module.exports = router