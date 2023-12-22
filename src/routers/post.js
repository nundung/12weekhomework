// Import
const router = require("express").Router();
const session = require("express-session");
const conn = require('../../database/connect/maria');

//Apis
//게시글 목록(게시판)
router.get("/", (req, res) => {
    const postListResult = {
        "success": false,
        "message": ""
    }
    try{
        conn.query('SELECT * FROM posts ORDER BY created_at DESC', (err, results) => {
            if (err) {
                res.status(500).send("게시글을 불러오는 중 문제가 발생했습니다.");
            } else {
                res.send(results);
            }
        });
    }
    catch (e) {
        postListResult.message = e.message;
        res.status(400).send(postListResult);
    }
});

//게시글 업로드
router.post("/", (req, res) => {
    const {title, content} = req.body
    const uploadPostResult = {
        "success": false,
        "message": ""
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.");
        const idx = req.session.user.idx;

        //db에 값 입력하기
        conn.query('INSERT INTO post (account_idx, title, content) VALUES (?, ?, ?)', [idx, title, content], (err) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요")
            } 
            else {
                console.log("성공");
                uploadPostResult.success = true;
                uploadPostResult.message = "게시글이 업로드되었습니다.";
                res.send(uploadPostResult)
            }
        });
    }
    catch (e) {
        uploadPostResult.message = e.message;
        res.status(400).send(uploadPostResult);
    }
})

//게시글 수정
router.put("/:postidx", (req, res) => {
    const postIdx = req.params.postidx;
    const {title, content} = req.body;
    const editPostResult = {
        "success": false,
        "message": ""
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.");
        const idx = req.session.user.idx;

        //db에 값 입력하기
        conn.query('UPDATE post SET title=?, content=? WHERE idx=?', [title, content, postIdx], (err) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요")
            } 
            else {
                console.log("성공");
                editPostResult.success = true;
                editPostResult.message = "게시글 수정이 완료되었습니다.";
                res.send(editPostResult)
            }
        });
    }
    catch (e) {
        editPostResult.message = e.message;
        res.status(400).send(editPostResult);
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
        if (!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.");
        const idx = req.session.user.idx;

        //db에 값 입력하기
        conn.query('DELETE FROM post WHERE idx=?', [postIdx], (err) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요")
            } 
            else {
                console.log("성공");
                deletePostResult.success = true;
                deletePostResult.message = "게시글이 삭제되었습니다.";
                res.send(deletePostResult)
            }
        });
    }
    catch (e) {
        deletePostResult.message = e.message;
        res.status(400).send(deletePostResult);
    }
})

//게시글 읽기, 댓글 읽기
router.get("/:postidx", (req, res) => {
    const {postTitle,postAuthorId, postContent, commentAuthorId, commentContent} = req.body
})

module.exports = router
