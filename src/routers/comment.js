// Import
const router = require("express").Router();
const conn = require('../../database/connect/maria');

//Apis
//댓글 업로드
router.post("/", (req, res) => {
    const postIdx = req.query.postidx
    const {content} = req.body
    const uploadCommentResult = {
        "success": false,
        "message": ""
    }
    console.log(req.body); // 받은 요청 본문(body) 로그 출력

    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.")
        const idx = req.session.user.idx

        //db에 값 입력하기
        conn.query('INSERT INTO comment (post_idx, account_idx, content) VALUES (?, ?, ?)', [postIdx, idx, content], (err) => {
            if (err) return res.send(uploadCommentResult)
            uploadCommentResult.success = true
            res.send(uploadCommentResult)
        })
    }
    catch (e) {
        uploadCommentResult.message = e.message
        res.status(400).send(uploadCommentResult)
    }
})

//댓글 읽기
router.get("/", (req, res) => {
    const postIdx = req.query.postidx
    const page = req.query.page || 1   // 기본값으로 1 설정
    const perPage = req.query.per_page || 10
    const viewCommentResult = {
        "success": false,
        "message": "",
        "data": null
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.")

        // 페이지네이션을 위한 계산
        const offset = (page - 1) * perPage

        //db에서 댓글 가져오기
        conn.query('SELECT account_idx, content from comment WHERE post_idx=? LIMIT ? OFFSET ?', [postIdx, perPage, offset], (err,results) => {
            if (err) return res.send(viewCommentResult)
            viewCommentResult.success = true;
            viewCommentResult.data = results; 
            res.send(viewCommentResult)
        
        });
    }
    catch (e) {
        viewCommentResult.message = e.message;
        res.status(400).send(viewCommentResult);
        
    }
})

//댓글 수정
router.put("/:commentidx", (req, res) => {
    const contentIdx = req.params.commentidx
    const {content} = req.body
    const editCommentResult = {
        "success": false,
        "message": ""
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.")
        const idx = req.session.user.idx

        //db에 값 입력하기
        conn.query('UPDATE comment SET content=? WHERE idx=? AND account_idx=?', [content, contentIdx, idx], (err) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요")
            } 
            else {
                editCommentResult.success = true
                editCommentResult.message = "댓글 수정이 완료되었습니다."
                res.send(editCommentResult)
            }
        });
    }
    catch (e) {
        editCommentResult.message = e.message
        res.status(400).send(editCommentResult)
    }
})

//댓글 삭제
router.delete("/:commentidx", (req, res) => {
    const contentIdx = req.params.commentidx
    const deleteCommentResult = {
        "success": false,
        "message": ""
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.")
        const idx = req.session.user.idx
        
        //db에 값 입력하기
        conn.query('DELETE FROM comment WHERE idx=? AND account_idx=?', [contentIdx, idx], (err) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요")
            } 
            else {
                deleteCommentResult.success = true
                deleteCommentResult.message = "댓글 삭제가 완료되었습니다."
                res.send(deleteCommentResult)
            }
        });
    }
    catch (e) {
        deleteCommentResult.message = e.message;
        res.status(400).send(deleteCommentResult);
    }
})

module.exports = router