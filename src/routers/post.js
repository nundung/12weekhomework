// Import
const router = require("express").Router()
const conn = require('../../database/connect/maria')
const exception = require('../modules/exception')

//Apis
//게시글 목록(게시판)
router.get("/", (req, res) => {
    const postBoardResult = {
        "success": false,
        "message": "",
        "data": null
    }
    try{
        if (!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.");
        const idx = req.session.user.idx;

        //db에 값 입력하기
        conn.query('SELECT * FROM post ORDER BY idx DESC', (err, results) => {
            if (err) return res.send(postBoardResult)
            if (results.length > 0) {
                postBoardResult.success = true
                postBoardResult.data = results
                res.send(postBoardResult)
            }
            else {
                postBoardResult.success = true
                postBoardResult.message = "게시글 목록이 비어있습니다."
                res.send(postBoardResult)
            }
        })
    }
    catch (e) {
        postBoardResult.message = e.message
        res.status(400).send(postBoardResult)
    }
})

//게시글 업로드
router.post("/", (req, res) => {
    const {title, content} = req.body
    const uploadPostResult = {
        "success": false,
        "message": ""
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.")
        const idx = req.session.user.idx
        exception.titleCheck(title)
        exception.contentCheck(content)

        //db에 값 입력하기
        conn.query('INSERT INTO post (account_idx, title, content) VALUES (?, ?, ?)', [idx, title, content], (err) => {
            if (err) return res.send(uploadPostResult)
            uploadPostResult.success = true
            res.send(uploadPostResult)
        })
    }
    catch (e) {
        uploadPostResult.message = e.message
        res.status(400).send(uploadPostResult)
    }
})

//게시글 수정
router.put("/:postidx", (req, res) => {
    const postIdx = req.params.postidx
    const {title, content} = req.body
    const editPostResult = {
        "success": false,
        "message": ""
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.");
        const idx = req.session.user.idx

        //db에 값 입력하기
        conn.query('UPDATE post SET title=?, content=? WHERE idx=? AND account_idx=?', [title, content, postIdx, idx], (err, results) => {
            if (err) return res.send(editPostResult)
            if (results.affectedRows === 0) {
                // 수정된 행이 없는 경우 처리
                editPostResult.message = "해당하는 게시글을 찾지 못했습니다."
                return res.send(editPostResult)
            }
            editPostResult.success = true
            editPostResult.message = "게시글 수정이 완료되었습니다."
            res.send(editPostResult)
        })
    }
    catch (e) {
        editPostResult.message = e.message
        res.status(400).send(editPostResult)
    }
})

//게시글 삭제
router.delete("/:postidx", (req, res) => {
    const postIdx = req.params.postidx;
    const deletePostResult = {
        "success": false,
        "message": ""
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.")
        const idx = req.session.user.idx

        //db에 값 입력하기
        conn.query('DELETE FROM post WHERE idx=? AND account_idx=?', [postIdx, idx], (err, results) => {
            if (err) return res.send(deletePostResult)
            if (results.affectedRows === 0) {
                // 수정된 행이 없는 경우 처리
                deletePostResult.message = "해당하는 게시글을 찾지 못했습니다."
                return res.send(deletePostResult)
            }
            deletePostResult.success = true
            deletePostResult.message = "게시글이 삭제되었습니다."
            res.send(deletePostResult)
        })
    }
    catch (e) {
        deletePostResult.message = e.message;
        res.status(400).send(deletePostResult);
    }
})

//게시글 보기
router.get("/:postidx", (req, res) => {
    const postIdx = req.params.postidx;
    const viewPostResult = {
        "success": false,
        "message": "",
        "data": null
    }
    try {
        if(!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.")

        conn.query('SELECT account_idx, title, content FROM post WHERE idx=?', [postIdx], (err,results) => {
            if (err) return res.send(viewPostResult)
            if (results.length === 0) {
                viewPostResult.message = "게시글을 찾을 수 없습니다."
                return res.send(viewPostResult)
            }
            viewPostResult.success = true;
            viewPostResult.data = results
            res.send(viewPostResult)
        })
    }
    catch (e) {
        viewPostResult.message = e.message
        res.status(400).send(viewPostResult)
    }
})

//게시글 읽기, 댓글 읽기
router.get("/:postidx/comments?page={page_number}&per_page={comments_per_page}", (req, res) => {
    const {postTitle,postAuthorId, postContent, commentAuthorId, commentContent} = req.body
})

module.exports = router