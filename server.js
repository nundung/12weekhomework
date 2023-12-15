//import
    const express = require("express")


//init
    const app = express()
    const port = 8000


//post는 form태그, get은 url로 보냄
//Apis
    //회원가입 페이지
    app.post("/users", (req, res) => {
        const {id, pw, name, email} = req.body
        //백엔드에서 프론트로 보내줄 값 미리 생성
        const signUpResult = {
            "success": false,
            "message": ""
        }
    })

    //아이디 중복체크 페이지
    app.get("/users/id", (req, res) => {
        const {id} = req.query
        const checkIdResult = {
            "success": false,
            "message": ""
        }
    })

    //로그인 페이지
    app.post("/login", (req, res) => {
        const {id, pw} = req.body
        const logInResult = {
            "success": false,
            "message": ""
        }
    })

    //아이디 찾기 페이지
    app.post("/users/find-id", (req, res) => {
        const {name, email} = req.body
        const findIdResult = {
            "success": false,
            "message": "",
            "id": null
        }
    })

    //비밀번호 찾기 페이지
    app.post("/users/find-pw", (req, res) => {
        const {id, email} = req.body
        const findPwResult = {
            "success": false,
            "message": "",
            "pw": null
        }
    })

    //내정보 페이지
    //내정보 보기
    app.get("/users/:id/info", (req, res) => {
        const {id, pw, name, email} = req.body
        const findIdResult = {
            "success": false,
            "message": ""
        }
    })
    //내정보 수정
    app.put("/users/:id/info", (req, res) => {
        const {pw, name, email} = req.body
        const editInfoResult = {
            "success": false,
            "message": ""
        }
    })
    //회원탈퇴 페이지
    //계정 삭제
    app.delete("/users/:id", (req, res) => {
        const {userId} = req.body
        const deleteResult = {
            "success": false,
            "message": ""
        }
    })

    //게시글 목록(게시판) 페이지
    app.get("/posts", (req, res) => {
        const {postTitle, postAuthorId} = req.body
    })
    //게시글 쓰기 페이지
    //게시글 쓰기
    app.post("/posts", (req, res) => {
        const {postTitle, postContent} = req.body
        const makePostResult = {
            "success": false,
            "message": ""
        }
    })
    //게시글 수정
    app.put("/posts/:postid", (req, res) => {
        const {postTitle, postContent} = req.body
        const editPostResult = {
            "success": false,
            "message": ""
        }
    })

    //게시글 삭제
    app.delete("/posts/:postid", (req, res) => {
        const {postId} = req.body
        const deletePostResult = {
            "success": false,
            "message": ""
        }
    })
    

    //게시글 읽기, 댓글 읽기
    app.get("/posts/:postid", (req, res) => {
        const {postTitle,postAuthorId, postContent, commentAuthorId, commentContent} = req.body
    })

    //댓글 쓰기
    app.post("/posts/:postid/comments", (req, res) => {
        const {commentContent} = req.body
        const makeCommentResult = {
            "success": false,
            "message": ""
        }
    })
    //댓글 수정
    app.put("/posts/:postid/comments/:commentid", (req, res) => {
        const {commentContent} = req.body
        const editCommentResult = {
            "success": false,
            "message": ""
        }
    })
    //댓글 삭제
    app.delete("/posts/:postid/comments/:commentid", (req, res) => {
        const {commentId} = req.body
        const deleteCommentResult = {
            "success": false,
            "message": ""
        }
    })


//web Server
    app.listen(port, () => {
        console.log(`${port}번에서 HTTP 웹서버 실행`)
    })