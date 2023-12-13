//import
    const express = require("express")



//init
    const app = express()
    const port = 8000



//Apis

    //회원가입 페이지
    //프론트엔드가 보내준 값을 저장
    app.post("/signUp", (req, res) => {
        const {id, pw, name, email} = req.body
    })
    //백엔드에서 프론트로 보내줄 값 미리 생성
    const signUpresult = {
        "success": false,
        "message": ""
    }


    //로그인 페이지
    app.post("/logIn", (req, res) => {
        const {id, pw} = req.body
    })
    const logInResult = {
        "success": false,
        "message": ""
    }


    //아이디 찾기 페이지
    app.get("/findId", (req, res) => {
        const {name, email} = req.body
    })
    const findIdResult = {
        "success": false,
        "message": ""
    }


    //비밀번호 찾기 페이지
    app.get("/findPw", (req, res) => {
        const {id, email} = req.body
    })
    const findPwResult = {
        "success": false,
        "message": ""
    }


    //내정보 페이지

    //내정보 보기
    app.put("/Info", (req, res) => {
        const {id, pw, name, email} = req.body
    })
    //내정보 수정
    app.put("/Info", (req, res) => {
        const {pw, name, email} = req.body
    })
    const editInfoResult = {
        "success": false,
        "message": ""
    }


    //회원탈퇴 페이지
    //계정 삭제
    app.delete("/deleteAccount", (req, res) => {
        const {pw} = req.body
    })
    const deleteAccountResult = {
        "success": false,
        "message": ""
    }


    //게시글 페이지
    //게시글 읽기,  댓글 읽기
    app.get("/viewPost", (req, res) => {
        const {postTitle, postContent, commentContent} = req.body
    })
    //게시글 삭제
    app.delete("/viewPost", (req, res) => {
        const {pw} = req.body
    })
    const deletePostResult = {
        "success": false,
        "message": ""
    }
    //댓글 쓰기
    app.post("/viewPost", (req, res) => {
        const {commentContent} = req.body
    })
    const makeCommentResult = {
        "success": false,
        "message": ""
    }
    //댓글 수정
    app.put("/viewPost", (req, res) => {
        const {commentContent} = req.body
    })
    const editCommentResult = {
        "success": false,
        "message": ""
    }
    //댓글 삭제
    app.delete("/viewPost", (req, res) => {
        const {commentContent} = req.body
    })
    const deleteCommentResult = {
        "success": false,
        "message": ""
    }


    //게시글 쓰기 페이지
    //게시글 쓰기
    app.post("/makePost", (req, res) => {
        const {postTitle, postContent} = req.body
    })
    const makePostResult = {
        "success": false,
        "message": ""
    }
    //게시글 수정
    app.put("/makePost", (req, res) => {
        const {pw,name, email} = req.body
    })
    const editPostResult = {
        "success": false,
        "message": ""
    }





//web Server
    app.listen(port, () => {
        console.log(`${port}번에서 HTTP 웹서버 실행`)
    })