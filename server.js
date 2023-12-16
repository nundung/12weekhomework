//import
    const express = require("express")
    const session = require("express-session")
    const FileStore = require("session-file-store")(session)

//init
    const app = express()
    const port = 8000

    app.use(session({ 
        secret: "abcd",   // 세션을 암호화
        resave: false,            // 세션을 항상 저장할지 결정 (false를 권장)     
        saveUninitialized: true,  // 초기화 되지 않은채로 스토어에 저장할지를 결정
        store: new FileStore()    // 데이터를 저장하는 형식
    }));

//post는 form태그, get은 url로 보냄
//Apis
    //회원가입 
    app.post("/user", (req, res) => {
        const {id, pw, name, email} = req.body
        //백엔드에서 프론트로 보내줄 값 미리 생성
        const signUpResult = {
            "success": false,
            "message": ""
        }
        try {
            //예외처리
            if(id === null || id === "" || id === undefined) throw new Error("아이디 값이 이상해요")
            if(pw === null || pw === "" || pw === undefined) throw new Error("비밀번호 값이 이상해요")
            if(name === null || pw === "" || pw === undefined) throw new Error("이름 값이 이상해요")
            if(email === null || email === "" || email === undefined) throw new Error("이메일 값이 이상해요")

            //아이디 정규식
            var idReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
            if(!idReg.test(id)) throw new Error("아이디 값이 이상해요2")
            //("아이디는 영문, 숫자의 조합으로 6~18자로 입력해주세요.");

            //비밀번호 정규식
            var pwReg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
            if(!pwReg.test(pw)) throw new Error("비밀번호 값이 이상해요2")
            //("비밀번호는 영문, 숫자, 특수문자의 조합으로 8~20자로 입력해주세요.");

            //이름 정규식
            var nameReg = /^[가-힣]{2,4}$/;
            if(!nameReg.test(name)) throw new Error("이름 값이 이상해요2")
            //("이름은 한글 2~4자로 입력해주세요.")

            //db에 값 삽입

            //db 결과 처리
            result.success = true
        }
        catch (e) {
            result.message = e.message
        }
        finally {
            res.send(result)
        }
    })

    //아이디 중복체크
    app.post("/user/id", (req, res) => {
        const {id} = req.body
        const checkIdResult = {
            "success": false,
            "message": "",
            // "data": {
            // "isDuplicated" : false
            // }
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
    app.post("/user/find-id", (req, res) => {
        const {name, email} = req.body
        const findIdResult = {
            "success": false,
            "message": "",
            "id": null
        }
    })

    //비밀번호 찾기 페이지
    app.post("/user/find-pw", (req, res) => {
        const {id, email} = req.body
        const findPwResult = {
            "success": false,
            "message": "",
            "pw": null
        }
    })

    //내정보 페이지
    //내정보 보기
    app.get("/user/info", (req, res) => {
        //id값은 세션에서 받아줘서 :id
        const infoResult = {
            "success": false,
            "message": ""
        }
    })
    //내정보 수정
    app.put("/user/info", (req, res) => {
        const {pw, name, email} = req.body
        const editInfoResult = {
            "success": false,
            "message": ""
        }
    })
    //회원탈퇴 페이지
    //계정 삭제
    app.delete("/user", (req, res) => {
        const {userId} = req.body
        const deleteResult = {
            "success": false,
            "message": ""
        }
    })

    //게시글 목록(게시판) 페이지
    app.get("/post", (req, res) => {
        const {postTitle, postAuthorId} = req.body
    })
    //게시글 쓰기 페이지
    //게시글 쓰기
    app.post("/post", (req, res) => {
        const {postTitle, postContent} = req.body
        const makePostResult = {
            "success": false,
            "message": ""
        }
    })
    //게시글 수정
    app.put("/post/:postid", (req, res) => {
        const {postTitle, postContent} = req.body
        const editPostResult = {
            "success": false,
            "message": ""
        }
    })

    //게시글 삭제
    app.delete("/post/:postid", (req, res) => {
        //param 패스파라미터를 사용해라 
        const {postId} = req.body
        const deletePostResult = {
            "success": false,
            "message": ""
        }
    })
    

    //게시글 읽기, 댓글 읽기
    app.get("/post/:postid", (req, res) => {
        const {postTitle,postAuthorId, postContent, commentAuthorId, commentContent} = req.body
    })

    //댓글 쓰기
    app.post("/comments", (req, res) => {
        const {commentContent} = req.body
        const makeCommentResult = {
            "success": false,
            "message": ""
        }
    })
    //댓글 수정
    app.put("/comment/:commentid", (req, res) => {
        const {commentContent} = req.body
        const editCommentResult = {
            "success": false,
            "message": ""
        }
    })
    //댓글 삭제
    app.delete("/comment/:commentid", (req, res) => {
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