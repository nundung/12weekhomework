// Import
const router = require("express").Router();
const session = require("express-session");
const conn = require('../../database/connect/maria');

//Apis
//게시글 목록(게시판)
router.get("/", (req, res) => {
    const {postTitle, postAuthorId} = req.body
})

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
        conn.query('INSERT INTO post (account_idx, title, content) VALUES (?, ?, ?)', [idx, title, content], (error) => {
            if (error) {
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
        uploadPostResult.message = e.message
    }
})

//게시글 수정
router.put("/:postid", (req, res) => {
    const {postTitle, postContent} = req.body
    const editPostResult = {
        "success": false,
        "message": ""
    }
})

//게시글 삭제
router.delete("/:postid", (req, res) => {
    //param 패스파라미터를 사용해라 
    const {postId} = req.body
    const deletePostResult = {
        "success": false,
        "message": ""
    }
})

//게시글 읽기, 댓글 읽기
router.get("/:postid", (req, res) => {
    const {postTitle,postAuthorId, postContent, commentAuthorId, commentContent} = req.body
})

module.exports = router