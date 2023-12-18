// Import
const router = require("express").Router()

//Apis
//댓글 쓰기
router.post("/", (req, res) => {
    const {commentContent} = req.body
    const makeCommentResult = {
        "success": false,
        "message": ""
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