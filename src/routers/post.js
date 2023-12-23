// Import
const router = require("express").Router();
const session = require("express-session");
const conn = require('../../database/connect/maria');

//Apis
//게시글 목록(게시판)
router.get("/", (req, res) => {
    const postBoardResult = {
        "success": false,
        "message": ""
    }
    try{
        conn.query('SELECT * FROM post ORDER BY created_at DESC', (err, results) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요");
            }
            else {
                if (results.length > 0) {
                    res.send(results);
                    postBoardResult.success = true;
                    postBoardResult.message = "게시글 목록 불러오기 성공";
                }
                else {
                    postBoardResult.success = true;
                    postBoardResult.message = "게시글 목록이 비어있습니다.";
                }
            }
        });
    }
    catch (e) {
        postBoardResult.message = e.message;
        res.status(400).send(postBoardResult);
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
        console.log(idx, postIdx)
        //db에 값 입력하기
        conn.query('DELETE FROM post WHERE idx=?', [postIdx], (err) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요")
            } 
            else {
                deletePostResult.success = true;
                deletePostResult.message = "게시글이 삭제되었습니다.";
                res.send(deletePostResult);
            }
        });
    }
    catch (e) {
        deletePostResult.message = e.message;
        res.status(400).send(deletePostResult);
    }
})

router.get("/:postidx", (req, res) => {
    const postIdx = req.params.postidx;
    const viewPostResult = {
        "success": false,
        "message": "",
        "accountIdx": "",
        "title": "",
        "content": ""
    }
    try {
        if(!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.")

        conn.query('SELECT account_idx, title, content FROM post WHERE idx=?', [postIdx], (err,results) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요")
            }
            else {
                if (results.length > 0) {
                    viewPostResult.success = true;
                    viewPostResult.message = "게시글 불러오기 성공";
                    viewPostResult.accountIdx = results[0].account_idx;
                    viewPostResult.title = results[0].title;
                    viewPostResult.content = results[0].content;
                    res.send(viewPostResult);
                }
                else {
                    viewPostResult.message = "게시글을 찾을 수 없습니다.";
                    res.status(404).send(viewPostResult);
                }
            }
        })
    }
    catch (e) {
        viewPostResult.message = e.message;
        res.status(400).send(viewPostResult);
    }
})

//게시글 읽기, 댓글 읽기
router.get("/:postidx/comments?page={page_number}&per_page={comments_per_page}", (req, res) => {
    const {postTitle,postAuthorId, postContent, commentAuthorId, commentContent} = req.body
})

module.exports = router