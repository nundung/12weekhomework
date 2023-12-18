// Import
const router = require("express").Router()

//Apis
//게시글 목록(게시판)
router.get("/", (req, res) => {
    const {postTitle, postAuthorId} = req.body
})

//게시글 쓰기
router.post("/", (req, res) => {
    const {postTitle, postContent} = req.body
    const makePostResult = {
        "success": false,
        "message": ""
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